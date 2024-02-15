#target illustrator
// Artboard Duplicate
function ArtboardDupe() {
    var doc = app.activeDocument;
    var thisBoardIndex = doc.artboards.getActiveArtboardIndex();
    var thisBoard = doc.artboards[thisBoardIndex];
    var thisRect = thisBoard.artboardRect;
    var lastBoard = doc.artboards[doc.artboards.length - 1];
    var lastRect = lastBoard.artboardRect;
    doc.selectObjectsOnActiveArtboard();
    app.copy();
    var newBoard = doc.artboards.add(thisRect);
    var offsetH = 100;
    // Set name here
    thisBoard.name = "####-48"
    newBoard.artboardRect = [
        lastRect[2] + offsetH,
        lastRect[1],
        lastRect[2] + offsetH + (thisRect[2] - thisRect[0]),
        lastRect[3]
    ];
    newBoard.name = "####-60";
    app.executeMenuCommand("pasteFront");
    doc.selection = null;
};
ArtboardDupe();


var doc = app.activeDocument;
// Select Active Artboard Contents
doc.selectObjectsOnActiveArtboard();
