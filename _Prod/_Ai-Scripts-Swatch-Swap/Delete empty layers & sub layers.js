#target illustrator

// Get the active document
var doc = app.activeDocument;

// Call the function to delete empty layers and sublayers
deleteEmptyLayers(doc);

// Function to delete empty layers and sublayers in the document
function deleteEmptyLayers(document) {
  // Iterate over each layer in the document
  for (var i = document.layers.length - 1; i >= 0; i--) {
    var layer = document.layers[i];
    
    // Check if the layer is empty (contains no page items or sublayers)
    if (layer.pageItems.length === 0 && layer.layers.length === 0) {
      // Delete the empty layer
      layer.remove();
    }
    else {
      // Check if the layer has sublayers
      if (layer.layers.length > 0) {
        // Call the function recursively to delete empty sublayers
        deleteEmptySublayers(layer);
      }
    }
  }
  
  // Display a completion message
  alert("Empty layers and sublayers deleted.");
}

// Function to delete empty sublayers in a layer
function deleteEmptySublayers(layer) {
  // Iterate over each sublayer in the layer
  for (var i = layer.layers.length - 1; i >= 0; i--) {
    var sublayer = layer.layers[i];
    
    // Check if the sublayer is empty (contains no page items or sublayers)
    if (sublayer.pageItems.length === 0 && sublayer.layers.length === 0) {
      // Delete the empty sublayer
      sublayer.remove();
    }
    else {
      // Check if the sublayer has sublayers
      if (sublayer.layers.length > 0) {
        // Call the function recursively to delete empty sublayers
        deleteEmptySublayers(sublayer);
      }
    }
  }
}
