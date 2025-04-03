#target illustrator


// This script performs the following actions:

// Retrieves the active document.
// Checks if the document's file name ends with "-Dark_Mode". If not, it saves the document with the suffix "-Dark_Mode".
// Adds the suffix "-DM" to all artboards in the document that don't already have that suffix.
// Displays an alert message indicating that the file has been duplicated and the "-DM" suffix has been added to artboard names.
// The script essentially duplicates the document, saves it with the "-Dark_Mode" suffix if necessary, and adds the "-DM" suffix to artboard names. Finally, it displays an alert to inform the user about the completion of the process.

// Get the active document
var doc = app.activeDocument;

// Save the document with the suffix "-Dark_Mode" if it doesn't already have that suffix
saveAsDarkMode(doc);

// Function to save the document with the suffix "-Dark_Mode" if it doesn't already have that suffix
function saveAsDarkMode(document) {
  var filePath = document.fullName.parent;
  var fileName = document.fullName.name;
  var fileNameWithoutExtension = fileName.split(".")[0];
  
  // Check if the file name already ends with "-Dark_Mode"
  if (!/-Dark_Mode$/.test(fileNameWithoutExtension)) {
    var newFileName = fileNameWithoutExtension + "-Dark_Mode.ai";
    var saveFile = new File(filePath + "/" + newFileName);

    // Save the document with the suffix "-Dark_Mode"
    document.saveAs(saveFile);
  } else {
    // Display an alert if the file already has the "-Dark_Mode" suffix
    alert("The file already has the '-Dark_Mode' suffix.");
  }
}


// Add the suffix "-DM" to artboards that don't already have that suffix
addSuffixToArtboards(doc, "-DM");

// Function to add the specified suffix to all artboards in the document
function addSuffixToArtboards(document, suffix) {
  var artboards = document.artboards;
  
  for (var i = 0; i < artboards.length; i++) {
    var artboard = artboards[i];
    var artboardName = artboard.name;
    
    // Check if the artboard name already ends with the suffix
    if (!new RegExp(suffix + "$").test(artboardName)) {
      artboard.name += suffix;
    }
  }
}

// Turn off the alert below to not show
alert("File Duplicated & -DM added to Artboard Names");