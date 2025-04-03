#target illustrator

// Define the swatch colors to be replaced and their corresponding replacement colors
var swatchColors = {
  "Light_Gray_01_RGB": "Light_Gray_02_RGB",
  "FB_Blue_Gray_RGB": "Dark_Gray_09_RGB",
  "Light_Gray_03_RGB": "FB_Blue_Gray_RGB",
  "Navy_02_RGB": "Navy_05_RGB",
  "Navy_03_RGB": "Navy_07_RGB",
  "Orange_02_RGB": "Orange_04_RGB",
  "Orange_03_RGB": "Orange_05_RGB",
  "Teal_02_RGB": "Teal_04_RGB",
  "Teal_03_RGB": "Teal_06_RGB",
  "Purple_02_RGB": "Purple_03_RGB",
  "Purple_03_RGB": "Purple_04_RGB",
  // "__": "___",
  // "__": "___",
  // "__": "___",
  // "__": "___",
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
