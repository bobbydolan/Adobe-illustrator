/*
<javascriptresource>
<name>[Layer] Toggle On/Off</name>
<enableinfo>true</enableinfo>
<category>Utilities</category>
</javascriptresource>
*/

// Function to toggle layer visibility
function toggleLayerVisibility(layer) {
    if (layer instanceof AVLayer) {
        if (layer.enabled) {
            layer.enabled = false; // Hide the layer if it's enabled
        } else {
            layer.enabled = true; // Show the layer if it's hidden
        }
    } else {
        alert("Selected item is not a layer.");
    }
}

// Main code
var selectedLayers = app.project.activeItem.selectedLayers;

if (selectedLayers.length > 0) {
    for (var i = 0; i < selectedLayers.length; i++) {
        var currentLayer = selectedLayers[i];
        toggleLayerVisibility(currentLayer);
    }
} else {
    alert("Please select at least one layer.");
}
