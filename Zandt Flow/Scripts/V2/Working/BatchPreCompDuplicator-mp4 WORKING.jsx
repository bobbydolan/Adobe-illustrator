// BatchPreCompDuplicator.jsx
// This script automates the process of duplicating a pre-composition structure
// and replacing footage for each file in a specified directory.
//
// Author: DevMate
// Created: 2023

(function() {
    // Check if a project is open
    if (app.project === null) {
        alert("Please open a project first.");
        return;
    }

    // UI for the script
    var win = new Window("dialog", "Batch Pre-Comp Duplicator");
    win.orientation = "column";
    win.alignChildren = ["fill", "top"];
    win.spacing = 10;
    win.margins = 16;

    // Source pre-composition selection
    var sourcePreCompGroup = win.add("panel", undefined, "Source Pre-Composition");
    sourcePreCompGroup.orientation = "row";
    sourcePreCompGroup.alignChildren = ["left", "center"];
    sourcePreCompGroup.spacing = 10;
    sourcePreCompGroup.margins = 10;

    var sourcePreCompDropdown = sourcePreCompGroup.add("dropdownlist");
    sourcePreCompDropdown.size = [300, 25];
    populateCompDropdown(sourcePreCompDropdown);

    // Source footage item selection
    var sourceFPOFootageGroup = win.add("panel", undefined, "Source FPO Footage Item");
    sourceFPOFootageGroup.orientation = "row";
    sourceFPOFootageGroup.alignChildren = ["left", "center"];
    sourceFPOFootageGroup.spacing = 10;
    sourceFPOFootageGroup.margins = 10;

    var sourceFPOFootageDropdown = sourceFPOFootageGroup.add("dropdownlist");
    sourceFPOFootageDropdown.size = [300, 25];
    populateFootageDropdown(sourceFPOFootageDropdown);

    // Footage directory selection
    var footageDirGroup = win.add("panel", undefined, "Replacement Footage Directory");
    footageDirGroup.orientation = "row";
    footageDirGroup.alignChildren = ["left", "center"];
    footageDirGroup.spacing = 10;
    footageDirGroup.margins = 10;

    var footageDirInput = footageDirGroup.add("edittext");
    footageDirInput.size = [240, 25];

    var browseButton = footageDirGroup.add("button", undefined, "Browse...");
    browseButton.size = [60, 25];

    browseButton.onClick = function() {
        var folder = Folder.selectDialog("Select Folder Containing Replacement Footage");
        if (folder) {
            footageDirInput.text = folder.fsName;
        }
    };

    // File filter options
    var filterGroup = win.add("panel", undefined, "File Filter");
    filterGroup.orientation = "row";
    filterGroup.alignChildren = ["left", "center"];
    filterGroup.spacing = 10;
    filterGroup.margins = 10;

    var filterInput = filterGroup.add("edittext", undefined, "*.mp4;*.mov;*.avi");
    filterInput.size = [300, 25];

    // Output options
    var outputGroup = win.add("panel", undefined, "Output Options");
    outputGroup.orientation = "column";
    outputGroup.alignChildren = ["left", "top"];
    outputGroup.spacing = 10;
    outputGroup.margins = 10;

    // Naming convention
    var namingGroup = outputGroup.add("group");
    namingGroup.orientation = "row";
    namingGroup.alignChildren = ["left", "center"];
    namingGroup.spacing = 10;

    namingGroup.add("statictext", undefined, "Naming Convention:");

    var namingOptions = namingGroup.add("dropdownlist", undefined, ["Footage Name", "Footage Name + Original Comp Name", "Original Comp Name + Footage Name"]);
    namingOptions.selection = 0;

    // Add to render queue option
    var renderQueueCheck = outputGroup.add("checkbox", undefined, "Add to Render Queue");
    renderQueueCheck.value = false;

    // Debug mode option
    var debugCheck = outputGroup.add("checkbox", undefined, "Debug Mode (Show detailed alerts)");
    debugCheck.value = false;

    // Buttons
    var buttonGroup = win.add("group");
    buttonGroup.orientation = "row";
    buttonGroup.alignChildren = ["center", "center"];
    buttonGroup.spacing = 10;

    var cancelButton = buttonGroup.add("button", undefined, "Cancel");
    var okButton = buttonGroup.add("button", undefined, "OK");
    okButton.size = [120, 30];

    // Set default selection for dropdowns if available
    if (sourcePreCompDropdown.items.length > 0) {
        sourcePreCompDropdown.selection = 0;
    }

    if (sourceFPOFootageDropdown.items.length > 0) {
        sourceFPOFootageDropdown.selection = 0;
    }

    // Handle OK button click
    okButton.onClick = function() {
        if (!sourcePreCompDropdown.selection) {
            alert("Please select a source pre-composition.");
            return;
        }

        if (!sourceFPOFootageDropdown.selection) {
            alert("Please select a source FPO footage item.");
            return;
        }

        if (!footageDirInput.text) {
            alert("Please select a directory containing replacement footage.");
            return;
        }

        // Add debug info about all project items if debug mode is enabled
        if (debugCheck.value) {
            var debugInfo = "Project Items:\n";
            for (var i = 1; i <= app.project.numItems; i++) {
                var item = app.project.item(i);
                debugInfo += i + ": " + item.name + " - Type: " + (item instanceof CompItem ? "Composition" :
                             item instanceof FootageItem ? "Footage" :
                             item instanceof FolderItem ? "Folder" : "Unknown") + "\n";
            }
            alert(debugInfo);
        }

        // Get the selected items by index
        var compIndex = 0;
        var footageIndex = 0;

        // Find the indices of the selected items
        for (var i = 1; i <= app.project.numItems; i++) {
            var item = app.project.item(i);
            if (item instanceof CompItem && item.name === sourcePreCompDropdown.selection.text) {
                compIndex = i;
            }
            if (item instanceof FootageItem && item.name === sourceFPOFootageDropdown.selection.text) {
                footageIndex = i;
            }
        }

        // Get the actual items
        var sourcePreComp = compIndex > 0 ? app.project.item(compIndex) : null;
        var sourceFPOFootage = footageIndex > 0 ? app.project.item(footageIndex) : null;

        // Debug info about selected items if debug mode is enabled
        if (debugCheck.value) {
            alert("Selected items:\n" +
                  "Pre-Comp: " + (sourcePreComp ? sourcePreComp.name + " (ID: " + sourcePreComp.id + ")" : "Not found") + "\n" +
                  "Footage: " + (sourceFPOFootage ? sourceFPOFootage.name + " (ID: " + sourceFPOFootage.id + ")" : "Not found"));
        }

        // Check if the selected items are of the correct type
        if (!sourcePreComp || !(sourcePreComp instanceof CompItem)) {
            alert("Error: Selected source pre-comp is not a composition or could not be found.");
            return;
        }

        if (!sourceFPOFootage || !(sourceFPOFootage instanceof FootageItem)) {
            alert("Error: Selected source FPO footage is not a footage item or could not be found.");
            return;
        }

        // Check if the pre-comp and footage have the same name (potential confusion)
        if (sourcePreComp.name === sourceFPOFootage.name) {
            var confirmSameName = confirm("Warning: Your pre-comp and footage have the same name '" + sourcePreComp.name + "'. This might cause confusion. Continue anyway?");
            if (!confirmSameName) {
                return;
            }
        }

        var footageDir = new Folder(footageDirInput.text);
        var fileFilter = filterInput.text.split(";");

        // Process the batch duplication and replacement
        processBatchDuplication(
            sourcePreComp,
            sourceFPOFootage,
            footageDir,
            fileFilter,
            namingOptions.selection.index,
            renderQueueCheck.value,
            debugCheck.value
        );

        win.close();
    };

    // Handle Cancel button click
    cancelButton.onClick = function() {
        win.close();
    };

    // Show the UI
    if (win instanceof Window) {
        win.center();
        win.show();
    }

    // Function to populate composition dropdown
    function populateCompDropdown(dropdown) {
        dropdown.removeAll();

        for (var i = 1; i <= app.project.numItems; i++) {
            var item = app.project.item(i);
            if (item instanceof CompItem) {
                dropdown.add("item", item.name);
            }
        }
    }

    // Function to populate footage dropdown
    function populateFootageDropdown(dropdown) {
        dropdown.removeAll();

        for (var i = 1; i <= app.project.numItems; i++) {
            var item = app.project.item(i);
            if (item instanceof FootageItem && !item.mainSource.isStill) {
                dropdown.add("item", item.name);
            }
        }
    }

    // Function to process the batch duplication and replacement
    function processBatchDuplication(sourcePreComp, sourceFPOFootage, footageDir, fileFilter, namingOption, addToRenderQueue, debugMode) {
        app.beginUndoGroup("Batch Pre-Comp Duplication");

        if (debugMode) {
            alert("Starting batch process with:\n" +
                  "- Source Pre-Comp: " + sourcePreComp.name + " (ID: " + sourcePreComp.id + ")\n" +
                  "- Source FPO Footage: " + sourceFPOFootage.name + " (ID: " + sourceFPOFootage.id + ")\n" +
                  "- Directory: " + footageDir.fsName);
        }

        var files = [];

        // Collect all files matching the filter
        try {
            for (var f = 0; f < fileFilter.length; f++) {
                var filteredFiles = footageDir.getFiles(fileFilter[f]);
                for (var i = 0; i < filteredFiles.length; i++) {
                    files.push(filteredFiles[i]);
                }
            }
        } catch (e) {
            alert("Error collecting files: " + e.toString());
            app.endUndoGroup();
            return;
        }

        if (files.length === 0) {
            alert("No matching files found in the selected directory.");
            app.endUndoGroup();
            return;
        }

        if (debugMode) {
            alert("Found " + files.length + " matching files in the directory.");
        }

        // Create a new folder for the duplicated comps and a subfolder for input footage
        var outputFolder, inputFolder;
        try {
            outputFolder = app.project.items.addFolder("Batch Output - " + new Date().toLocaleString());
            inputFolder = app.project.items.addFolder("_input");
            inputFolder.parentFolder = outputFolder;

            if (debugMode) {
                alert("Created output folder and _input subfolder for footage");
            }
        } catch (e) {
            alert("Error creating output folders: " + e.toString());
            app.endUndoGroup();
            return;
        }

        // Process each file
        var createdComps = [];
        var errorCount = 0;

        for (var i = 0; i < files.length; i++) {
            try {
                var file = files[i];

                if (debugMode) {
                    alert("Processing file " + (i+1) + " of " + files.length + ": " + file.name);
                }

                // Import the new footage
                var importOptions = new ImportOptions(file);
                if (!importOptions.canImportAs(ImportAsType.FOOTAGE)) {
                    if (debugMode) {
                        alert("Skipping file " + file.name + " - cannot import as footage.");
                    }
                    continue;
                }

                var newFootage = app.project.importFile(importOptions);

                // Move the imported footage to the _input folder
                newFootage.parentFolder = inputFolder;

                if (debugMode) {
                    alert("Successfully imported " + file.name + " as footage item and moved to _input folder.");
                }

                // Duplicate the pre-composition
                var newPreComp = sourcePreComp.duplicate();

                if (debugMode) {
                    alert("Successfully duplicated pre-comp: " + sourcePreComp.name + " → " + newPreComp.name);
                }

                // Generate the new comp name based on naming option
                var fileName = file.name.split('.')[0];
                var newCompName = "";

                switch (namingOption) {
                    case 0: // Footage Name
                        newCompName = fileName;
                        break;
                    case 1: // Footage Name + Original Comp Name
                        newCompName = fileName + " - " + sourcePreComp.name;
                        break;
                    case 2: // Original Comp Name + Footage Name
                        newCompName = sourcePreComp.name + " - " + fileName;
                        break;
                }

                newPreComp.name = newCompName;
                newPreComp.parentFolder = outputFolder;

                if (debugMode) {
                    alert("Renamed comp to: " + newCompName);
                }

                // Use recursive function to replace footage in the comp and all its nested comps
                var replacementCount = replaceFootageInCompTree(newPreComp, sourceFPOFootage, newFootage, 10, debugMode); // Max depth of 10 levels

                if (debugMode) {
                    alert("Replaced " + replacementCount + " instances of footage in " + newPreComp.name + " and its nested comps.");
                }

                createdComps.push(newPreComp);

            } catch (e) {
                errorCount++;
                alert("Error processing file " + (i+1) + " (" + files[i].name + "): " + e.toString());
                // Continue with the next file
            }
        }

        // Add to render queue if requested
        if (addToRenderQueue && createdComps.length > 0) {
            try {
                // Create a render folder in the project's parent folder
                var projectFile = app.project.file;
                var renderFolder = null;

                if (projectFile) {
                    // Get the project's parent folder
                    var projectParentPath = projectFile.parent.fsName;

                    // Create a "render" folder if it doesn't exist
                    renderFolder = new Folder(projectParentPath + "/_Output-Render");
                    if (!renderFolder.exists) {
                        renderFolder.create();
                    }

                    if (debugMode) {
                        alert("Created render folder at: " + renderFolder.fsName);
                    }
                }

                for (var i = 0; i < createdComps.length; i++) {
                    var renderQueueItem = app.project.renderQueue.items.add(createdComps[i]);
                    var outputModule = renderQueueItem.outputModule(1);

                    // First approach: Try to use a template if available
                    try {
                        // Try common template names for H.264
                        var templateNames = ["H.264", "H264", "MP4", "H.264 - Match Source - High bitrate"];
                        var templateApplied = false;

                        for (var t = 0; t < templateNames.length; t++) {
                            try {
                                outputModule.applyTemplate(templateNames[t]);
                                templateApplied = true;
                                break;
                            } catch (e) {
                                // Template not found, try next one
                            }
                        }

                        if (!templateApplied) {
                            // If no template worked, use a basic approach
                            // Set output to QuickTime format (which can contain H.264)
                            outputModule.setSettings({
                                "Output File Info": {
                                    "Base Path": renderFolder ? renderFolder.fsName : "~/Desktop",
                                    "File Name": createdComps[i].name + ".mp4"
                                }
                            });
                        }

                        // Disable audio - this is the safer way
                        try {
                            var omSettings = outputModule.getSettings();
                            omSettings["Audio Output"] = "Off";
                            outputModule.setSettings(omSettings);
                        } catch (e) {
                            if (debugMode) {
                                alert("Could not disable audio: " + e.toString());
                            }
                        }
                    } catch (e) {
                        if (debugMode) {
                            alert("Error configuring output module: " + e.toString());
                        }
                    }

                    // Set the output path if we have a render folder
                    if (renderFolder) {
                        try {
                            var outputPath = renderFolder.fsName + "/" + createdComps[i].name + ".mp4";
                            outputModule.file = new File(outputPath);
                        } catch (e) {
                            if (debugMode) {
                                alert("Could not set output path: " + e.toString());
                            }
                        }
                    }
                }


                if (debugMode) {
                    alert("Added " + createdComps.length + " compositions to the render queue with output to render folder.");
                }
            } catch (e) {
                alert("Error adding to render queue: " + e.toString());
            }
        }

        var summaryMessage = "Created " + createdComps.length + " compositions with replaced footage.";
        if (errorCount > 0) {
            summaryMessage += "\n" + errorCount + " errors occurred during processing.";
        }

        alert(summaryMessage);

        app.endUndoGroup();
    }

    // Function to recursively search for footage in a composition and its nested comps
    function replaceFootageInCompTree(comp, oldFootage, newFootage, maxDepth, debugMode) {
        if (maxDepth <= 0) return 0; // Prevent infinite recursion

        var replacementCount = 0;

        if (debugMode) {
            alert("Searching for footage to replace in comp: " + comp.name);
        }

        // Replace direct footage usages
        for (var i = 1; i <= comp.numLayers; i++) {
            try {
                var layer = comp.layer(i);

                if (debugMode) {
                    alert("Checking layer " + i + ": " + layer.name);
                }

                if (layer.source === oldFootage) {
                    if (debugMode) {
                        alert("Found match! Replacing footage in layer: " + layer.name);
                    }

                    layer.replaceSource(newFootage, false);
                    replacementCount++;
                }
                // If this layer is a comp, recursively search it
                else if (layer.source instanceof CompItem) {
                    if (debugMode) {
                        alert("Layer " + layer.name + " is a comp. Searching inside...");
                    }

                    replacementCount += replaceFootageInCompTree(layer.source, oldFootage, newFootage, maxDepth - 1, debugMode);
                }
            } catch (e) {
                if (debugMode) {
                    alert("Error checking layer " + i + ": " + e.toString());
                }
                // Skip layers that cause errors
            }
        }

        return replacementCount;
    }
})();
