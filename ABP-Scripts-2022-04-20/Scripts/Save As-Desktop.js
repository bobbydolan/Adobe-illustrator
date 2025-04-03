#target illustrator

// Hide layers.
var doc = app.activeDocument;
var myLayers = doc.layers;
var HideName = "Instructions";
try {
    HideLayer = myLayers.getByName(HideName);
    HideLayer.visible = false;
    redraw();
} catch (e) {}
try {
    // uncomment to suppress Illustrator warning dialogs
    // app.userInteractionLevel = UserInteractionLevel.DONTDISPLAYALERTS;

    if (app.documents.length > 0) {

        // Get the folder to save the files into
        var destFolder = null;
        destFolder = Folder.selectDialog('Select folder.', '~/desktop');

        if (destFolder != null) {
            var options, i, sourceDoc, targetFile;

            sourceDoc = app.activeDocument; // returns the document object
            var newName = sourceDoc.name + "Final" 

            // Get the file to save the document as
            targetFile = (newName, '.Ai', destFolder);

            // Save as
            sourceDoc.saveAs(targetFile, options);

            alert('File Saved');
        }
    } else {
        throw new Error('There are no document open!');
    }
} catch (e) {
    alert(e.message, "Script Alert", true);
}



    // Create the file object to save to
    var myFile = new File( destFolder + '/' + newName );
