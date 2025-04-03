#target illustrator

// Get the active document
var doc = app.activeDocument;

// Call the function to clear unused swatches
clearUnusedSwatches(doc);

// Function to clear unused swatches
function clearUnusedSwatches(document) {
  var swatches = document.swatches;
  
  // Create an array to store the swatches to be removed
  var swatchesToRemove = [];
  
  // Iterate over each swatch in the document
  for (var i = swatches.length - 1; i >= 0; i--) {
    var swatch = swatches[i];
    
    // Check if the swatch is used in the document
    if (!isSwatchUsed(swatch, document)) {
      swatchesToRemove.push(swatch);
    }
  }
  
  // Remove the unused swatches
  for (var j = 0; j < swatchesToRemove.length; j++) {
    var unusedSwatch = swatchesToRemove[j];
    unusedSwatch.remove();
  }
  
  // Display a completion message
  alert("Unused swatches cleared.");
}

// Function to check if a swatch is used in the document
function isSwatchUsed(swatch, document) {
  var swatchName = swatch.name;
  
  // Check if the swatch is used in the document's fills or strokes
  for (var k = 0; k < document.pageItems.length; k++) {
    var item = document.pageItems[k];
    if (item.fillColor && item.fillColor.typename === "SpotColor" && item.fillColor.spot.name === swatchName) {
      return true;
    }
    if (item.strokeColor && item.strokeColor.typename === "SpotColor" && item.strokeColor.spot.name === swatchName) {
      return true;
    }
  }
  
  // Check if the swatch is used in the document's gradients
  for (var l = 0; l < document.gradients.length; l++) {
    var gradient = document.gradients[l];
    if (gradient.gradientStops.length > 0 && gradient.gradientStops[0].color.typename === "SpotColor" && gradient.gradientStops[0].color.spot.name === swatchName) {
      return true;
    }
  }
  
  return false;
}
