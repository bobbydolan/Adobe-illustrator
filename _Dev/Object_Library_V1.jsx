#target Illustrator

var doc = app.activeDocument;
// // Guides
// app.documents[0].guides.everyItem().remove();
//
// // Remove all guides
// for (var i = doc.pathItems.length-1; i >= 0; i–) {
// var p = doc.pathItems[i];
// if (p.guides == true) {
// p.remove();
// }


// Unlock all layers (and their sublayers)
processLayersRecursive(app.activeDocument.layers);

// Process all layers under variable "parent" (including sublayers on all levels).
function processLayersRecursive(parent){
    for (var iLayer = 0; iLayer < parent.length; iLayer++){
        var curLayer = parent[iLayer];
        // Unlock the current layer
        if (curLayer.locked){
            curLayer.locked = false;
        }
        processLayersRecursive(curLayer.layers);
    }
}


// Select all CMD
doc.selectObjectsOnActiveArtboard();

// Takes selection and moves into single group
var aSelection = doc.selection;
var aGroup = app.activeDocument.groupItems.add();

for (i = 0; i < aSelection.length; i++) {
  aSelection[i].move(aGroup, ElementPlacement.INSIDE);
  aSelection[i].move(aGroup, ElementPlacement.PLACEATEND);
}

// Fit Artboard to Selection
app.activeDocument.fitArtboardToSelectedArt(0);


// Select margin size; default to 20
var myBorder = -1;
var myBorderInput = -1;
while (myBorder < 0 || myBorder > 100 || isNaN(myBorder) ) {
	myBorderInput = 2;
	myBorder = parseInt(myBorderInput);
}

// Main
// var doc = app.activeDocument;

var myVisibleBounds = doc.visibleBounds; // Rect, which is an array;

myVisibleBounds[0] -= myBorder; // left coordinate (use negative values to add artboard)
myVisibleBounds[1] += myBorder; // top coordinate
myVisibleBounds[2] += myBorder; // right coordinate
myVisibleBounds[3] -= myBorder; // bottom coordinate (use negative values to add artboard)

doc.artboards[0].artboardRect = myVisibleBounds;

// This is the scale factor that you can see in "Percent" textbox of
// the "Save for Web..." dialog box while changing the size of the image
// var scale = [2000, 1500, 1000, 500]
//
// // This is the image size for the PNGs files names
// var size = [4, 3, 2, 1]
//
// for(var i = 0; i<4; i++)
// {
//     var fileName = doc.fullName.toString();
//     if (fileName.lastIndexOf(".") >= 0) {
//         // Get the file name without the extension
//         fileName = fileName.substr(0, fileName.lastIndexOf("."));
//     }
//     // Name each file with yours size to avoid overwrite
//     fileName += "_@wx.png".replace("w", size[i]);
//
//     var exportOptions = new ExportOptionsPNG24();
//     exportOptions.horizontalScale = exportOptions.verticalScale = scale[i];
//     exportOptions.artBoardClipping = true;
//
//     var file = new File(fileName);
//     doc.exportFile(file, ExportType.PNG24, exportOptions);
// }
