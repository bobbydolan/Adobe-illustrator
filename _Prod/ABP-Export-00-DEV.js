#target illustrator
function ArtboardDupe(){
    var doc = app.activeDocument;
    var thisBoardIndex = doc.artboards.getActiveArtboardIndex();
    var thisBoard = doc.artboards[thisBoardIndex];
    var thisRect = thisBoard.artboardRect;
    var lastBoard = doc.artboards[doc.artboards.length - 1];
    var lastRect = lastBoard.artboardRect;
    doc.selectObjectsOnActiveArtboard();
    // app.copy();
    // var newBoard = doc.artboards.add(thisRect);
    // var offsetH = 100;
    thisBoard.name = "####" 
    // newBoard.artboardRect = [
    //     lastRect[2] + offsetH,
    //     lastRect[1],
    //     lastRect[2] + offsetH + (thisRect[2] - thisRect[0]),
    //     lastRect[3]
    // ];
    // newBoard.name = thisBoard.name + "40";
    // app.executeMenuCommand("pasteFront");
    // doc.selection = null;
};
ArtboardDupe();

// var doc = app.activeDocument;
// for (var i = 0; i < doc.artboards.length; i++) {
//     var aBoard = doc.artboards[i].active; // makes artboard active
//     var oldName = doc.artboards[i].name;
//     doc.artboards[i].name = oldName.replace("8040", "40"); // replace . with _

// }



var docRef = app.activeDocument;
var ABName = "####";
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

doc.selectObjectsOnActiveArtboard();


