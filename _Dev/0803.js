#target illustrator

// script.name = timLCdupArtboards.jsx; 

// script.description = duplicates provided artboards to another open document;

// script.required = requires CS5, and both source and destination documenets (with the same layer structure) open

// script.parent = CarlosCanto // 02/07/12;  

// script.elegant = false;

// Notes: use only in documents with NO sublayers, 

var docList = doclist(); // get a list of open docs

var source = prompt ("Enter Source Document (Index Number)\r\r" + docList, 0, "Copy Artboards"); // get source doc name index

if (source!=null) {// quit if pressed Cancel

    var dest = prompt ("Enter Destination Document (Index Number)\r\r" + docList, 1, "Copy Artboards"); // get destination doc name index

    if (dest!=null) {// quit if pressed Cancel

        var absstring = prompt ("Enter Indexes of Artboards to copy (comma separated)", "25,37,16,19,34,35,36", "Copy Artboards"); // get list of artboards to copy

        if (absstring!=null) {// quit if pressed Cancel

            var artbs = absstring.split (","); // turn list into an array

            var absCount = artbs.length; // get artboards count

            var sourceDoc = app.documents[source]; // get actual docs

            var destDoc = app.documents[dest];

            // get layer visible/lock info & unlock and make visible all layers

            var sourceDocLayerState = unlockUnhideLayers(sourceDoc);

            var destDocLayerState = unlockUnhideLayers(destDoc);

            sourceDoc.activate(); // activate source otherwise it is not able to access selection

            var ABs = []; // array to hold of artboard objects to copy

            var ABsRect = []; // array to hold artboards Rectangles

            var ABsNames = []; // array to hold artboard names

            var ABsInfo = []; // array to hold [Rect, Names]

            for (i=0; i<absCount; i++) {

                ABs = sourceDoc.artboards[artbs-1]; // get actual artboard

                ABsRect = ABs.artboardRect; // get Rectangle

                ABsNames = ABs.name; // get Name

                ABsInfo = [ABsRect, ABsNames]; // get Rectangle and Name

                sourceDoc.selection = null; // deselect everything

                sourceDoc.artboards.setActiveArtboardIndex (artbs-1); // activate each artboard

                sourceDoc.selectObjectsOnActiveArtboard(); // select all in artboard

                sel = sourceDoc.selection; // get selection

                moveObjects(sel, destDoc); // move selection

            }

            addArtboards(destDoc, ABsInfo); // recreate artboards in destination document

            // restore layer original state

            lockHideLayers(sourceDoc, sourceDocLayerState);

            lockHideLayers(destDoc, destDocLayerState);

        }

    }

}

function unlockUnhideLayers(doc) {

          // get visible state of each layer, and show/unlock layers

          var layerState = []; // array to hold layer visibility

          var layerCount = doc.layers.length; // layer count

          // get layer visibility, and turn all layers on

          for (i=0; i<layerCount; i++) {

                    var ilayer = doc.layers;

                    layerState = [ilayer.visible, ilayer.locked];

                    ilayer.visible = true;

        ilayer.locked = false;

          }

    return layerState;

}

function lockHideLayers(doc, layerstate) {

          // restore layer visibility

    var layerCount = doc.layers.length; // layer count

          for (k=0; k<layerCount; k++) {

                    var ilayer = doc.layers;

        ilayer.visible = layerstate[0]; // already a Boolean value, no need to convert

        ilayer.locked = layerstate[1]; // already a Boolean value, no need to convert

          }

}

// create artboards in destination doc, using the info in absInfo (abRect, Name)

function addArtboards(doc, absInfo) {

    var destDoc = doc;

    var absCount = absInfo.length;

    destDoc.activate();

    for (j=0; j<absCount; j++) {

        var newAB = destDoc.artboards.add(ABsInfo[0]);

        newAB.name = ABsInfo[1];

    }

}

// move selected objects (sel) to destination document

function moveObjects(sel, destDoc) {

    for (k=0; k<sel.length; k++) { 

        // duplicate items to the same layer in dest document, give both documents have the same layer structure

        var newItem = sel.duplicate(destDoc.layers[sel.layer.name],ElementPlacement.PLACEATEND);

    }

}

// get a list of open documents, separated by tabs

function doclist() {

    var docs = app.documents;

        msg = "";

    for (i=0; i<docs.length; i++) {

        msg += i + ". " + docs.name + "\t"; // had to use tab (insted of \r) to have the list "inline". Prompt only allows 4 rows in windows

    }

    return msg;

}