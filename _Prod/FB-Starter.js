// */ // Make sure we have an open document, or else open one
// if( app.documents.length == 0 ) {
// 	fileToProcess = File.openDialog();
// 	app.open(fileToProcess);
// }

// DIALOG
// ======
var dialog = new Window("dialog"); 
    dialog.text = "Artboard-Creator"; 
    dialog.orientation = "row"; 
    dialog.alignChildren = ["left","top"]; 
    dialog.spacing = 10; 
    dialog.margins = 25; 

// IOSGROUP
// ========
var iOSGroup = dialog.add("group", undefined, {name: "iOSGroup"}); 
    iOSGroup.orientation = "column"; 
    iOSGroup.alignChildren = ["fill","top"]; 
    iOSGroup.spacing = 25; 
    iOSGroup.margins = 0; 

// PLEASEREAD
// ==========
var Pleaseread = iOSGroup.add("panel", undefined, undefined, {name: "Pleaseread"}); 
    Pleaseread.text = "Please Read"; 
    Pleaseread.preferredSize.height = 50; 
    Pleaseread.orientation = "column"; 
    Pleaseread.alignChildren = ["center","center"]; 
    Pleaseread.spacing = 10; 
    Pleaseread.margins = 10; 

// MESSAGE
// =======
var Message = Pleaseread.add("group", undefined, {name: "Message"}); 
    Message.orientation = "row"; 
    Message.alignChildren = ["left","center"]; 
    Message.spacing = 10; 
    Message.margins = 10; 
    Message.alignment = ["left","center"]; 

// var statictext1 = Message.add("statictext", undefined, undefined, {name: "statictext1"}); 
//     statictext1.text = "Please be sure you have a blank file open to continue."; 
//     statictext1.preferredSize.width = 500; 
//     statictext1.justify = "center"; 
//     statictext1.alignment = ["left","center"]; 

// MESSAGE1
// ========
var Message1 = Pleaseread.add("group", undefined, {name: "Message1"}); 
    Message1.orientation = "row"; 
    Message1.alignChildren = ["left","center"]; 
    Message1.spacing = 10; 
    Message1.margins = 10; 
    Message1.alignment = ["left","center"]; 

var statictext2 = Message1.add("group"); 
    statictext2.preferredSize.width = 500; 
    statictext2.orientation = "column"; 
    statictext2.alignChildren = ["center","center"]; 
    statictext2.spacing = 0; 
    statictext2.alignment = ["left","center"]; 

    statictext2.add("statictext", undefined, "If There Is No Spec for One of the Platforms (iOS/Android/WWW)", {name: "statictext2"}); 
    statictext2.add("statictext", undefined, "", {name: "statictext2"}); 
    statictext2.add("statictext", undefined, "Enter 1 Into the Text Field", {name: "statictext2"}); 
    statictext2.add("statictext", undefined, "", {name: "statictext2"}); 
    statictext2.add("statictext", undefined, "Delete/Remove Unneeded Artboards Afterward", {name: "statictext2"}); 
    statictext2.preferredSize.width = 500; 

// BUTTONS
// =======
var Buttons = Pleaseread.add("group", undefined, {name: "Buttons"}); 
    Buttons.orientation = "row"; 
    Buttons.alignChildren = ["center","center"]; 
    Buttons.spacing = 12; 
    Buttons.margins = 10; 
    Buttons.alignment = ["center","center"]; 

var OK = Buttons.add("button", undefined, undefined, {name: "OK"}); 
    OK.text = "OK"; 

// MESSAGE2
// ========
var Message2 = Pleaseread.add("group", undefined, {name: "Message2"}); 
    Message2.orientation = "row"; 
    Message2.alignChildren = ["left","center"]; 
    Message2.spacing = 10; 
    Message2.margins = 10; 
    Message2.alignment = ["left","center"]; 

var statictext3 = Message2.add("statictext", undefined, undefined, {name: "statictext3"}); 
    statictext3.text = "Hold Down ESC to Cancel"; 
    statictext3.preferredSize.width = 500; 
    statictext3.justify = "center"; 
    statictext3.alignment = ["left","center"]; 

dialog.show();





var doc = app.activeDocument;

// This works
iosXv = prompt("iOS Width: ", "10");
iosYv = prompt("iOS Height: ", "10");
// 
// 
androidXv = prompt("Android Width: ", "10");
androidYv = prompt("Android Height: ", "10");
// 
// 
wwwXv = prompt("WWW Width: ", "10");
wwwYv = prompt("WWW Height: ", "10");
// 
// 
baseAboardname = prompt("Artboard Name: ", "Artboard-Name");

iosBoard = doc.artboards.add([0, 0, iosXv, -iosYv]);
iosBoard.name = baseAboardname + "-iOS-LM";

doc.rearrangeArtboards();

iosBoard = doc.artboards.add([0, 0, iosXv, -iosYv]);
iosBoard.name = baseAboardname + "-iOS-DM";

doc.rearrangeArtboards();

androidBoard = doc.artboards.add([0, 0, androidXv, -androidYv]);
androidBoard.name = baseAboardname + "-Android-LM";

doc.rearrangeArtboards();

androidBoard = doc.artboards.add([0, 0, androidXv, -androidYv]);
androidBoard.name = baseAboardname + "-Android-DM";

doc.rearrangeArtboards();

wwwBoard = doc.artboards.add([0, 0, wwwXv, -wwwYv]);
wwwBoard.name = baseAboardname + "-WWW-LM";

doc.rearrangeArtboards();

wwwBoard = doc.artboards.add([0, 0, wwwXv, -wwwYv]);
wwwBoard.name = baseAboardname + "-WWW-DM";

doc.rearrangeArtboards();



var artboard = doc.artboards.getByName("Starter-Doc");

artboard.remove ();



doc.rearrangeArtboards();


// Embed Objects
// Script.description = Embeds PNGs to file 
if (app.documents.length > 0) {
    while (app.activeDocument.placedItems.length > 0) {
        placedArt = app.activeDocument.placedItems[0];
        placedArt.embed();
    }
}

// Convert doc to RBG
// Script.description = Convert doc to RBG
app.executeMenuCommand("doc-color-rgb");






