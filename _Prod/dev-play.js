// var box = new Window('dialog', "Some title");

// box.panel = box.add('panel', undefined, "Panel title");

// box.panel_text1 = box.panel.add('edittext', undefined, "Default_value_1");

// box.panel_text2 = box.panel.add('edittext', undefined, "Default_value_2");

// box.panel_text3 = box.panel.add('edittext', undefined, "Default_value_3");

// box.panel2 = box.add('panel', undefined, "Title (not displayed)");

// box.panel2.group = box.panel2.add('group', undefined );

// box.panel2.group.orientation='row';

// box.panel2.group.text1 = box.panel2.group.add('statictext', undefined, "Press Button to close");

// box.panel2.group.closeBtn = box.panel2.group.add('button',undefined, "Close", {name:'close'});

// box.panel3 = box.add('panel', undefined, "Title 2 (not displayed)");

// box.panel3.group = box.panel3.add('group', undefined, );

// box.panel3.group.orientation='column';

// box.panel3.group.text1 = box.panel3.group.add('statictext', undefined, "Dummy Button for nothing");

// box.panel3.group.closeBtn = box.panel3.group.add('button',undefined, "Somewhat", {name:'Somewhat'});

// box.panel2.group.closeBtn.onClick = function(){

//   box.close();

// }

// box.show()

// //create a new document of size 100x100 points
// var doc = app.documents.add( null , 100,100);

// // Replace "." with "_" Artboard illustrator script
// var doc = app.activeDocument;
// for ( var i=0; i<doc.artboards.length ;i++) {
// var aBoard = doc.artboards[i].active; // makes artboard active
// var oldName = doc.artboards[i].name;
// doc.artboards[i].name = oldName.replace ("Artboard 1", "Delete Me"); // replace . with _
// }

// // // Convert doc to RBG
// // // Script.description = Convert doc to RBG
// // app.executeMenuCommand("doc-color-rgb");



// var docRef = app.activeDocument;
// var ABName = "hello";
// function setActiveArtboardBy(name) {
//     var artboard = docRef.artboards.getByName(name);
//     for (i = 0; i < docRef.artboards.length; i++) {
//         if (docRef.artboards[i] == artboard) {
//             docRef.artboards.setActiveArtboardIndex(i);
//             break;
//         }
//     }
// }
// setActiveArtboardBy(ABName);



// // Prompt Find and Replace full artboard name
// #target illustrator
// var doc = app.activeDocument;

// jsfind = prompt("Find: ", "");
// jsreplace = prompt("Replace: ", "");

// for ( var i=0; i<doc.artboards.length ;i++) {
// var aBoard = doc.artboards[i].active;
// var oldName = doc.artboards[i].name;
// doc.artboards[i].name = oldName.replace (jsfind, jsreplace);
// }
// // 



// //Replace "." with "_" Artboard illustrator script
// #target illustrator
// var doc = app.activeDocument;
// for ( var i=0; i<doc.artboards.length ;i++) {
// var aBoard = doc.artboards[i].active; // makes artboard active
// var oldName = doc.artboards[i].name;
// doc.artboards[i].name = oldName.replace (".", "_"); // replace . with _
// }



/*
Code for Import https://scriptui.joonas.me — (Triple click to select): 
{"activeId":1,"items":{"item-0":{"id":0,"type":"Dialog","parentId":false,"style":{"text":"Artboard-Creator","preferredSize":[0,0],"margins":25,"orientation":"row","spacing":10,"alignChildren":["left","top"],"varName":null,"windowType":"Dialog","creationProps":{"su1PanelCoordinates":false,"maximizeButton":false,"minimizeButton":false,"independent":false,"closeButton":true,"borderless":false,"resizeable":false},"enabled":true}},"item-1":{"id":1,"type":"Panel","parentId":20,"style":{"text":"Please Read","preferredSize":[0,50],"margins":10,"orientation":"column","spacing":10,"alignChildren":["left","top"],"alignment":null,"varName":"Pleaseread","creationProps":{"borderStyle":"etched","su1PanelCoordinates":false},"enabled":true}},"item-6":{"id":6,"type":"Group","parentId":1,"style":{"preferredSize":[0,0],"margins":0,"orientation":"row","spacing":10,"alignChildren":["left","center"],"alignment":"left","varName":"Message","enabled":true}},"item-20":{"id":20,"type":"Group","parentId":0,"style":{"preferredSize":[0,0],"margins":0,"orientation":"column","spacing":25,"alignChildren":["fill","top"],"alignment":null,"varName":"iOSGroup","enabled":true}},"item-36":{"id":36,"type":"Group","parentId":1,"style":{"preferredSize":[0,0],"margins":0,"orientation":"row","spacing":10,"alignChildren":["center","center"],"alignment":"center","varName":"Buttons","enabled":true}},"item-37":{"id":37,"type":"Button","parentId":36,"style":{"text":"Continue","justify":"center","preferredSize":[0,0],"alignment":"fill","varName":"Continue","helpTip":null,"enabled":true}},"item-38":{"id":38,"type":"Button","parentId":36,"style":{"text":"Cancel","justify":"center","preferredSize":[0,0],"alignment":null,"varName":"cancel","helpTip":null,"enabled":true}},"item-51":{"id":51,"type":"StaticText","parentId":1,"style":{"text":"","justify":"left","preferredSize":[0,0],"alignment":null,"varName":"FPO","helpTip":null,"softWrap":false,"creationProps":{"truncate":"none","multiline":false,"scrolling":false},"enabled":true}},"item-54":{"id":54,"type":"StaticText","parentId":6,"style":{"enabled":true,"varName":null,"creationProps":{"truncate":"none","multiline":false,"scrolling":false},"softWrap":true,"text":"Please be sure you have a blank file open to continue.","justify":"left","preferredSize":[0,0],"alignment":"center","helpTip":""}}},"order":[0,20,1,51,6,54,36,38,37],"settings":{"importJSON":true,"indentSize":false,"cepExport":false,"includeCSSJS":true,"functionWrapper":false,"compactCode":false,"showDialog":true,"afterEffectsDockable":false,"itemReferenceList":"None"}}
*/ // Make sure we have an open document, or else open one
if( app.documents.length == 0 ) {
	fileToProcess = File.openDialog();
	app.open(fileToProcess);
}

