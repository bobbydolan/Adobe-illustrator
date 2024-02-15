// Function to move the selected layer to the layer below
function moveToLayerBelow() {
    var comp = app.project.activeItem;
    if (comp && comp instanceof CompItem) {
        var selectedLayers = comp.selectedLayers;
        if (selectedLayers.length === 1) {
            var currentLayer = selectedLayers[0];
            var currentIndex = currentLayer.index;

            if (currentIndex < comp.numLayers) {
                var layerBelow = comp.layer(currentIndex + 1);
                currentLayer.moveAfter(layerBelow);
            } else {
                alert("The selected layer is already at the bottom.");
            }
        } else {
            alert("Please select one layer to move.");
        }
    } else {
        alert("Please select a composition.");
    }
}

// Run the moveToLayerBelow function
moveToLayerBelow();
