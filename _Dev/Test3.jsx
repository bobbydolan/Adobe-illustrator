var doc = app.activeDocument;
var symbolCount = doc.symbols.length;

$.writeln(symbolCount + " symbols"); // log symbol count

for (var i = 0; i < doc.symbols.length; i++) {
  $.writeln(doc.symbols[i].name); // log symbol names

  var dir = doc.path; // save to document's folder
  dir.changePath(doc.symbols[i].name + '.png');
  savePNG(dir);
}

// Save PNG file

function savePNG(file) {
  // export SAVE-FOR-WEB options
  var exp = new ExportOptionsPNG24();
  exp.transparency = true;

  // export as SAVE-FOR-WEB
  doc.exportFile(file, ExportType.PNG24, exp);
}
