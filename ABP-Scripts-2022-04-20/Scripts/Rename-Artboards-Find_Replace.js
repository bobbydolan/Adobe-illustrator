#target illustrator
var doc = app.activeDocument;

jsfind = prompt("Find: ", "");
jsreplace = prompt("Replace: ", "");

for (var i = 0; i < doc.artboards.length; i++) {
    var aBoard = doc.artboards[i].active;
    var oldName = doc.artboards[i].name;
    doc.artboards[i].name = oldName.replace(jsfind, jsreplace);
}