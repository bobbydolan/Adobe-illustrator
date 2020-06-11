
#target illustrator

function exportPDF_IL(pdfPath, preset ) {

    var docRef = app.activeDocument;
    var options = new PDFSaveOptions();
    
    if ((preset !== undefined) && (preset.length > 0))
        options.pDFPreset = preset;

    var numArtboards = docRef.artboards.length;
    var range = "1";
    if (numArtboards > 1) range += "-" + numArtboards;
        
    // If you supply a range then the saveAs becomes a saveACopy.
    pdfSaveOptions.artboardRange = range;

    // Prevent open after export
    pdfSaveOptions.viewAfterSaving = false;

    var myFile = new File(pdfPath);
    docRef.saveAs(myFile, pdfSaveOptions);
};

exportPDF_IL( "e:\\pdfs\\sample.pdf", "");
