// toggles active layer visibility
app.activeDocument.activeLayer.visible ^= 1;


/////////////////////////////////////////////


// toggles lock/unlock
app.activeDocument.activeLayer.locked ^= 1;


/////////////////////////////////////////////


// Select all on layer
app.activeDocument.activeLayer.hasSelectedArtwork = true;


/////////////////////////////////////////////


// Unlock all layers & sublayers
processLayersRecursive(app.activeDocument.layers);  

// Process all layers under variable "parent" (including sublayers on all levels).  
function processLayersRecursive(parent){   

    for (var iLayer = 0; iLayer < parent.length; iLayer++){  

        var curLayer = parent[iLayer];  

        // Unlock the current layer  

        if (curLayer.locked){  

            curLayer.locked = false;  

        }  

        processLayersRecursive(curLayer.layers);       

    }  

}  


/////////////////////////////////////////////


// Menu Commands

app.executeMenuCommand('deselectall');

app.executeMenuCommand('unlockAll');

app.executeMenuCommand('selectall');

app.executeMenuCommand('outline');

app.executeMenuCommand('ReArrange Artboards');

app.executeMenuCommand("doc-color-rgb");


/////////////////////////////////////////////


// Embed all linked images

if ( app.documents.length > 0 ) {

    while ( app.activeDocument.placedItems.length > 0 ) {
 
   placedArt = app.activeDocument.placedItems[0];
 
   placedArt.embed();
 
    }
 
 }


 /////////////////////////////////////////////
 
 
// Takes selection and moves into single group
var aSelection = doc.selection;
var aGroup = app.activeDocument.groupItems.add();

for (i = 0; i < aSelection.length; i++) {
  aSelection[i].move(aGroup, ElementPlacement.INSIDE);
  aSelection[i].move(aGroup, ElementPlacement.PLACEATEND);
}

 /////////////////////////////////////////////
 

 // Select margin size; default to 20
var myBorder = -1;
var myBorderInput = -1;
while (myBorder < 0 || myBorder > 100 || isNaN(myBorder) ) {
	myBorderInput = 2;
	myBorder = parseInt(myBorderInput);
}