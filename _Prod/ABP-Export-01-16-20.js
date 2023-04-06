#target illustrator
// // app.executeMenuCommand("selectall");
// var sel = app.selection[0];
// var k = 16/24*100;
// sel.resize(k,k);


// // Artboard fit to Art
// app.activeDocument.fitArtboardToSelectedArt(0);


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
    thisBoard.name = "####-16"
    newBoard.artboardRect = [
        lastRect[2] + offsetH,
        lastRect[1],
        lastRect[2] + offsetH + (thisRect[2] - thisRect[0]),
        lastRect[3]
    ];
    newBoard.name = thisBoard.name + "20";
    app.executeMenuCommand("pasteFront");
    doc.selection = null;
};
ArtboardDupe();


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// Artboard Rename
var doc = app.activeDocument;
for (var i = 0; i < doc.artboards.length; i++) {
    var aBoard = doc.artboards[i].active; // makes artboard active
    var oldName = doc.artboards[i].name;
    doc.artboards[i].name = oldName.replace("1620", "20"); // replace . with _

}


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// Get Arboard By Name
var docRef = app.activeDocument;
var ABName = "####-20";

function setActiveArtboardBy(name) {
    var artboard = docRef.artboards.getByName(name);
    for (i = 0; i < docRef.artboards.length; i++) {
        if (docRef.artboards[i] == artboard) {
            docRef.artboards.setActiveArtboardIndex(i);
            break;
        }
    }
}
setActiveArtboardBy(ABName);


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// Select Active Artboard Contents
doc.selectObjectsOnActiveArtboard();    