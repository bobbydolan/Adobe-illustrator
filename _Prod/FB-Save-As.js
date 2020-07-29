
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Rename-artboard-name_CleanUp.js
// Script.description = Cleans up artboard names getting rid of "., _, - ,"

var doc = app.activeDocument;
for (var i = 0; i < doc.artboards.length; i++) {
    var aBoard = doc.artboards[i].active;
    var oldName = doc.artboards[i].name;
    doc.artboards[i].name = oldName.replace('_', '-');
}

for (var i = 0; i < doc.artboards.length; i++) {
    var aBoard = doc.artboards[i].active;
    var oldName = doc.artboards[i].name;
    doc.artboards[i].name = oldName.replace(' _', '-');
}

for (var i = 0; i < doc.artboards.length; i++) {
    var aBoard = doc.artboards[i].active;
    var oldName = doc.artboards[i].name;
    doc.artboards[i].name = oldName.replace(' ', '-');
}

for (var i = 0; i < doc.artboards.length; i++) {
    var aBoard = doc.artboards[i].active;
    var oldName = doc.artboards[i].name;
    doc.artboards[i].name = oldName.replace('--', '-');
}

for (var i = 0; i < doc.artboards.length; i++) {
    var aBoard = doc.artboards[i].active;
    var oldName = doc.artboards[i].name;
    doc.artboards[i].name = oldName.replace('.', '-');
}
for (var i = 0; i < doc.artboards.length; i++) {
    var aBoard = doc.artboards[i].active;
    var oldName = doc.artboards[i].name;
    doc.artboards[i].name = oldName.replace('  ', '-');
}

for (var i = 0; i < doc.artboards.length; i++) {
    var aBoard = doc.artboards[i].active;
    var oldName = doc.artboards[i].name;
    doc.artboards[i].name = oldName.replace('www', 'WWW');
}
for (var i = 0; i < doc.artboards.length; i++) {
    var aBoard = doc.artboards[i].active;
    var oldName = doc.artboards[i].name;
    doc.artboards[i].name = oldName.replace('ios', 'iOS');
}

for (var i = 0; i < doc.artboards.length; i++) {
    var aBoard = doc.artboards[i].active;
    var oldName = doc.artboards[i].name;
    doc.artboards[i].name = oldName.replace('android', 'Android');
}

// Embed Objects
// Script.description = Embeds PNGs to file 
if (app.documents.length > 0) {
    while (app.activeDocument.placedItems.length > 0) {
        placedArt = app.activeDocument.placedItems[0];
        placedArt.embed();
    }
}
// 
// 
(function() {
    var SublayerHelper, sublayerHelper;
  
    SublayerHelper = (function() {
      function SublayerHelper() {
        this.manageSublayers(app.activeDocument);
      }
  
      SublayerHelper.prototype.manageSublayers = function(root) {
        var i, layer, len, ref, results, sublayer;
        ref = root.layers;
        results = [];
        for (i = 0, len = ref.length; i < len; i++) {
          layer = ref[i];
          results.push((function() {
            var j, len1, ref1, results1;
            ref1 = layer.layers;
            results1 = [];
            for (j = 0, len1 = ref1.length; j < len1; j++) {
              sublayer = ref1[j];
              results1.push(this.renameLayer(sublayer));
            }
            return results1;
          }).call(this));
        }
        return results;
      };
  
      SublayerHelper.prototype.renameLayer = function(layer) {
        var newName;
        newName = layer.parent.name + " : " + layer.name;
        newName = newName.replace(/(\- )?((copy)|(copie))( [0-9]+)?/g, "");
        return layer.name = newName;
      };
  
      return SublayerHelper;
  
    })();
  
    sublayerHelper = new SublayerHelper();
  
  }).call(this);
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// Convert doc to RBG
// Script.description = Convert doc to RBG
app.executeMenuCommand("doc-color-rgb");

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// deleteEmptyLayers,jsx
// script.description = deletes empty layers and sublayers. If a sublayer is not empty, its parent empty layer will not be removed.

function main() {
    try {
        var idoc = app.activeDocument;
    } catch (e) {
        alert('Open a document and try again');
        return;
    }

    var emptyLayers = [];
    getEmptyLayers(idoc, emptyLayers);

    for (var a = 0; a < emptyLayers.length; a++) {
        //$.writeln(emptyLayers[a].name);
        //$.writeln(emptyLayers[a].canDelete);
        emptyLayers[a].remove();
    }
}

// return empty layers, except the ones that have sublayers with objects
function getEmptyLayers(container, arr) {
    var layers = container.layers;

    for (var k = 0; k < layers.length; k++) {
        try {
            var ilayer = layers[k];
            ilayer.canDelete = true; // initialize all layers with deletion flag set to true

            // process sublayers first
            if (ilayer.layers.length > 0) {
                getEmptyLayers(ilayer, arr);
            }

            // then process objects in current layer
            // if layer has a sublayer with objects, deletion flag was previously set to false
            // ignore this layer and set it's parent layer (container) to false as well, otherwise add to Empty Layers array
            if (ilayer.pageItems.length == 0 && ilayer.canDelete) {
                arr.push(ilayer);
            }
            // if layer has objects, set deletion flag to false and its parent layer to false as well
            else {
                ilayer.canDelete = false;
                container.canDelete = false;
            }
        } catch (e) {
            /*$.writeln (contaner.name)*/
        }
    }
}

main();

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Save-As-Prompt
var doc = app.activeDocument;

var original_file = doc.fullName; // we need this to return to original file

var arr = doc.name.split(".");

var extension = "";

if (arr.length > 1) extension = "." + arr.pop();

creationDate = prompt("Date: ", "MMDD");
prodTeam = prompt("Product Team: ", "Team-Name");
projectName = prompt("Project Name: ", "Project-Name");
// SurfaceName = prompt("Surface/Deliverable Name: ", "");
artistCreator = prompt("Artist Name: ", "FirstInitial-LastName");
versionNumber = prompt("Version # Or Final: ", "Version#");

var filename = creationDate + '-' + prodTeam + '-' + projectName + '-' + artistCreator + '-' + versionNumber;

var name_ai = filename + '.ai';

// This saves directly to ~/Desktop
// var export_folder = "~/Desktop"; // define the place where to save the copy

// This allows user to choose desitination
var export_folder = Folder.selectDialog('Select folder.', '~/desktop')


saveCopyAsAI(name_ai);

function saveCopyAsAI(nameAI) {

    var packaged_file = null;

    packaged_file = File(export_folder + "/" + nameAI);

    var save_options = new IllustratorSaveOptions();

    save_options.embedICCProfile = true;

    save_options.pdfCompatible = true

    doc.saveAs(packaged_file, save_options);

    alert('File Saved!');

}


