#target illustrator
function LM(){
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
    newBoard.artboardRect = [
        lastRect[2] + offsetH,
        lastRect[1],
        lastRect[2] + offsetH + (thisRect[2] - thisRect[0]),
        lastRect[3]
    ];
    newBoard.name = thisBoard.name + "-iOS";
    app.executeMenuCommand("pasteFront");
    doc.selection = null;
};
LM();

function DM(){
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
    newBoard.artboardRect = [
        lastRect[2] + offsetH,
        lastRect[1],
        lastRect[2] + offsetH + (thisRect[2] - thisRect[0]),
        lastRect[3]
    ];
    newBoard.name = thisBoard.name + "-Android";
    app.executeMenuCommand("pasteFront");
    doc.selection = null;
};
DM();

function WWW(){
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
    newBoard.artboardRect = [
        lastRect[2] + offsetH,
        lastRect[1],
        lastRect[2] + offsetH + (thisRect[2] - thisRect[0]),
        lastRect[3]
    ];
    newBoard.name = thisBoard.name + "-WWW";
    app.executeMenuCommand("pasteFront");
    doc.selection = null;
};
WWW();


var doc = app.activeDocument;
for (var i = 0; i < doc.artboards.length; i++) {
    var aBoard = doc.artboards[i].active; // makes artboard active
    var oldName = doc.artboards[i].name;
    doc.artboards[i].name = oldName.replace("-iOS-Android", "-Android"); // replace . with _

}


var doc = app.activeDocument;
for (var i = 0; i < doc.artboards.length; i++) {
    var aBoard = doc.artboards[i].active; // makes artboard active
    var oldName = doc.artboards[i].name;
    doc.artboards[i].name = oldName.replace("-Android-WWW", "-WWW"); // replace . with _

}