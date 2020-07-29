#target Illustrator

if (app.documents.length > 0) {
    while (app.activeDocument.placedItems.length > 0) {
        placedArt = app.activeDocument.placedItems[0];
        placedArt.embed();
    }
}