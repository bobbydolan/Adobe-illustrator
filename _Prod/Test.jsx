var folder = Folder.selectDialog();
if (folder) {
    var files = folder.getFiles("*.ai");
    for (var i = 0; i < files.length; i++) {
        var currentFile = files[i];
        app.open(currentFile);
        var activeDocument = app.activeDocument;
        var jpegFolder = Folder(currentFile.path + "/PNG");
        if (!jpegFolder.exists)
            jpegFolder.create();
        for (var j = 0; j < activeDocument.artboards.length; j++) {
            var activeArtboard = activeDocument.artboards[0];
            activeDocument.artboards.setActiveArtboardIndex(j);
            var fileName = activeDocument.name.split('.')[0] + "Artboard" + (j + 1) + ".PNG";
            var destinationFile = File(jpegFolder + "/" + fileName);
            var type = ExportType.PNG;
            var options = new ExportOptionsPNG();
            options.antiAliasing = true;
            options.artBoardClipping = true;
            options.optimization = true;
            options.qualitySetting = 100; // Set Quality Setting
            activeDocument.exportFile(destinationFile, type, options);
        }
        activeDocument.close(SaveOptions.DONOTSAVECHANGES);
        currentFile = null;
    }
} 