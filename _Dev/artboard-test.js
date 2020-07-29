function artBoardName_serial() {
    var doc = app.activeDocument;
    for (var i = 0, l = doc.artboards.length; i < l; i++) {
        if (doc.artboards[i].active) {}
        // THIS IS WHERE THE RENAMING HAPPENS
        doc.artboards[i].name = "a" + (i + 1);
    }
}

function renameArtBoard_MAIN() {
    if (app.documents.length == 0) {
        alert("No Open / Active Document Found");
    } else {
        artBoardName_serial();
    }
}

renameArtBoard_MAIN();