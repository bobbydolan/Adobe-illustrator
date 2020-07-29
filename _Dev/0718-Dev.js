var targetDoc = app.activeDocument;

var Name = targetDoc.artboards[0].name;

var folder = new Folder("~/Desktop/" + Name);

function main()

{

    if (!folder.exists) folder.create();

    targetDoc.save();

    SaveArtboard1();

    SaveArtboard2();

}

function SaveArtboard1()

{

    app.activeDocument.artboards.setActiveArtboardIndex(0);

    var jpgName = targetDoc.artboards[0].name + ".jpeg";

    exportFileToJPEG(folder + "/" + jpgName, 72);

}

function SaveArtboard2()

{

    app.activeDocument.artboards.setActiveArtboardIndex(1);

    var jpgName = targetDoc.artboards[1].name + ".jpeg";

    var epsName = targetDoc.artboards[1].name + ".eps";

    exportFileToJPEG(folder + "/" + jpgName, 72);

    exportFileAsEPS(folder + "/" + epsName);

}

function exportFileToJPEG(dest, resolution)

{

    var exportOptions = new ExportOptionsJPEG();

    var type = ExportType.JPEG;

    var fileSpec = new File(dest);

    exportOptions.antiAliasing = true;

    exportOptions.artBoardClipping = true;

    exportOptions.horizontalScale = resolution * 100 / 72;

    exportOptions.verticalScale = resolution * 100 / 72;

    exportOptions.qualitySetting = 100;

    app.activeDocument.exportFile(fileSpec, type, exportOptions);

}

function exportFileAsEPS(destFile)

{

    var newFile = new File(destFile);

    var saveOpts = new EPSSaveOptions();

    saveOpts.cmykPostScript = true;

    saveOpts.embedAllFonts = true;

    saveOpts.saveMultipleArtboards = false;

    saveOpts.artboardRange = "1";

    targetDoc.saveAs(newFile, saveOpts);

}

main();