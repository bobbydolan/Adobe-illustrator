#target illustrator

// Get the active document
var doc = app.activeDocument;

// Check if the document name ends with "-Light_Mode" and save with the "-Dark_Mode" suffix
if (/-Light_Mode$/.test(doc.name)) {
  saveWithSuffix(doc, "-Dark_Mode", "-Light_Mode");
}
// Check if the document name ends with "-Dark_Mode" and save with the "-Light_Mode" suffix
else if (/-Dark_Mode$/.test(doc.name)) {
  saveWithSuffix(doc, "-Light_Mode", "-Dark_Mode");
}
// Save the document with the "-Light_Mode" suffix
else {
  saveWithSuffix(doc, "-Light_Mode");
}

// Function to save the document with the appropriate suffix
function saveWithSuffix(document, newSuffix, oldSuffix) {
  var filePath = document.fullName.parent;
  var fileName = document.fullName.name;
  var fileNameWithoutExtension = fileName.split(".")[0];

  var newFileName;

  // Check if the file name already ends with the specified suffix
  if (oldSuffix && new RegExp(oldSuffix + "$").test(fileNameWithoutExtension)) {
    // Swap the suffix
    newFileName = fileNameWithoutExtension.replace(new RegExp(oldSuffix + "$"), newSuffix) + ".ai";
  } else {
    // Add the suffix to the file name
    newFileName = fileNameWithoutExtension + newSuffix + ".ai";
  }

  var saveFile = new File(filePath + "/" + newFileName);

  // Save the document with the new file name
  document.saveAs(saveFile);
}
