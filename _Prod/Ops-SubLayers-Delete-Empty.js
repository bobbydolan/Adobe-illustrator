function RemoveEmptySublayers() {


    function getNestLevel(layer) {


        var nestLevelCounter = 0;


        function getParent(layer) {


            if (layer.parent.typename == "Document") {


                return false;


            }


            nestLevelCounter++;


            return getParent(layer.parent);


        };


        getParent(layer);


        return nestLevelCounter;


    };


    function getLayersRecursive(subjectLayer) {


        var thisLayer;


        for (var i = 0; i < subjectLayer.layers.length; i++) {


            thisLayer = subjectLayer.layers;


            allLayers.push({
                nestLevel: getNestLevel(thisLayer),
                layer: thisLayer
            });


            getLayersRecursive(thisLayer);


        }


    };


    function isSublayerDevoidOfNestedArt(layer) {


        // can only work backwards through a collection of layers sorted by their nested level.


        if (layer.parent.typename == "Document") {


            return false;


        }


        if (layer.pageItems.length > 0) {


            return false;


        }


        if (layer.pageItems.length == 0 && layer.layers.length == 0) {


            return true;


        }


        return false;


    };




    if (app.documents.length == 0) {


        return;


    }


    var doc = app.activeDocument;


    var allLayers = [],
        nestLevel = 0;


    getLayersRecursive(doc);


    allLayers.sort(function (a, b) {
        return a.nestLevel > b.nestLevel
    });


    var currentSublayer;


    for (var i = allLayers.length - 1; i > 0; i--) {


        //alert(allLayers.layer.name + " " + allLayers.nestLevel);


        currentSublayer = allLayers.layer;


        if (isSublayerDevoidOfNestedArt(currentSublayer)) {


            currentSublayer.remove();


        }


    };


};


RemoveEmptySublayers();