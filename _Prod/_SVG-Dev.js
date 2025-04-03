var doc = app.activeDocument;; //Gets the active document
var fleName = doc.name.slice(0, 9) //Get the file code number not the full name;
var numArtboards = doc.artboards.length; //returns the number of artboards in the document
var filePath = (app.activeDocument.fullName.parent.fsName).toString().replace(/\\/g, '/');

$.writeln("fleName= ", fleName)
$.writeln("numArtboards= ", numArtboards)
$.writeln("filePath= ", filePath);

var options = new ExportOptionsPNG24();


for (var i = 0; i < numArtboards; i++) {
  doc.artboards.setActiveArtboardIndex(i);

  options.saveMultipleArtboards = true;
  options.cssProperties = SVGCSSPropertyLocation.STYLEATTRIBUTES;

  options.embedAllFonts = false; 
  options.embedRasterImages = true; 
  
  options.fontType = SVGFontType.OUTLINEFONT;
  options.fontSubsetting = SVGFontSubsetting.GLYPHSUSED; 
  
  //svgOptions.fontSubsetting = SVGFontSubsetting.None;
  options.documentEncoding = SVGDocumentEncoding.UTF8;
  options.coordinatePrecision = 2;

  options.minify = true; // tried this but doens't seem to work


  var artboardName = doc.artboards[i].name;
  $.writeln("artboardName= ", artboardName);
  var destFile = new File(filePath + "/" + artboardName + "@1x.png");
  $.writeln("destFile= ", destFile);
  doc.exportFile(destFile, ExportType.SVG, options);
}
