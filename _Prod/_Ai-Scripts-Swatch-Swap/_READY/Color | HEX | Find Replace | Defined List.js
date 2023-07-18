#target illustrator

// Define the source and target hex color mappings
var colorMappings = [
  // { source: "#DDCDE5", target: "#CE0938" },  // Replace with your color mappings
  // { source: "#80D0C7", target: "#000000" },
  // { source: "#FFD8BC", target: "#39AE4A" },
  // { source: "#CFD7DD", target: "#39AE4A" },
  { source: "#F1F4F7", target: "#DEE3E9" },
  { source: "#67788A", target: "#344854" },
  { source: "#CBD2D9", target: "#67788A" },
  { source: "#CCD4DA", target: "#67788A" },
  { source: "#C3DCF5", target: "#0A78BE" },
  { source: "#82B9E6", target: "#004B87" },
  { source: "#FBD6B7", target: "#F58C28" },
  { source: "#FAB473", target: "#F06919" },
  { source: "#BEE1DC", target: "#3CAAAA" },
  { source: "#83C8C0", target: "#007A80" },
  { source: "#D7C8E1", target: "#B99BC3" },
  { source: "#B99BC3", target: "#9B69AA" },
  // Add more color mappings as needed
  // { source: "#00FF00", target: "#0000FF" }
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


// Turn off the alert below to not show
alert("Swatches have been swapped to DM");