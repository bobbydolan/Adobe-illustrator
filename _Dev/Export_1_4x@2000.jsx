var doc = app.activeDocument;

// This is the scale factor that you can see in "Percent" textbox of
// the "Save for Web..." dialog box while changing the size of the image
var scale = [400, 300, 200, 150, 100]

// This is the image size for the PNGs files names
var size = [4, 3, 2, 1.5, 1]

for (var i = 0; i < 5; i++) {
  var fileName = doc.fullName.toString();
  if (fileName.lastIndexOf(".") >= 0) {
    // Get the file name without the extension
    fileName = fileName.substr(0, fileName.lastIndexOf("."));
  }
  // Name each file with yours size to avoid overwrite
  fileName += "_@wx.png".replace("w", size[i]);

  var exportOptions = new ExportOptionsPNG24();
  exportOptions.horizontalScale = exportOptions.verticalScale = scale[i];
  exportOptions.artBoardClipping = true;

  var file = new File(fileName);
  doc.exportFile(file, ExportType.PNG24, exportOptions);
}
