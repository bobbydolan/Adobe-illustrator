var idoc = app.activeDocument;
var activeAbIndex = idoc.artboards.getActiveArtboardIndex();

idoc.selectObjectsOnActiveArtboard();
app.cut();

idoc.artboards.remove (activeAbIndex);