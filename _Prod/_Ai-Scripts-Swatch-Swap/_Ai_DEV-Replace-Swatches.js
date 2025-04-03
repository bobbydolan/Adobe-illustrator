#target illustrator

// Define the swatch colors to be replaced and their corresponding replacement colors
var swatchColors = {
  "Yellow 600 Extended": "Red 300 Extended",
  "Gray 300 Extended": "Green 700 Extended",
  // Add more color mappings as needed
};

// Function to find and replace swatch colors
function findAndReplaceSwatchColors() {
  var doc = app.activeDocument;
  var swatches = doc.swatches;

  for (var i = 0; i < doc.pageItems.length; i++) {
    var item = doc.pageItems[i];
    if (item.fillColor && item.fillColor.typename === "SpotColor") {
      var swatchName = item.fillColor.spot.name;
      var newColor = swatchColors[swatchName];
      if (newColor) {
        var replacementSwatch = swatches.getByName(newColor);
        item.fillColor = replacementSwatch.color;
      }
    }
  }
}

// Call the function to execute the script
app.executeMenuCommand("deselectall");
findAndReplaceSwatchColors();
