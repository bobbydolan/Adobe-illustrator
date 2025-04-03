// JavaScript for Adobe Illustrator



// Function to select active artboard content
function selectActiveArtboardContent() {
    var activeDocument = app.activeDocument;
    
    // Uncomment the line below if you want to select objects on the active artboard
    // activeDocument.selectObjectsOnActiveArtboard();
}

// Copy Selection
function copySelection() {
    app.executeMenuCommand('copy');
}

// Create and activate a new document
function createAndActivateNewDocument(width, height) {
    var newDoc = app.documents.add(null, width, height);
    newDoc.activate();
    return newDoc;
}

// Paste Contents in Place
function pasteContentsInPlace() {
    app.executeMenuCommand('paste');
}

// Fit Artboard to Selected Art
function fitArtboardToSelectedArt() {
    app.activeDocument.fitArtboardToSelectedArt(0);
}

// Set Color Mode to RGB
function setColorModeToRGB() {
    app.executeMenuCommand("doc-color-rgb");
}

// Example Usage:
// Uncomment the line below to select objects on the active artboard
// selectActiveArtboardContent();

// Copy the selection
copySelection();

// Create and activate a new document of size 80x80 points
var newDocument = createAndActivateNewDocument(80, 80);

// Paste the contents into the new document
pasteContentsInPlace();

// Fit the artboard to the selected artwork
fitArtboardToSelectedArt();

// Set color mode to RGB
setColorModeToRGB();


// JavaScript for Adobe Illustrator

// Function to rename the current active artboard
function renameActiveArtboard(newName) {
    var activeDocument = app.activeDocument;
    
    // Get the active artboard index
    var activeArtboardIndex = activeDocument.artboards.getActiveArtboardIndex();

    // Rename the active artboard
    activeDocument.artboards[activeArtboardIndex].name = newName;
}

// Example Usage:
renameActiveArtboard("FPO-FPO");


// Artboard Duplicate
function ArtboardDupe() {
    var doc = app.activeDocument;
    var thisBoardIndex = doc.artboards.getActiveArtboardIndex();
    var thisBoard = doc.artboards[thisBoardIndex];
    var thisRect = thisBoard.artboardRect;
    var lastBoard = doc.artboards[doc.artboards.length - 1];
    var lastRect = lastBoard.artboardRect;
    doc.selectObjectsOnActiveArtboard();
    app.copy();
    var newBoard = doc.artboards.add(thisRect);
    var offsetH = 200;
    // Set name here
    thisBoard.name = "####-80"
    newBoard.artboardRect = [
        lastRect[2] + offsetH,
        lastRect[1],
        lastRect[2] + offsetH + (thisRect[2] - thisRect[0]),
        lastRect[3]
    ];
    newBoard.name = thisBoard.name + "40";
    app.executeMenuCommand("pasteFront");
    doc.selection = null;
};
ArtboardDupe();

