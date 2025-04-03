#target illustrator

// Get the active document
var doc = app.activeDocument;

// Define the suffix to add
var suffix = "-DM";

// Iterate over each artboard in the document
for (var i = 0; i < doc.artboards.length; i++) {
  var artboard = doc.artboards[i];
  var artboardName = artboard.name;
  
  // Append the suffix to the artboard name
  artboard.name = artboardName + suffix;
}

// Display a success message
// alert("Suffix added to all artboard names.");
