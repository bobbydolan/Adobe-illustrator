// Rename Scrub out #### //
var doc = app.activeDocument;
for (var i = 0; i < doc.artboards.length; i++) {
    var aBoard = doc.artboards[i].active; // makes artboard active
    var oldName = doc.artboards[i].name;
    doc.artboards[i].name = oldName.replace("####-", ""); // replace . with _

}

var doc = app.activeDocument;
for (var i = 0; i < doc.artboards.length; i++) {
    var aBoard = doc.artboards[i].active; // makes artboard active
    var oldName = doc.artboards[i].name;
    doc.artboards[i].name = oldName.replace("####-", ""); // replace . with _

}

var doc = app.activeDocument;
for (var i = 0; i < doc.artboards.length; i++) {
    var aBoard = doc.artboards[i].active; // makes artboard active
    var oldName = doc.artboards[i].name;
    doc.artboards[i].name = oldName.replace("####-", ""); // replace . with _

}


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// Artboards Sort A-Z //
function sortArtboard() {
    var doc = app.activeDocument,
        properties = [],
        i,
        max;

    function copyProperties(source) {
        var props = {},
            key;
        for (key in source) {
            try {
                props[key] = source[key];
            } catch (e) {}
        }
        return props;
    }

    function pasteProperties(source, destination) {
        var key;
        for (key in source) {
            destination[key] = source[key];
        }
    }

    function compareName(a, b) {
        var comparison = 0;
        if (a.name > b.name) {
            comparison = 1;
        } else if (a.name < b.name) {
            comparison = -1;
        }
        return comparison;
    }

    for (i = 0, max = doc.artboards.length; i < max; i += 1) {
        properties.push(copyProperties(doc.artboards[i]));
    }

    properties.sort(compareName);

    for (i = 0, max = doc.artboards.length; i < max; i += 1) {
        pasteProperties(properties[i], doc.artboards[i]);
    }

}

sortArtboard();


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// Rearrange All Artboards //
doc.rearrangeArtboards();


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// Add Prefix to artboards Prompt
var doc = app.activeDocument;

newName = prompt("Add Prefix: ", "");

for (var i = 0; i < doc.artboards.length; i++) {
    var aBoard = doc.artboards[i].active;
    var oldName = doc.artboards[i].name;
    doc.artboards[i].name = newName + "-" + "b4b_" + oldName;
}


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// Create Folder //
var startFolder = Folder("~/Desktop");
var foldersToMake = ["_Ai-Exports"];
var thisNewFolder, thisNewFolderName;
for (var i = 0; i < foldersToMake.length; i++) {
    thisNewFolderName = foldersToMake[i];
    // automatically converts from Folder object to string using toString() method automatically
    thisNewFolder = Folder(startFolder + "/" + thisNewFolderName + "/" + newName);
    // not sure if this is necessary, but probably good to check it it already exists.
    if (!(thisNewFolder.exists)) {
        thisNewFolder.create();
    }
}


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// Save-As
var doc = app.activeDocument;

var original_file = doc.fullName; // we need this to return to original file

var arr = doc.name.split(".");

var extension = "";

if (arr.length > 1) extension = "." + arr.pop();

var name_ai = "_" + newName + "-Ai-Export" + '.ai';

// This saves directly to ~/Desktop
// var export_folder = "~/Desktop/_Ai-Exports"; // define the place where to save the copy
var export_folder = thisNewFolder; // define the place where to save the copy


// This allows user to choose desitination
// var export_folder = Folder.selectDialog('Select folder.', '~/desktop')


saveCopyAsAI(name_ai);

function saveCopyAsAI(nameAI) {

    var packaged_file = null;

    packaged_file = File(export_folder + "/" + nameAI);

    var save_options = new IllustratorSaveOptions();

    save_options.embedICCProfile = true;

    save_options.pdfCompatible = true

    doc.saveAs(packaged_file, save_options);

    // alert('File Saved!');

}