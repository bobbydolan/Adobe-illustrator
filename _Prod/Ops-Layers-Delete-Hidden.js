// for (i = app.activeDocument.layers.length; i > 0; i--) {
//     if (!app.activeDocument.layers[i - 1].visible)
//         app.activeDocument.layers[i - 1].remove();
// }


// myLength = app.activeDocument.layers.length;
// for (i = 0; i < myLength; i++) {
//     if (!app.activeDocument.layers.visible)app.activeDocument.layers.remove();
// }


// var layer = app.activeDocument.layers.getByName('Text');
// var pageItems = layer.pageItems;
// for (var i = pageItems.length - 1; i >= 0; i--) {
//   if (pageItems[i].hidden)
//     pageItems[i].remove();
// }

// #target illustrator
// var myDoc=app.activeDocument;
// var layerCount=myDoc.layers.length;
// for (var ii = layerCount - 1; ii >= 0; ii--) {
//     var currentLayer = myDoc.layers[ii];
//     currentLayer.locked = false;
//     if (currentLayer.visible == false){
//         currentLayer.visible = true;
//         currentLayer.remove();
//         }
//     }



function recurseLayers(currLayers) {
    var length = currLayers.length;
    var currentLayer = null;
    var searchtext = searchText;
    var replacetext = replaceText;

    try {
        for (var i = length; i--;) {
            currentLayer = currLayers[i];
            replaceName(currentLayer, searchText, replaceText);

            if (currentLayer.layers) {
                recurseLayers(currentLayer.layers);
            }
        }
    } catch (e) {
        logger(e);
    }
}

function replaceName(currLayer, searchText, replaceText) {
    try {
        var visible = currLayer.visible;
        var locked = currLayer.locked;
        var typeName = currLayer.typename;
        if (checkLayerVisibility(currLayer) && !checkLayerLocked(currLayer)) {
            currLayer.name = currLayer.name.replace(searchText, replaceText);
        }
    } catch (e) {
        logger(e);
    }
}

function checkLayerLocked(layer) {
    if (!layer.locked)
        for (var parent = layer.parent; parent.typename == 'Layer'; parent = parent.parent) {
            if (parent.locked)
                return true;
        }
    return layer.locked;
}

function checkLayerVisibility(layer) {
    if (layer.visible)
        for (var parent = layer.parent; parent.typename == 'Layer'; parent = parent.parent) {
            if (!parent.visible)
                return false;
        }
    return layer.visible;
}

