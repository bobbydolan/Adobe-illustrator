#target illustrator

function addArtboard() {
    // var thisBoardIndex = doc.artboards.getActiveArtboardIndex();

    var newBoard = app.documents.add(null, 50, 50);
    newBoard = app.activeDocument;
    var artboards = newBoard.artboards;
    artboards.add([0, 0, 1000, 1000]);
    newBoard.name = "iOS"
}

addArtboard();
var docRef = app.activeDocument;
var aBoard = docRef.artboards;

function addArtboard() {
    // var thisBoardIndex = doc.artboards.getActiveArtboardIndex();


    // aBoard.add(null, 50, 50);
    aBoard.add([0, 0, 1000, 1000]);
}

addArtboard();



// var doc = app.activeDocument;
var thisBoardIndex = doc.artboards.getActiveArtboardIndex();
var thisBoard = doc.artboards[thisBoardIndex];
var thisRect = thisBoard.artboardRect;

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