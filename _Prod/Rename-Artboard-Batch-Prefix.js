var doc = app.activeDocument;

newName = prompt("Add Prefix: ", "");
// jsreplace = prompt("Replace: ", "");

for (var i = 0; i < doc.artboards.length; i++) {
    var aBoard = doc.artboards[i].active;
    var oldName = doc.artboards[i].name;
    doc.artboards[i].name = newName+"-"+oldName;
}