// Unlock all layers (and their sublayers)  
// processLayersRecursive(app.activeDocument.layers);  

// // Process all layers under variable "parent" (including sublayers on all levels).  
// function processLayersRecursive(parent){   
//     for (var iLayer = 0; iLayer < parent.length; iLayer++){  
//         var curLayer = parent[iLayer];  
//         // Unlock the current layer  
//         if (curLayer.locked){  
//             curLayer.locked = false;  
//         }  
//         processLayersRecursive(curLayer.layers);       
//     }  
// }  



// // V1
// unlockAllLayers(app.activeDocument.layers);

// unlockAllLayers = function(parent) {
//   var i, layer, len, results;
//   results = [];
//   for (i = 0, len = parent.length; i < len; i++) {
//     layer = parent[i];
//     layer.locked = false;
//     layer.visible = true;
//     results.push(unlockAllLayers(layer.layers));
//   }
//   return results;
// };


// V2
// myDoc = app.activeDocument;

// myLayers = myDoc.layers;

// for (a = 0;{}

//   myLayer = myLayers[a];

//   myLayer.locked = false;

// }

// V3
app.activeDocument.activeLayer.locked ^= 1;
