var folder = Folder.selectDialog();
if (folder) {
    var files = folder.getFiles("*.ai");
    for (var i = 0; i < files.length; i++) {
        var currentFile = files[i];
        app.open(currentFile);
        var activeDocument = app.activeDocument;
        var pngFolder = Folder(currentFile.path + "/PNG");
        if (!pngFolder.exists)
            pngFolder.create();
        var fileName = activeDocument.name.split('.')[0] + ".png";
        var destinationFile = File(pngFolder + "/" + fileName);
        // Export Artboard where you can set resolution for an image. Set to 600 by default in code.
        var opts = new ImageCaptureOptions();
        opts.resolution = 600;
        opts.antiAliasing = true;
        opts.transparency = true;
        artBoardClipping = true;
        try {
            activeDocument.imageCapture(new File(destinationFile), activeDocument.geometricBounds, opts);
        } catch (e) {

        }

        activeDocument.close(SaveOptions.DONOTSAVECHANGES);
        currentFile = null;
    }
}



try 
{   
    if(app.documents.length > 0) 
    {
        for(var i = app.documents.length - 1; i >= 0; i--)
        {
            var file_name               = app.documents[i].name.toString().replace(".ai", "");
            var destination             = app.documents[i].path + "/" + file_name;
            var new_path                = new File(destination);
            var options                 = new ExportOptionsSVG();
            options.coordinatePrecision = 7;
            options.embedRasterImages   = true

            app.documents[i].exportFile(new_path, ExportType.SVG, options);
            // Pass SaveOptions to suppress 'Save Changes' alert that pops up when closing a document.
            app.documents[i].close(SaveOptions.DONOTSAVECHANGES);
        }
    }
}
catch(e) 
{
    alert( e.message, "Script Alert", true);
}