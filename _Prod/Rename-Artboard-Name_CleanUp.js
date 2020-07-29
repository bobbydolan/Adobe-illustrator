#target illustrator
var doc = app.activeDocument;
for (var i = 0; i < doc.artboards.length; i++) {
    var aBoard = doc.artboards[i].active; // makes artboard active
    var oldName = doc.artboards[i].name;
    doc.artboards[i].name = oldName.replace("_", "-"); // replace . with _

}

for (var i = 0; i < doc.artboards.length; i++) {
    var aBoard = doc.artboards[i].active; // makes artboard active
    var oldName = doc.artboards[i].name;
    doc.artboards[i].name = oldName.replace(" ", "-"); // replace . with _
}

for (var i = 0; i < doc.artboards.length; i++) {
    var aBoard = doc.artboards[i].active; // makes artboard active
    var oldName = doc.artboards[i].name;
    doc.artboards[i].name = oldName.replace("--", "-"); // replace . with _
}


for (var i = 0; i < doc.artboards.length; i++) {
    var aBoard = doc.artboards[i].active; // makes artboard active
    var oldName = doc.artboards[i].name;
    doc.artboards[i].name = oldName.replace(".", "-"); // replace . with _
}
for (var i = 0; i < doc.artboards.length; i++) {
    var aBoard = doc.artboards[i].active; // makes artboard active
    var oldName = doc.artboards[i].name;
    doc.artboards[i].name = oldName.replace("  ", "-"); // replace . with _
}
for (var i = 0; i < doc.artboards.length; i++) {
    var aBoard = doc.artboards[i].active; // makes artboard active
    var oldName = doc.artboards[i].name;
    doc.artboards[i].name = oldName.replace("IOS", "iOS"); // replace . with _
}
for (var i = 0; i < doc.artboards.length; i++) {
    var aBoard = doc.artboards[i].active; // makes artboard active
    var oldName = doc.artboards[i].name;
    doc.artboards[i].name = oldName.replace("www", "WWW"); // replace . with _
}
for (var i = 0; i < doc.artboards.length; i++) {
    var aBoard = doc.artboards[i].active; // makes artboard active
    var oldName = doc.artboards[i].name;
    doc.artboards[i].name = oldName.replace("Android", "Android"); // replace . with _
}
for (var i = 0; i < doc.artboards.length; i++) {
    var aBoard = doc.artboards[i].active; // makes artboard active
    var oldName = doc.artboards[i].name;
    doc.artboards[i].name = oldName.replace("dm", "DM"); // replace . with _
}
for (var i = 0; i < doc.artboards.length; i++) {
    var aBoard = doc.artboards[i].active; // makes artboard active
    var oldName = doc.artboards[i].name;
    doc.artboards[i].name = oldName.replace("lm", "LM"); // replace . with _
}