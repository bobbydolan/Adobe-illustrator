// BatchProcessVideos.jsx
// Script for Adobe After Effects to batch process videos
// Replaces FPO footage with videos from Input folder, renders as MP4, and saves to Output folder

/**
 * Clean a filename by replacing spaces with underscores and removing parentheses
 * @param {String} fileName - The filename to clean
 * @return {String} The cleaned filename
 */
function cleanFileName(fileName) {
    // Log the original filename
    $.writeln("Cleaning filename: " + fileName);

    // TARGETED CLEANING - Focus on specific patterns
    var cleaned = fileName;

    // Step 1: Remove &nbsp; HTML entity if present
    cleaned = cleaned.replace(/&nbsp;/g, "");
    $.writeln("After removing '&nbsp;' HTML entity: " + cleaned);

    // Step 2: Remove actual non-breaking space character (Unicode U+00A0)
    cleaned = cleaned.replace(/\u00A0/g, "");
    $.writeln("After removing non-breaking space character: " + cleaned);

    // Step 3: Specifically target the pattern "&nbsp;(#)" or " (#)"
    cleaned = cleaned.replace(/(&nbsp;|\s+)\(\d+\)/g, "");
    $.writeln("After removing '&nbsp;(#)' or ' (#)' pattern: " + cleaned);

    // Step 4: Replace remaining spaces with underscores
    cleaned = cleaned.replace(/\s+/g, "_");
    $.writeln("After replacing spaces: " + cleaned);

    // Step 5: Ensure no double underscores
    while (cleaned.indexOf("__") !== -1) {
        cleaned = cleaned.replace(/__/g, "_");
    }
    $.writeln("After fixing double underscores: " + cleaned);

    // Step 6: Trim underscores from beginning and end
    cleaned = cleaned.replace(/^_+|_+$/g, "");
    $.writeln("After trimming underscores: " + cleaned);

    // Log the final cleaned filename
    $.writeln("Final cleaned filename: " + fileName + " -> " + cleaned);

    return cleaned;
}

/**
 * Format filename according to the specified format
 * @param {String} fileName - The original filename
 * @return {String} The formatted filename
 */
function formatFileName(fileName) {
    // First clean the filename
    var cleaned = cleanFileName(fileName);

    // Remove file extension if it exists
    if (cleaned.indexOf(".") !== -1) {
        cleaned = cleaned.replace(/\.[^\.]+$/, "");
    }

    // Capitalize first letter of each word
    var parts = cleaned.split("_");
    for (var i = 0; i < parts.length; i++) {
        if (parts[i].length > 0) {
            parts[i] = parts[i].charAt(0).toUpperCase() + parts[i].slice(1).toLowerCase();
        }
    }
    var capitalized = parts.join("_");

    // Prepend "Before_After_"
    return "Before_After_" + capitalized;
}

/**
 * Renders a composition at the specified size with the specified suffix
 * @param {CompItem} comp - The composition to render
 * @param {Number} width - The target width in pixels
 * @param {Number} height - The target height in pixels
 * @param {String} suffix - The suffix to add to the filename (e.g., "_1200", "_300")
 * @param {String} inputFileName - The original input file name
 * @param {Folder} outputFolder - The folder to save the output files to
 */
function renderCompositionAtSize(comp, width, height, suffix, inputFileName, outputFolder) {
    // Resize the composition to the target dimensions
    comp.width = width;
    comp.height = height;

    // Center and scale all layers in the composition
    for (var l = 1; l <= comp.numLayers; l++) {
        var layer = comp.layer(l);

        // Check if this is a footage layer
        if (layer.source instanceof FootageItem && layer.source.mainSource instanceof FileSource) {
            // Calculate position to center the layer
            var xCenter = comp.width / 2;
            var yCenter = comp.height / 2;

            // Center the layer
            layer.transform.position.setValue([xCenter, yCenter]);

            // Check if this is FPO Footage or Source Footage
            var isFPOorSourceFootage = (
                layer.name.indexOf("FPO") !== -1 ||
                layer.name.indexOf("Source") !== -1 ||
                layer.source.name.indexOf("FPO") !== -1 ||
                layer.source.name.indexOf("Source") !== -1
            );

            // If the layer has a scale property, adjust it
            if (layer.transform.scale) {
                var scaleX;

                if (isFPOorSourceFootage) {
                    // For FPO or Source footage, scale to be exactly the target height
                    // while maintaining aspect ratio
                    scaleX = (height / layer.source.height * 100);
                } else {
                    // For other layers, fit within the composition
                    scaleX = Math.min(
                        (comp.width / layer.source.width * 100),
                        (comp.height / layer.source.height * 100)
                    );
                }

                // Apply the same scale to both dimensions to maintain aspect ratio
                layer.transform.scale.setValue([scaleX, scaleX]);

                // Log the scaling applied
                $.writeln("Layer: " + layer.name + " - Scaled to: " + scaleX.toFixed(2) + "% for " + width + "x" + height);
            }
        }
    }

    // Format the output filename
    var outputFileName = formatFileName(inputFileName) + suffix + ".mp4";
    // Ensure the filename is clean
    outputFileName = cleanFileName(outputFileName);
    var outputFilePath = outputFolder.fullName + "/" + outputFileName;

    // Add to render queue for MP4 video
    var renderQueueItem = app.project.renderQueue.items.add(comp);

    // Set output module
    var outputModule = renderQueueItem.outputModule(1);

    // Set output file path
    outputModule.file = new File(outputFilePath);

    // Try to set the format to QuickTime with H.264 codec (common approach for MP4)
    try {
        // First try to use a built-in template if available
        try {
            // Look for templates with H.264 in the name
            var templates = outputModule.templates;
            var h264Template = null;

            for (var t = 0; t < templates.length; t++) {
                if (templates[t].indexOf("H.264") !== -1 || templates[t].indexOf("h.264") !== -1) {
                    h264Template = templates[t];
                    break;
                }
            }

            if (h264Template) {
                outputModule.applyTemplate(h264Template);
            } else {
                // If no H.264 template found, try to use "Match Source - High bitrate"
                outputModule.applyTemplate("Match Source - High bitrate");
            }
        } catch (e) {
            // If template approach fails, try direct settings
            try {
                // For QuickTime format with H.264 codec
                outputModule.setSetting("Output File Info", {
                    "Base Path": outputFolder.fullName,
                    "File Name": outputFileName
                });

                // Try to set format to QuickTime
                outputModule.setSetting("Format", "QuickTime");

                // Try to set video codec to H.264
                outputModule.setSetting("Video Codec", "H.264");

                // Disable audio
                outputModule.setSetting("Audio Output", "Off");
            } catch (e2) {
                $.writeln("Could not set output format: " + e2.toString());
            }
        }
    } catch (error) {
        $.writeln("Error setting output format: " + error.toString() + "\nFor file: " + inputFileName);
    }

    // Start rendering the video
    app.project.renderQueue.render();
}

(function() {
    // Check if a project is open
    if (app.project.file === null) {
        alert("Please open the template project first before running this script.");
        return;
    }

    // Get the script's directory
    var scriptPath = File($.fileName).path;

    // Navigate to parent directory and then to the Input and Output folders
    var parentFolder = new Folder(scriptPath).parent;
    var inputFolder = new Folder(parentFolder.fullName + "/Video Presets Assets/Input");
    var outputFolder = new Folder(parentFolder.fullName + "/Video Presets Assets/Output");
    var templateFile = new File(parentFolder.fullName + "/Video Presets Assets/_Template/Video Presets Video Assets Template.aep");

    // Check if folders exist
    if (!inputFolder.exists) {
        alert("Input folder not found at: " + inputFolder.fullName);
        return;
    }

    if (!outputFolder.exists) {
        alert("Output folder not found at: " + outputFolder.fullName);
        return;
    }

    // Get all files from the Input folder
    var allFiles = inputFolder.getFiles();

    // Filter for video files that After Effects can handle
    var inputFiles = [];
    var supportedExtensions = [".mp4", ".mov", ".avi", ".wmv", ".mpg", ".mpeg", ".m4v", ".mxf", ".r3d", ".webm"];

    for (var i = 0; i < allFiles.length; i++) {
        var file = allFiles[i];
        // Skip if it's a directory
        if (file instanceof Folder) continue;

        // Check if the file has a supported extension
        var fileName = file.name.toLowerCase();
        var isSupported = false;

        for (var j = 0; j < supportedExtensions.length; j++) {
            if (fileName.indexOf(supportedExtensions[j]) !== -1) {
                isSupported = true;
                break;
            }
        }

        if (isSupported) {
            inputFiles.push(file);
        }
    }

    if (inputFiles.length === 0) {
        alert("No supported video files found in the Input folder.");
        return;
    }

    // Progress window setup and other code...

    // Create a progress window that doesn't require confirmation
    var progressWindow = new Window("palette", "Batch Processing Progress", undefined);
    progressWindow.orientation = "column";
    progressWindow.alignChildren = ["center", "top"];
    progressWindow.spacing = 10;
    progressWindow.margins = 16;

    // Add a static text field to show current progress
    var progressText = progressWindow.add("statictext", undefined, "Initializing...");
    progressText.preferredSize.width = 350;

    // Add a progress bar
    var progressBar = progressWindow.add("progressbar", undefined, 0, inputFiles.length);
    progressBar.preferredSize.width = 350;
    progressBar.value = 0;

    // Show the progress window
    progressWindow.show();

    // Process each input file individually
    for (var i = 0; i < inputFiles.length; i++) {
        var inputFile = inputFiles[i];

        // Update progress display without requiring confirmation
        progressText.text = "Processing file " + (i + 1) + " of " + inputFiles.length + ": " + inputFile.name;
        progressBar.value = i;
        progressWindow.update();
        $.writeln("Processing file " + (i + 1) + " of " + inputFiles.length + ": " + inputFile.name);

        // Close any open project first
        if (app.project.file !== null) {
            app.project.close(CloseOptions.DO_NOT_SAVE_CHANGES);
        }

        // Open the template project for each video
        app.open(templateFile);

        // Find the FPO footage item
        var fpoFootage = null;
        for (var j = 1; j <= app.project.numItems; j++) {
            var item = app.project.item(j);
            if (item instanceof FootageItem && item.name.indexOf("FPO") !== -1) {
                fpoFootage = item;
                break;
            }
        }

        if (!fpoFootage) {
            alert("FPO footage not found in the project for file: " + inputFile.name);
            continue;
        }

        // Replace the FPO footage with the input file
        fpoFootage.replace(inputFile);

        // Turn off audio for all compositions
        for (var j = 1; j <= app.project.numItems; j++) {
            var item = app.project.item(j);
            if (item instanceof CompItem) {
                for (var k = 1; k <= item.numLayers; k++) {
                    var layer = item.layer(k);
                    if (layer.hasAudio) {
                        layer.audioEnabled = false;
                    }
                }
            }
        }

        // Look specifically for Comp 1
        var targetComp = null;
        for (var j = 1; j <= app.project.numItems; j++) {
            var item = app.project.item(j);
            if (item instanceof CompItem && item.name === "Comp 1") {
                targetComp = item;
                break;
            }
        }

        // If Comp 1 not found, look for Main comp
        if (!targetComp) {
            for (var j = 1; j <= app.project.numItems; j++) {
                var item = app.project.item(j);
                if (item instanceof CompItem && item.name.indexOf("Main") !== -1) {
                    targetComp = item;
                    break;
                }
            }
        }

        // If still not found, use the first comp
        if (!targetComp) {
            for (var j = 1; j <= app.project.numItems; j++) {
                var item = app.project.item(j);
                if (item instanceof CompItem) {
                    targetComp = item;
                    break;
                }
            }
        }

        if (!targetComp) {
            alert("No composition found in the project for file: " + inputFile.name);
            continue;
        }

        // Calculate new width to maintain 1:1 aspect ratio with 1200px height
        var newHeight = 1200;
        var newWidth = 1200; // 1:1 aspect ratio

        // Resize the composition to 1200x1200 (1:1 aspect ratio)
        targetComp.width = newWidth;
        targetComp.height = newHeight;

        // Center and scale specific layers in the composition
        for (var l = 1; l <= targetComp.numLayers; l++) {
            var layer = targetComp.layer(l);

            // Check if this is a footage layer
            if (layer.source instanceof FootageItem && layer.source.mainSource instanceof FileSource) {
                // Calculate position to center the layer
                var xCenter = targetComp.width / 2;
                var yCenter = targetComp.height / 2;

                // Center the layer
                layer.transform.position.setValue([xCenter, yCenter]);

                // Check if this is FPO Footage or Source Footage
                var isFPOorSourceFootage = (
                    layer.name.indexOf("FPO") !== -1 ||
                    layer.name.indexOf("Source") !== -1 ||
                    layer.source.name.indexOf("FPO") !== -1 ||
                    layer.source.name.indexOf("Source") !== -1
                );

                // If the layer has a scale property, adjust it
                if (layer.transform.scale) {
                    var scaleX;

                    if (isFPOorSourceFootage) {
                        // For FPO or Source footage, scale to be exactly 1200px tall
                        // while maintaining aspect ratio
                        scaleX = (1200 / layer.source.height * 100);
                    } else {
                        // For other layers, fit within the square
                        scaleX = Math.min(
                            (targetComp.width / layer.source.width * 100),
                            (targetComp.height / layer.source.height * 100)
                        );
                    }

                    // Apply the same scale to both dimensions to maintain aspect ratio
                    layer.transform.scale.setValue([scaleX, scaleX]);

                    // Log the scaling applied
                    $.writeln("Layer: " + layer.name + " - Scaled to: " + scaleX.toFixed(2) + "%");
                }
            }
        }

        // Get the input file name and clean it
        var inputFileName = inputFile.name;
        // Clean the filename using our enhanced function
        inputFileName = cleanFileName(inputFileName);

        // Render at both sizes
        renderCompositionAtSize(targetComp, 1200, 1200, "_1200", inputFileName, outputFolder);
        renderCompositionAtSize(targetComp, 300, 300, "_300", inputFileName, outputFolder);

        // Log progress
        $.writeln("Processed " + (i + 1) + " of " + inputFiles.length + ": " + inputFileName);

        // Update progress bar
        progressBar.value = i + 1;
        progressWindow.update();
    }

    // Close the progress window
    progressWindow.close();

    alert("Batch processing complete! " + inputFiles.length + " videos have been processed.");
})();
