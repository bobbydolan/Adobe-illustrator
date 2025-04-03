

// Break
function exportFileToSVG(dest) {
    if (app.documents.length > 0) {
  
        var options = new ExportOptionsSVG();
        var type = ExportType.SVG;
        var fileSpec = new File(dest);
  
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
  
        app.activeDocument.exportFile(fileSpec, type, options);
    }
  }
  
  
  function run()
  {
    var doc = app.activeDocument;
  
    // Dialog Window Below
    // var sourceFolder = Folder.selectDialog('Select the folder to export artboards to', doc.path);
  
    // Save directly to parent 
    var filePath = (app.activeDocument.fullName.parent.fsName).toString().replace(/\\/g, '/');
    var sourceFolder = filePath;
    // var name = sourceFolder + '/' + doc.name.split('.')[0];
    var name = sourceFolder + '/' + "SVG@1x";
  
    // export main score
    for( var i = 0; i < doc.layers.length; i++)
    {
        doc.layers[i].visible = true;
    }
  
    exportFileToSVG(name);
  
    alert(name);
  
  
  }
  
  run();
  