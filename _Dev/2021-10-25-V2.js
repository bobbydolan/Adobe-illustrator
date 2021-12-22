#target Illustrator
var doc = app.activeDocument;; //Gets the active document
var fleName = doc.name.slice(0, 9) //Get the file code number not the full name;
var numArtboards = doc.artboards.length; //returns the number of artboards in the document
var filePath = (app.activeDocument.fullName.parent.fsName).toString().replace(/\\/g, '/');

$.writeln("fleName= ", fleName)
$.writeln("numArtboards= ", numArtboards)
$.writeln("filePath= ", filePath);

var options = new ExportOptionsPNG24();


// @1x Export
for (var i = 0; i < numArtboards; i++) {
    doc.artboards.setActiveArtboardIndex(i);

    options.artBoardClipping = true;
    options.matte = false;
    options.horizontalScale = 100;
    options.verticalScale = 100;
    options.transparency = true;

    var artboardName = doc.artboards[i].name;
    $.writeln("artboardName= ", artboardName);
    var destFile = new File(filePath + "/" + fleName + " " + artboardName + "@1x.png");
    $.writeln("destFile= ", destFile);
    doc.exportFile(destFile, ExportType.PNG24, options);
}


// @2x Export
for (var i = 0; i < numArtboards; i++) {
    doc.artboards.setActiveArtboardIndex(i);

    options.artBoardClipping = true;
    options.matte = false;
    options.horizontalScale = 200;
    options.verticalScale = 200;
    options.transparency = true;

    var artboardName = doc.artboards[i].name;
    $.writeln("artboardName= ", artboardName);
    var destFile = new File(filePath + "/" + fleName + " " + artboardName + "@2x.png");
    $.writeln("destFile= ", destFile);
    doc.exportFile(destFile, ExportType.PNG24, options);
}

// @3x Export
for (var i = 0; i < numArtboards; i++) {
    doc.artboards.setActiveArtboardIndex(i);

    options.artBoardClipping = true;
    options.matte = false;
    options.horizontalScale = 300;
    options.verticalScale = 300;
    options.transparency = true;

    var artboardName = doc.artboards[i].name;
    $.writeln("artboardName= ", artboardName);
    var destFile = new File(filePath + "/" + fleName + " " + artboardName + "@3x.png");
    $.writeln("destFile= ", destFile);
    doc.exportFile(destFile, ExportType.PNG24, options);
}

// @4x Export
for (var i = 0; i < numArtboards; i++) {
    doc.artboards.setActiveArtboardIndex(i);

    options.artBoardClipping = true;
    options.matte = false;
    options.horizontalScale = 400;
    options.verticalScale = 400;
    options.transparency = true;

    var artboardName = doc.artboards[i].name;
    $.writeln("artboardName= ", artboardName);
    var destFile = new File(filePath + "/" + fleName + " " + artboardName + "@4x.png");
    $.writeln("destFile= ", destFile);
    doc.exportFile(destFile, ExportType.PNG24, options);
}