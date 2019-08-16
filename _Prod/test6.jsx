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