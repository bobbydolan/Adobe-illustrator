/**
 * Video_Presets_Image_Assets.jsx
 *
 * Description: Script for placing videos from Input folder into a PSD template,
 * scaling them to 1200px height and centering them in the canvas.
 *
 * Author:
 * Created: ${new Date().toLocaleDateString()}
 *
 * Usage: Run this script from Adobe Photoshop
 */

// Enable debugging
$.writeln("Video_Presets_Image_Assets.jsx - Script Started");

// Global variables
var scriptName = "Video_Presets_Image_Assets";
var version = "1.0.0";

// File paths
var rootPath = "/Users/zandt/Desktop/VS Code/Video Presets Production";
var inputFolderPath = rootPath + "/Video Presets Assets/Input";
var templatePath = rootPath + "/Video Presets Assets/_Template/Video Presets Image Assets Template.psd";

/**
 * Main function to initialize the script
 */
function main() {
    // Check if we're in the right environment
    if (app.name === "Adobe Photoshop") {
        $.writeln("Running in Photoshop " + app.version);
        alert(scriptName + " v" + version + " initialized.");

        // Process the videos
        processVideos();
    } else {
        alert("This script is designed for Adobe Photoshop. Current application: " + app.name);
    }
}

/**
 * Rename a file, replacing spaces with underscores and removing parentheses
 * @param {File} file - The file to rename
 * @return {File} The renamed file object
 */
function renameFile(file) {
    try {
        // Log the original file details
        $.writeln("Attempting to rename file: " + file.fsName);
        $.writeln("File exists: " + file.exists);

        // Get the file name and extension
        var fileName = file.name;
        var extension = fileName.substring(fileName.lastIndexOf("."));
        var baseName = fileName.substring(0, fileName.lastIndexOf("."));

        $.writeln("Original filename: " + fileName);
        $.writeln("Base name: " + baseName);
        $.writeln("Extension: " + extension);

        // Clean the base name: replace spaces with underscores and remove parentheses
        var cleanName = baseName.replace(/\s+/g, "_");  // Replace spaces with underscores
        cleanName = cleanName.replace(/\(|\)/g, "");     // Remove parentheses

        $.writeln("Cleaned name: " + cleanName);

        // Create the new file name
        var newFileName = cleanName + extension;
        $.writeln("New filename: " + newFileName);

        // Only rename if the name has actually changed
        if (newFileName !== fileName) {
            // Create the new file path
            var newFilePath = file.parent.fsName + "/" + newFileName;
            $.writeln("New file path: " + newFilePath);

            // Check if a file with the new name already exists
            var newFileCheck = new File(newFilePath);
            if (newFileCheck.exists) {
                $.writeln("WARNING: A file with the name '" + newFileName + "' already exists!");
            }

            // Rename the file
            var renameResult = file.rename(newFileName);
            $.writeln("Rename result: " + renameResult);

            if (renameResult) {
                $.writeln("Successfully renamed file: " + fileName + " -> " + newFileName);
                return new File(newFilePath);
            } else {
                $.writeln("Failed to rename file: " + fileName);
                $.writeln("Error code: " + $.error);
                return file;
            }
        } else {
            $.writeln("No need to rename - filename already clean: " + fileName);
            return file;
        }
    } catch (error) {
        $.writeln("Error renaming file: " + error.toString());
        $.writeln("Error line: " + error.line);
        $.writeln("Error source: " + error.source);
        return file;
    }
}

/**
 * Process videos from the input folder
 */
function processVideos() {
    try {
        // Get list of video files from input folder
        var inputFolder = new Folder(inputFolderPath);
        var videoFiles = inputFolder.getFiles(function(file) {
            if (!(file instanceof File)) return false;

            var fileName = file.name.toLowerCase();
            var extension = fileName.substring(fileName.lastIndexOf("."));
            return extension === ".mp4" || extension === ".mov" || extension === ".avi";
        });

        if (videoFiles.length === 0) {
            alert("No video files found in the input folder.");
            return;
        }

        $.writeln("Found " + videoFiles.length + " video files.");

        // Instead of renaming files, we'll just clean up the names when we use them
        // This avoids permission issues with file renaming

        // Open the template PSD
        var templateFile = new File(templatePath);
        if (!templateFile.exists) {
            alert("Template file not found: " + templatePath);
            return;
        }

        // Open the template
        app.open(templateFile);
        var doc = app.activeDocument;

        // Get canvas dimensions
        var canvasWidth = doc.width.value;
        var canvasHeight = doc.height.value;
        $.writeln("Canvas dimensions: " + canvasWidth + "x" + canvasHeight);

        // Process each video file
        for (var i = 0; i < videoFiles.length; i++) {
            var videoFile = videoFiles[i];
            $.writeln("Processing video: " + videoFile.name);

            // Place the video as a smart object
            placeVideo(doc, videoFile);

            // Get the placed layer (it becomes the active layer)
            var videoLayer = doc.activeLayer;

            // Get the video filename (without extension)
            var videoName = videoFile.name.replace(/\.[^\.]+$/, '');

            // Clean the name using our consistent cleaning function
            videoName = cleanFileName(videoName);

            // Log the cleaned name
            $.writeln("Using cleaned video name: " + videoName);

            // Set the layer name to the cleaned name
            videoLayer.name = videoName;

            // Scale to 1200px height and center
            scaleAndCenterLayer(videoLayer, 1200, canvasWidth, canvasHeight);

            // Save copies with the video name at different sizes
            saveVideoFrameMultipleSizes(doc, videoName);
        }

        alert("All videos processed successfully!");

    } catch (error) {
        alert("Error processing videos: " + error.toString());
        $.writeln("Error: " + error.toString());
    }
}

/**
 * Place a video file into the document as a smart object
 * @param {Document} doc - The target Photoshop document
 * @param {File} videoFile - The video file to place
 */
function placeVideo(doc, videoFile) {
    // Make sure we're targeting the right document
    app.activeDocument = doc;

    // Place the video file
    var idPlc = charIDToTypeID("Plc ");
    var desc = new ActionDescriptor();
    var idnull = charIDToTypeID("null");
    desc.putPath(idnull, videoFile);
    var idFTcs = charIDToTypeID("FTcs");
    var idQCSt = charIDToTypeID("QCSt");
    var idQcsa = charIDToTypeID("Qcsa");
    desc.putEnumerated(idFTcs, idQCSt, idQcsa);
    executeAction(idPlc, desc, DialogModes.NO);

    // The placed item becomes the active layer
    return doc.activeLayer;
}

/**
 * Scale and center a layer to a specific height
 * @param {ArtLayer} layer - The layer to scale and center
 * @param {Number} targetHeight - The desired height in pixels
 * @param {Number} canvasWidth - The canvas width
 * @param {Number} canvasHeight - The canvas height
 */
function scaleAndCenterLayer(layer, targetHeight, canvasWidth, canvasHeight) {
    // Get the current bounds of the layer
    var bounds = layer.bounds;
    var layerWidth = bounds[2].value - bounds[0].value;
    var layerHeight = bounds[3].value - bounds[1].value;

    // Calculate scale factor to achieve target height
    var scaleFactor = (targetHeight / layerHeight) * 100;

    // Scale the layer
    layer.resize(scaleFactor, scaleFactor, AnchorPosition.MIDDLECENTER);

    // Get new bounds after scaling
    bounds = layer.bounds;
    layerWidth = bounds[2].value - bounds[0].value;
    layerHeight = bounds[3].value - bounds[1].value;

    // Calculate position to center the layer
    var xPos = (canvasWidth - layerWidth) / 2;
    var yPos = (canvasHeight - layerHeight) / 2;

    // Move the layer to center it
    layer.translate(xPos - bounds[0].value, yPos - bounds[1].value);
}

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
 * Format the filename according to requirements:
 * - Prepend "Before_After_"
 * - Capitalize first letter of each word
 * - Replace spaces with underscores
 * @param {String} fileName - The original filename
 * @return {String} The formatted filename
 */
function formatFileName(fileName) {
    // First clean the filename
    var cleaned = cleanFileName(fileName);

    // Split by underscores to capitalize each word
    var parts = cleaned.split("_");
    for (var i = 0; i < parts.length; i++) {
        if (parts[i].length > 0) {
            parts[i] = parts[i].charAt(0).toUpperCase() + parts[i].slice(1).toLowerCase();
        }
    }

    // Join back with underscores
    var formatted = parts.join("_");

    // Prepend "Before_After_"
    return "Before_After_" + formatted;
}

/**
 * Save a copy of the document with the video name as PNG at specified size
 * @param {Document} doc - The Photoshop document
 * @param {String} videoName - The name of the video (used for the filename)
 * @param {Object} sizeInfo - Object containing size information {width, height, suffix}
 */
function saveVideoFrame(doc, videoName, sizeInfo) {
    // Create a copy of the document
    var docCopy = doc.duplicate();

    // Flatten the document for PNG export
    docCopy.flatten();

    // Resize if needed
    if (sizeInfo.width && sizeInfo.height) {
        // If both width and height are specified, we need to crop to maintain aspect ratio
        if (sizeInfo.width === sizeInfo.height) {
            // For square output, crop to square first then resize
            cropToSquare(docCopy);
        }

        // Resize to target dimensions
        docCopy.resizeImage(
            UnitValue(sizeInfo.width, "px"),
            UnitValue(sizeInfo.height, "px"),
            null, ResampleMethod.BICUBIC
        );
    }

    // Format the filename
    var formattedName = formatFileName(videoName);

    // Set up PNG save options
    var saveOptions = new PNGSaveOptions();
    saveOptions.compression = 6; // Medium compression (0-9)
    saveOptions.interlaced = false;

    // Create the save path
    var outputFileName = formattedName + sizeInfo.suffix + ".png";

    // Use our consistent cleaning function for the output filename
    outputFileName = cleanFileName(outputFileName);

    // Use the original folder path (with spaces) since that's what exists on disk
    var outputFolderPath = rootPath + "/Video Presets Assets/Output/";

    // Combine path and filename, ensuring no spaces in the filename portion
    var savePath = outputFolderPath + outputFileName;

    // Log the final filename for debugging
    $.writeln("Final filename: " + outputFileName);
    $.writeln("Final save path: " + savePath);

    // Create the File object with the sanitized path
    var saveFile = new File(savePath);

    // Save the file
    docCopy.saveAs(saveFile, saveOptions, true, Extension.LOWERCASE);

    // Close the copy
    docCopy.close(SaveOptions.DONOTSAVECHANGES);

    $.writeln("Saved PNG frame for " + videoName + " as " + formattedName + sizeInfo.suffix + ".png");
}

/**
 * Crop the document to a square centered on the image
 * @param {Document} doc - The Photoshop document to crop
 */
function cropToSquare(doc) {
    // Get document dimensions
    var width = doc.width.value;
    var height = doc.height.value;

    // Calculate crop dimensions
    var size = Math.min(width, height);
    var x = (width - size) / 2;
    var y = (height - size) / 2;

    // Crop the document
    doc.crop([
        UnitValue(x, "px"),
        UnitValue(y, "px"),
        UnitValue(x + size, "px"),
        UnitValue(y + size, "px")
    ]);
}

/**
 * Save multiple sizes of the video frame
 * @param {Document} doc - The Photoshop document
 * @param {String} videoName - The name of the video (used for the filename)
 */
function saveVideoFrameMultipleSizes(doc, videoName) {
    // Save 1200x1200px square version
    saveVideoFrame(doc, videoName, {
        width: 1200,
        height: 1200,
        suffix: "_1200"
    });

    // Save 300x300px square version
    saveVideoFrame(doc, videoName, {
        width: 300,
        height: 300,
        suffix: "_300"
    });
}

// Run the script
main();

// End of script
$.writeln("Video_Presets_Image_Assets.jsx - Script Completed");
