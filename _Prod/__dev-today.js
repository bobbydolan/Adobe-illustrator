#target illustrator

// Get the active document
var doc = app.activeDocument;

// Define the export scales
var scales = [1, 1.5, 2, 3, 4];

// Define the export options
var exportOptions = new ExportOptionsPNG24();
exportOptions.antiAliasing = true;
exportOptions.transparency = true;

// Get the parent folder to save the exported images
var parentFolder = Folder(doc.path);
var exportFolderName = "__" + doc.name.split(".")[0] + "-exports";
var exportFolder = new Folder(parentFolder + "/" + exportFolderName);
exportFolder.create();

// Loop through each artboard and export PNG images at different scales
for (var i = 0; i < doc.artboards.length; i++) {
  var artboard = doc.artboards[i];
  doc.artboards.setActiveArtboardIndex(i);

  for (var j = 0; j < scales.length; j++) {
    var scale = scales[j];
    var exportPath = exportFolder.fsName + "/" + artboard.name + "@" + scale + "x.png";

    // Set the export options scale
    exportOptions.horizontalScale = scale * 100;
    exportOptions.verticalScale = scale * 100;

    // Create a new temporary document to export the artboard
    var tempDoc = app.documents.add(DocumentColorSpace.RGB);
    tempDoc.artboards.add(artboard.artboardRect);

    // Copy the contents of the current artboard to the temporary document
    doc.selection = null;
    doc.artboards.setActiveArtboardIndex(i);
    doc.selectObjectsOnActiveArtboard();
    doc.copy();
    tempDoc.paste();

    // Export the temporary document's contents as PNG
    tempDoc.exportFile(new File(exportPath), ExportType.PNG24, exportOptions);

    // Close the temporary document without saving changes
    tempDoc.close(SaveOptions.DONOTSAVECHANGES);
  }
}

// Display a completion message
alert("Artboards exported as PNG images at different scales.");
