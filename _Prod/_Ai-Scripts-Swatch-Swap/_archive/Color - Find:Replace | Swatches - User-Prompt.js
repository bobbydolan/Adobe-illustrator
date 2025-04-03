#target illustrator

// Function to find and replace swatch colors
function findAndReplaceSwatchColors() {
  var doc = app.activeDocument;
  var swatches = doc.swatches;

  // Prompt for the swatch colors
  var findColor = prompt("Enter the swatch color to find:", "");
  var replaceColor = prompt("Enter the replacement swatch color:", "");

  if (findColor && replaceColor) {
    for (var i = 0; i < doc.pageItems.length; i++) {
      var item = doc.pageItems[i];
      if (item.fillColor && item.fillColor.typename === "SpotColor") {
        var swatchName = item.fillColor.spot.name;
        if (swatchName === findColor) {
          var replacementSwatch = swatches.getByName(replaceColor);
          if (replacementSwatch) {
            item.fillColor = replacementSwatch.color;
          }
        }
      }
    }
  } else {
    alert("Invalid input. Please enter both the find and replacement swatch colors.");
  }
}

// Call the function to execute the script
app.executeMenuCommand("deselectall");
findAndReplaceSwatchColors();
