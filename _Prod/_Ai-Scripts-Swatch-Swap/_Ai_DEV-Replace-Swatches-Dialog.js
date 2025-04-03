#target illustrator

// Create a dialog window
var dialog = new Window("dialog", "Swatch Replacer");
dialog.alignChildren = "center";

// Add a dropdown list for original swatch selection
var originalSwatchDropdown = dialog.add("dropdownlist", undefined, getSwatchNames());
originalSwatchDropdown.selection = 0;
originalSwatchDropdown.preferredSize.width = 200;

// Add a dropdown list for replacement swatch selection
var replacementSwatchDropdown = dialog.add("dropdownlist", undefined, getSwatchNames());
replacementSwatchDropdown.selection = 0;
replacementSwatchDropdown.preferredSize.width = 200;

// Add a button to initiate swatch replacement
var replaceButton = dialog.add("button", undefined, "Replace Swatch");
replaceButton.onClick = function() {
    var originalSwatch = app.activeDocument.swatches.getByName(originalSwatchDropdown.selection.text);
    var replacementSwatch = app.activeDocument.swatches.getByName(replacementSwatchDropdown.selection.text);
    if (originalSwatch && replacementSwatch) {
        replaceSwatch(originalSwatch, replacementSwatch);
        dialog.close(); // Close the dialog window after swatch replacement
    }
};

// Function to replace swatch
function replaceSwatch(originalSwatch, replacementSwatch) {
    for (var i = 0; i < app.activeDocument.pageItems.length; i++) {
        var pageItem = app.activeDocument.pageItems[i];
        if (pageItem.fillColor instanceof SpotColor && pageItem.fillColor.spot.name === originalSwatch.name) {
            pageItem.fillColor = replacementSwatch.color;
        }
        if (pageItem.strokeColor instanceof SpotColor && pageItem.strokeColor.spot.name === originalSwatch.name) {
            pageItem.strokeColor = replacementSwatch.color;
        }
    }
    // alert("Swatch replaced successfully!");
}

// Function to get an array of swatch names
function getSwatchNames() {
    var swatchNames = [];
    for (var i = 0; i < app.activeDocument.swatches.length; i++) {
        swatchNames.push(app.activeDocument.swatches[i].name);
    }
    return swatchNames;
}

// Show the dialog window
dialog.show();
