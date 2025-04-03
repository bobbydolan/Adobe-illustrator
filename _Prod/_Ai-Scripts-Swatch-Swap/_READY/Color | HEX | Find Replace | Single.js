#target illustrator

// Prompt the user to enter the source and target hex color values
var sourceHex = "#" + prompt("Enter the source hex color value:", "FFFFFF");
var targetHex = "#" + prompt("Enter the target hex color value:", "000000");

// Define the color mappings array with user input
var colorMappings = [
  { source: sourceHex, target: targetHex }
  // Add more color mappings as needed
];

// Get the active document
var doc = app.activeDocument;

// Call the function to replace the colors
replaceHexColors(doc, colorMappings);

// Function to replace specific hex colors in the document
function replaceHexColors(document, mappings) {
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
        }
      }
      
      // Check if the item has a stroke color
      if (item.stroked && item.strokeColor.typename === "RGBColor") {
        var itemStrokeColor = item.strokeColor;
        
        // Check if the item stroke color matches the source color
        if (itemStrokeColor.red === sourceRGB.red && itemStrokeColor.green === sourceRGB.green && itemStrokeColor.blue === sourceRGB.blue) {
          // Replace the item stroke color with the target color
          item.strokeColor = targetRGB;
        }
      }
    }
  }
  
  // // Display a completion message
  // alert("Color replacement completed.");
}

// Function to convert a hex color to an RGB color object
function hexToRGB(hex) {
  var r = parseInt(hex.substr(1, 2), 16);
  var g = parseInt(hex.substr(3, 2), 16);
  var b = parseInt(hex.substr(5, 2), 16);
  
  var rgb = new RGBColor();
  rgb.red = r;
  rgb.green = g;
  rgb.blue = b;
  
  return rgb;
}
