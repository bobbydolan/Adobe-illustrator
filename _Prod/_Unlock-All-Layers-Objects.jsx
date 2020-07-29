#target Illustrator

// Unlock all layers (and their sublayers)  
processLayersRecursive(app.activeDocument.layers);

// Process all layers under variable "parent" (including sublayers on all levels).  
function processLayersRecursive(parent) {
    for (var iLayer = 0; iLayer < parent.length; iLayer++) {
        var curLayer = parent[iLayer];
        // Unlock the current layer  
        if (curLayer.locked) {
            curLayer.locked = false;
        }
        processLayersRecursive(curLayer.layers);
    }
}

// Unlock all objects,

app.executeMenuCommand('unlockAll');