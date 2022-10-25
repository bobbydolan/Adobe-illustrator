#target Illustrator
var myDoc=app.activeDocument;
var layerCount=myDoc.layers.length;
for (var ii = layerCount - 1; ii >= 0; ii--) {
    var currentLayer = myDoc.layers[ii];
    currentLayer.locked = false;
    var subCount = currentLayer.layers.length;
    for (var ss =subCount -1; ss >= 0; ss--){
        var subLayer = currentLayer.layers[ss];
        subLayer.locked = false;
        if (subLayer.visible == false){
            subLayer.visible = true;
            subLayer.remove();
            }
        }
    if (currentLayer.visible == false){
        currentLayer.visible = true;
        currentLayer.remove();
        }
    }