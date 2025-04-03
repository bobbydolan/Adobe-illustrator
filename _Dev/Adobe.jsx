// Exports current document to dest as a PNG24 file with specified
// options, dest contains the full path including the file name, saveAsHTML // option creates an HTML version with the PNG file in an images folder
function exportFileToPNG24 (dest) { if ( app.documents.length > 0 ) {
var exportOptions = new ExportOptionsPNG24();
var type = ExportType.PNG24;
var fileSpec = new File(dest);
exportOptions.antiAliasing = false;
exportOptions.transparency = false;
exportOptions.saveAsHTML = true;
exportOptions.artBoardClipping = true;
app.activeDocument.exportFile( fileSpec, type, exportOptions );
} }