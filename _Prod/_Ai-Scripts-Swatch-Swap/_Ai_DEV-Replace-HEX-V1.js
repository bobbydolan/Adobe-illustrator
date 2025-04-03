#target illustrator

// Define the source and target hex color mappings
var colorMappings = [
  { source: "#CFD7DD", target: "#00FF00" },  // Replace with your color mappings
  { source: "#0000FF", target: "#FFFF00" },
  { source: "#00FF00", target: "#0000FF" }
  // Add more color mappings as needed
];

// Get the active document
var doc = app.activeDocument;

// Call the function to replace the colors
replaceHexColors(doc, colorMappings);

// Function to replace specific hex colors in the document
function replaceHexColors(document, mappings) {
  var replacedColors = [];
  var unreplacedColors = [];
  
  // Iterate over each mapping
  for (var i = 0; i < mappings.length; i++) {
    var mapping = mappings[i];
    var sourceHex = mapping.source;
    var targetHex = mapping.target;
    
    // Convert the hex colors to RGB colors
    var sourceRGB = hexToRGB(sourceHex);
    var targetRGB = hexToRGB(targetHex);
    
    // Iterate over each path/item in the document
    for (var j = 0; j < document.pageItems.length; j++) {
      var item = document.pageItems[j];
      
      // Check if the item has a fill color
      if (item.filled && item.fillColor.typename === "RGBColor") {
        var itemFillColor = item.fillColor;
        
        // Check if the item fill color matches the source color
        if (itemFillColor.red === sourceRGB.red && itemFillColor.green === sourceRGB.green && itemFillColor.blue === sourceRGB.blue) {
          // Replace the item fill color with the target color
          item.fillColor = targetRGB;
          replacedColors.push(sourceHex);
        }
      }
      
      // Check if the item has a stroke color
      if (item.stroked && item.strokeColor.typename === "RGBColor") {
        var itemStrokeColor = item.strokeColor;
        
        // Check if the item stroke color matches the source color
        if (itemStrokeColor.red === sourceRGB.red && itemStrokeColor.green === sourceRGB.green && itemStrokeColor.blue === sourceRGB.blue) {
          // Replace the item stroke color with the target color
          item.strokeColor = targetRGB;
          replacedColors.push(sourceHex);
        }
      }
    }
  }
  
  // Get the unique hex values that were not replaced
  var notReplacedColors = getNotReplacedColors(mappings, replacedColors);
  
  // Check if there are unreplaced colors
  if (notReplacedColors.length > 0) {
    // Display the hex values that were not replaced
    var message = "The following hex values were not replaced:\n\n";
    for (var k = 0; k < notReplacedColors.length; k++) {
      message += notReplacedColors[k] + "\n";
      unreplacedColors.push(notReplacedColors[k]);
    }
    
    // Alert the unreplaced colors
    alert(message);
  } else {
    // All colors were replaced successfully
    alert("All specified colors were replaced successfully.");
  }
  
  // Return the unreplaced colors
  return unreplacedColors;
}

// Function to convert a hex color to an RGB color object
function hexToRGB(hex) {
  var r = parseInt(hex.substr(1, 2), 16);
