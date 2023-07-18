#target illustrator

// Define the swatch colors to be replaced and their corresponding replacement colors
var colorMappings = [
  { source: "Light_Gray_01_RGB", target: "Light_Gray_02_RGB" },
  { source: "FB_Blue_Gray_RGB", target: "Dark_Gray_09_RGB" },
  { source: "Light_Gray_03_RGB", target: "FB_Blue_Gray_RGB" },
  { source: "Navy_02_RGB", target: "Navy_05_RGB" },
  { source: "Navy_03_RGB", target: "Navy_07_RGB" },
  { source: "Orange_02_RGB", target: "Orange_04_RGB" },
  { source: "Orange_03_RGB", target: "Orange_05_RGB" },
  { source: "Teal_02_RGB", target: "Teal_04_RGB" },
  { source: "Teal_03_RGB", target: "Teal_06_RGB" },
  { source: "Purple_02_RGB", target: "Purple_03_RGB" },
  { source: "Purple_03_RGB", target: "Purple_04_RGB" },
  // { source: "__", target: "___" },
  // Add more color mappings as needed
];

// Function to find and replace swatch colors
function findAndReplaceColors() {
  var doc = app.activeDocument;
  var swatches = doc.swatches;

  for (var i = 0; i < doc.pageItems.length; i++) {
    var item = doc.pageItems[i];
    if (item.fillColor && item.fillColor.typename === "SpotColor") {
      var swatchName = item.fillColor.spot.name;
      var mapping = getMappingBySource(swatchName);
      if (mapping) {
        var replacementSwatch = swatches.getByName(mapping.target);
        item.fillColor = replacementSwatch.color;
      }
    }

    if (item.stroked && item.strokeColor.typename === "SpotColor") {
      var swatchName = item.strokeColor.spot.name;
      var mapping = getMappingBySource(swatchName);
      if (mapping) {
        var replacementSwatch = swatches.getByName(mapping.target);
        item.strokeColor = replacementSwatch.color;
      }
    }
  }
}

// Helper function to retrieve the mapping by source color
function getMappingBySource(sourceColor) {
  for (var i = 0; i < colorMappings.length; i++) {
    var mapping = colorMappings[i];
    if (mapping.source === sourceColor) {
      return mapping;
    }
  }
  return null;
}

// Call the function to execute the script
app.executeMenuCommand("deselectall");
findAndReplaceColors();


// Turn off the alert below to not show
alert("Swatches have been swapped to DM");