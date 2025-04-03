// set a new name eg "New Name" for the artboards Nr.?

var aDoc = app.activeDocument;


var newName = prompt("Rename Active Artboard" + "\n").split(",").join("");

var which_artBoards_to_rename = prompt("Rename Active Artboard" + "\n" + "Enter a number:", "2,3,5").split(",").join("");

for (i = 0; i < which_artBoards_to_rename.length; i++) {

    abIdx = which_artBoards_to_rename;

    aDoc.artboards[abIdx].name = newName + "-" + which_artBoards_to_rename; // set the new name here

}