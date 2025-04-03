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
  // Add more color mappings as needed
};

// Define the stroke colors to be replaced and their corresponding replacement colors
var strokeColors = {
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
  // Add more color mappings as needed
};

// Define the brush colors to be replaced and their corresponding replacement colors
var brushColors = {
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
  // Add more color mappings as needed
};

// Function to find and replace swatch colors, stroke colors, brushes, and paths
function findAndReplaceColors() {
  var doc = app.activeDocument;
  var swatches = doc.swatches;

  // Replace swatch colors
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

  // Replace stroke colors
  for (var i = 0; i < doc.pageItems.length; i++) {
    var item = doc.pageItems[i];
    if (item.stroked && item.strokeColor.typename === "SpotColor") {
      var swatchName = item.strokeColor.spot.name;
      var newColor = strokeColors[swatchName];
      if (newColor) {
        var replacementSwatch = swatches.getByName(newColor);
        item.strokeColor = replacementSwatch.color;
      }
    }
  }

  // Replace brush colors
  for (var i = 0; i < doc.pageItems.length; i++) {
    var item = doc.pageItems[i];
    if (item.typename === "ArtBrushItem" || item.typename === "PatternBrushItem" || item.typename === "ScatterBrushItem") {
      var brush = item.brush;
      if (brush && brush.typename === "ArtBrush" && brush.color.typename === "SpotColor") {
        var swatchName = brush.color.spot.name;
        var newColor = brushColors[swatchName];
        if (newColor) {
          var replacementSwatch = swatches.getByName(newColor);
          brush.color = replacementSwatch.color;
        }
      }
    }
  }

  // Replace paths colors
  for (var i = 0; i < doc.pageItems.length; i++) {
    var item = doc.pageItems[i];
    if (item.typename === "PathItem" && item.fillColor && item.fillColor.typename === "SpotColor") {
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
findAndReplaceColors();
