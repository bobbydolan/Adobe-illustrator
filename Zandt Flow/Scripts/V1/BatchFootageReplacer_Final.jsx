// BatchFootageReplacer.jsx
// This script automates the process of duplicating a pre-composition and replacing its footage
// with multiple source files from a specified directory.
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
    var win = new Window("dialog", "Batch Footage Replacer");
    win.orientation = "column";
    win.alignChildren = ["fill", "top"];
    win.spacing = 10;
    win.margins = 16;

    // Source composition selection
    var sourceCompGroup = win.add("panel", undefined, "Source Composition");
    sourceCompGroup.orientation = "row";
    sourceCompGroup.alignChildren = ["left", "center"];
    sourceCompGroup.spacing = 10;
    sourceCompGroup.margins = 10;

    var sourceCompDropdown = sourceCompGroup.add("dropdownlist");
    sourceCompDropdown.size = [300, 25];
    populateCompDropdown(sourceCompDropdown);

    // Source footage layer selection
    var sourceFootageGroup = win.add("panel", undefined, "Source Footage Layer");
    sourceFootageGroup.orientation = "column";
    sourceFootageGroup.alignChildren = ["left", "top"];
    sourceFootageGroup.spacing = 10;
    sourceFootageGroup.margins = 10;

    // Add a checkbox for "FPO Footage"
    var useFPOCheck = sourceFootageGroup.add("checkbox", undefined, "Use 'FPO Footage' layer (recommended)");
    useFPOCheck.value = true;

    var dropdownGroup = sourceFootageGroup.add("group");
    dropdownGroup.orientation = "row";
    dropdownGroup.alignChildren = ["left", "center"];

    var sourceFootageDropdown = dropdownGroup.add("dropdownlist");
    sourceFootageDropdown.size = [300, 25];
    sourceFootageDropdown.enabled = !useFPOCheck.value;

    // Toggle dropdown enabled state based on checkbox
    useFPOCheck.onClick = function() {
        sourceFootageDropdown.enabled = !useFPOCheck.value;
    };

    // Update footage layer dropdown when comp selection changes
    sourceCompDropdown.onChange = function() {
        populateLayerDropdown(sourceFootageDropdown, sourceCompDropdown.selection.index);
    };

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

    // Buttons
    var buttonGroup = win.add("group");
    buttonGroup.orientation = "row";
    buttonGroup.alignChildren = ["center", "center"];
    buttonGroup.spacing = 10;

    var cancelButton = buttonGroup.add("button", undefined, "Cancel");
    var okButton = buttonGroup.add("button", undefined, "OK");
    okButton.size = [120, 30];

    // Set default selection for dropdowns if available
    if (sourceCompDropdown.items.length > 0) {
        sourceCompDropdown.selection = 0;
        populateLayerDropdown(sourceFootageDropdown, 0);
    }

    // Handle OK button click
    okButton.onClick = function() {
        if (!sourceCompDropdown.selection) {
            alert("Please select a source composition.");
            return;
        }

        if (!useFPOCheck.value && !sourceFootageDropdown.selection) {
            alert("Please select a footage layer to replace.");
            return;
        }

        if (!footageDirInput.text) {
            alert("Please select a directory containing replacement footage.");
            return;
        }

        var sourceCompIndex = sourceCompDropdown.selection.index + 1;
        var sourceComp = app.project.item(sourceCompIndex);
        var sourceLayerName = useFPOCheck.value ? "FPO Footage" : sourceFootageDropdown.selection.text;
        var footageDir = new Folder(footageDirInput.text);
        var fileFilter = filterInput.text.split(";");

        // If "Show All Layers" is selected and not using FPO Footage, prompt for layer name
        if (!useFPOCheck.value && sourceLayerName === "-- Show All Layers --") {
            // Create a list of all layers in the comp
            var layerNames = [];
            for (var i = 1; i <= sourceComp.numLayers; i++) {
                layerNames.push(sourceComp.layer(i).name);
            }

            // Show a dialog to select from all layers
            var layerDialog = new Window("dialog", "Select Layer");
            layerDialog.orientation = "column";
            layerDialog.alignChildren = ["fill", "top"];
            layerDialog.spacing = 10;
            layerDialog.margins = 16;

            layerDialog.add("statictext", undefined, "Select the layer to replace:");

            var layerList = layerDialog.add("listbox", undefined, layerNames);
            layerList.selection = 0;
            layerList.size = [300, 200];

            var btnGroup = layerDialog.add("group");
            btnGroup.orientation = "row";
            btnGroup.alignChildren = ["center", "center"];

            var cancelBtn = btnGroup.add("button", undefined, "Cancel");
            var okBtn = btnGroup.add("button", undefined, "OK");

            var selectedLayerName = null;

            okBtn.onClick = function() {
                if (layerList.selection !== null) {
                    selectedLayerName = layerNames[layerList.selection.index];
                    layerDialog.close();
                } else {
                    alert("Please select a layer.");
                }
            };

            cancelBtn.onClick = function() {
                layerDialog.close();
            };

            layerDialog.center();
            layerDialog.show();

            if (selectedLayerName === null) {
                return; // User canceled
            }

            sourceLayerName = selectedLayerName;
        }

        // Process the batch replacement
        processBatchReplacement(
            sourceComp,
            sourceLayerName,
            footageDir,
            fileFilter,
            namingOptions.selection.index,
            renderQueueCheck.value
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

    // Function to populate layer dropdown based on selected composition
    function populateLayerDropdown(dropdown, compIndex) {
        dropdown.removeAll();

        if (compIndex < 0 || app.project.numItems <= compIndex) {
            return;
        }

        var comp = app.project.item(compIndex + 1);
        if (!(comp instanceof CompItem)) {
            return;
        }

        // Add a "Show All Layers" option at the top
        var showAllLayersOption = dropdown.add("item", "-- Show All Layers --");

        var foundFootageLayers = false;

        // First pass: Add video footage layers (most common case)
        for (var i = 1; i <= comp.numLayers; i++) {
            var layer = comp.layer(i);
            try {
                if (layer.source instanceof FootageItem &&
                    layer.source.mainSource &&
                    !layer.source.mainSource.isStill) {
                    dropdown.add("item", layer.name);
                    foundFootageLayers = true;
                }
            } catch (e) {
                // Skip any layers that cause errors when checking properties
            }
        }

        // Second pass: Add any layer that has a source that's a FootageItem
        // This catches still images, precomps, and other footage types
        if (!foundFootageLayers) {
            for (var i = 1; i <= comp.numLayers; i++) {
                var layer = comp.layer(i);
                try {
                    if (layer.source instanceof FootageItem) {
                        // Only add if not already added
                        var alreadyAdded = false;
                        for (var j = 0; j < dropdown.items.length; j++) {
                            if (dropdown.items[j].text === layer.name) {
                                alreadyAdded = true;
                                break;
                            }
                        }

                        if (!alreadyAdded) {
                            dropdown.add("item", layer.name);
                        }
                    }
                } catch (e) {
                    // Skip any layers that cause errors
                }
            }
        }

        if (dropdown.items.length > 1) { // More than just the "Show All Layers" option
            dropdown.selection = 1; // Select the first actual layer
        } else {
            dropdown.selection = 0; // Select "Show All Layers"
        }
    }

    // Function to process the batch replacement
    function processBatchReplacement(sourceComp, sourceLayerName, footageDir, fileFilter, namingOption, addToRenderQueue) {
        app.beginUndoGroup("Batch Footage Replacement");

        var files = [];

        // Collect all files matching the filter
        for (var f = 0; f < fileFilter.length; f++) {
            var filteredFiles = footageDir.getFiles(fileFilter[f]);
            for (var i = 0; i < filteredFiles.length; i++) {
                files.push(filteredFiles[i]);
            }
        }

        if (files.length === 0) {
            alert("No matching files found in the selected directory.");
            app.endUndoGroup();
            return;
        }

        // Find the source layer in the composition
        var sourceLayer = null;
        for (var i = 1; i <= sourceComp.numLayers; i++) {
            if (sourceComp.layer(i).name === sourceLayerName) {
                sourceLayer = sourceComp.layer(i);
                break;
            }
        }

        if (!sourceLayer) {
            // Special handling for FPO Footage - try case-insensitive match
            if (sourceLayerName === "FPO Footage") {
                for (var i = 1; i <= sourceComp.numLayers; i++) {
                    var layerName = sourceComp.layer(i).name;
                    if (layerName.toLowerCase() === "fpo footage") {
                        sourceLayer = sourceComp.layer(i);
                        break;
                    }
                }

                // If still not found, try partial match
                if (!sourceLayer) {
                    for (var i = 1; i <= sourceComp.numLayers; i++) {
                        var layerName = sourceComp.layer(i).name.toLowerCase();
                        if (layerName.indexOf("fpo") >= 0 && layerName.indexOf("footage") >= 0) {
                            sourceLayer = sourceComp.layer(i);
                            break;
                        }
                    }
                }
            }

            if (!sourceLayer) {
                alert("Could not find the specified layer '" + sourceLayerName + "' in the composition.");
                app.endUndoGroup();
                return;
            }
        }

        // Check if the layer can have its source replaced
        try {
            // Just a test to see if this property exists and is accessible
            var testSource = sourceLayer.source;
            if (!testSource) {
                alert("Warning: The selected layer doesn't have a source property. It may not be replaceable.");
                // Continue anyway - the user might know what they're doing
            }
        } catch (e) {
            alert("Warning: " + e.toString() + "\nThe script will try to continue, but replacement might fail.");
        }

        // Create a new folder for the duplicated comps with formatted date
        var now = new Date();
        var month = (now.getMonth() + 1).toString().padStart(2, '0');
        var day = now.getDate().toString().padStart(2, '0');
        var year = now.getFullYear().toString().slice(-2);
        var hours = now.getHours().toString().padStart(2, '0');
        var minutes = now.getMinutes().toString().padStart(2, '0');

        var formattedDate = month + "/" + day + "/" + year + " " + hours + ":" + minutes + " PST";
        var outputFolder = app.project.items.addFolder("Batch Run - " + formattedDate);

        // Process each file
        var createdComps = [];
        for (var i = 0; i < files.length; i++) {
            var file = files[i];

            // Import the footage
            var importOptions = new ImportOptions(file);
            if (!importOptions.canImportAs(ImportAsType.FOOTAGE)) {
                continue;
            }

            var newFootage = app.project.importFile(importOptions);

            // Duplicate the composition
            var newComp = sourceComp.duplicate();

            // Generate the new comp name based on naming option
            var fileName = file.name.split('.')[0];
            var newCompName = "";

            switch (namingOption) {
                case 0: // Footage Name
                    newCompName = fileName;
                    break;
                case 1: // Footage Name + Original Comp Name
                    newCompName = fileName + " - " + sourceComp.name;
                    break;
                case 2: // Original Comp Name + Footage Name
                    newCompName = sourceComp.name + " - " + fileName;
                    break;
            }

            newComp.name = newCompName;
            newComp.parentFolder = outputFolder;

            // Find the corresponding layer in the new comp
            var layerToReplace = null;
            for (var j = 1; j <= newComp.numLayers; j++) {
                if (newComp.layer(j).name === sourceLayerName) {
                    layerToReplace = newComp.layer(j);
                    break;
                }
            }

            // If not found by exact name, try the same fuzzy matching as above
            if (!layerToReplace && sourceLayerName === "FPO Footage") {
                for (var j = 1; j <= newComp.numLayers; j++) {
                    var layerName = newComp.layer(j).name;
                    if (layerName.toLowerCase() === "fpo footage") {
                        layerToReplace = newComp.layer(j);
                        break;
                    }
                }

                if (!layerToReplace) {
                    for (var j = 1; j <= newComp.numLayers; j++) {
                        var layerName = newComp.layer(j).name.toLowerCase();
                        if (layerName.indexOf("fpo") >= 0 && layerName.indexOf("footage") >= 0) {
                            layerToReplace = newComp.layer(j);
                            break;
                        }
                    }
                }
            }

            if (layerToReplace) {
                try {
                    // Replace the footage
                    layerToReplace.replaceSource(newFootage, false);
                } catch (e) {
                    alert("Error replacing footage in comp '" + newComp.name + "': " + e.toString());
                }
            }

            createdComps.push(newComp);
        }

        // Add to render queue if requested
        if (addToRenderQueue && createdComps.length > 0) {
            // Create a render folder in the project's parent folder
            var projectFile = app.project.file;
            var renderFolder = null;

            if (projectFile) {
                // Get the project's parent folder
                var projectParentPath = projectFile.parent.fsName;

                // Create a "_Output-Render" folder if it doesn't exist
                renderFolder = new Folder(projectParentPath + "/_Output-Render");
                if (!renderFolder.exists) {
                    renderFolder.create
