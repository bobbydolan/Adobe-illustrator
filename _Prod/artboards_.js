/* global app, $ */
function addArtboard() {
//   var thisBoard = doc.artboards;
// var thisBoardIndex = doc.artboards.getActiveArtboardIndex();
// var thisBoard = doc.artboards[thisBoardIndex];
  var doc = app.documents.add(); // create a doc with defaults
  var firstArtBoard = doc.artboards[0]; // get the default atboard
  // inspect its properties
  for (var prop in firstArtBoard) {
    // exclude protptypes
    if (firstArtBoard.hasOwnProperty(prop)) {
      $.writeln(prop);
    }
  }
  // there is a rect property
  // take a look at the values
  $.writeln(firstArtBoard.artboardRect);

  
  // create a artboard with the same size and an
  // offset of 5 points to the right
  var x1 = firstArtBoard.artboardRect[2] + 1000;
  var y1 = firstArtBoard.artboardRect[1];
  var x2 = x1 + firstArtBoard.artboardRect[2];
  var y2 = firstArtBoard.artboardRect[3];
  newBoard = doc.artboards.add([x1, y1, x2, y2]);
  newBoard.name = "-iOS";


  var x1 = firstArtBoard.artboardRect[2] + 1000;
  var y1 = firstArtBoard.artboardRect[1];
  var x2 = x1 + firstArtBoard.artboardRect[2];
  var y2 = firstArtBoard.artboardRect[3];
  newBoard = doc.artboards.add([x1, y1, x2, y2]);
  newBoard.name = "-Android";



  var x1 = firstArtBoard.artboardRect[2] + 1000;
  var y1 = firstArtBoard.artboardRect[1];
  var x2 = x1 + firstArtBoard.artboardRect[2];
  var y2 = firstArtBoard.artboardRect[3];
  newBoard = doc.artboards.add([x1, y1, x2, y2]);
  newBoard.name = "-WWW";

  
}

addArtboard();

