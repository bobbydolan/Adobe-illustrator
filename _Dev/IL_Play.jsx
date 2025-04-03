var doc = app.activeDocument;



if (app.documents.length > 0)


    // Unlock all layers (and their sublayers)
    processLayersRecursive(app.activeDocument.layers);

  // Process all layers under variable "parent" (including sublayers on all levels).
  function processLayersRecursive(parent) {
    for (var iLayer = 0; iLayer < parent.length; iLayer++) {
      var curLayer = parent[iLayer];
      // Unlock the current layer
      if (curLayer.locked) {
        curLayer.locked = false;
      }
      processLayersRecursive(curLayer.layers);
    }
  }


  alert("Width & Height\n"+ doc.selection[0].width + " x " + doc.selection[0].height);

  // Select all CMD
  doc.selectObjectsOnActiveArtboard();

// Takes selection and moves into single group
var aSelection = doc.selection;
var aGroup = app.activeDocument.groupItems.add();

for (i = 0; i < aSelection.length; i++) {
  aSelection[i].move(aGroup, ElementPlacement.INSIDE);
  aSelection[i].move(aGroup, ElementPlacement.PLACEATEND);
}


// scale selection

// Repositions art object(s).
// aGroup.translate(0,100);
// Scales art object(s).
// aGroup.resize(50, 50, true , true, true, true, 50);
  // (50, 50)
  //   [, changePositions] = true;
  //   [, changeFillPatterns] = true;
  //   [, changeFillGradients] = true;
  //   [, changeStrokePattern] = true;
  //   [, changeLineWidths] = true;
  //   [, scaleAbout])
// aGroup.transform(matrix, true , true, true, true, 50, CENTER);
  // (50, 50)
  //   [, changePositions] = true;
  //   [, changeFillPatterns] = true;
  //   [, changeFillGradients] = true;
  //   [, changeStrokePattern] = true;
  //   [, changeLineWidths] = true;
  //   [, scaleAbout])


// aGroup.getScaleMatrix(50, 50);
