
 
// // requiredABsize = prompt( 'Scale artboards to what square size?\nRemember this number to create enough space between your scaled artboards in the next step.\n\nThis script uses \"Scale Strokes and Effects\" for you.\n\n', '500', 'Select artboard area');
// requiredABsize = 40;

// // Make sure the user generates enough space between the artboards
// app.executeMenuCommand("ReArrange Artboards");

// var activeDoc = app.activeDocument;
// var TotalArtboards = activeDoc.artboards.length;  
// var originalOrigin = activeDoc.rulerOrigin;

// for (var i = 0 ; i < TotalArtboards; i++){
//     var _artboards = activeDoc.artboards;
//     var abActive   = _artboards[i];
//     var abProps    = getArtboardBounds(abActive);
//     var scale      = findRequiredScale(abProps);
// 		// abActive   = activeDoc.artboards[ activeDoc.artboards.getActiveArtboardIndex() ];
//     activeDoc.artboards.setActiveArtboardIndex(i);
// 		// alert(i);
//     app.selection = [];
//     // app.executeMenuCommand ('deselectall');
//     app.executeMenuCommand ('selectallinartboard');
//     var selection = activeDoc.selection;

//     var artboardRight = abActive.artboardRect[2];
//     // Get the Height of the Artboard
//     var artboardBottom = abActive.artboardRect[3];
//     var artboardX = abActive.artboardRect[0];
//     var artboardY = abActive.artboardRect[1];
		
// 		var horziontalCenterPosition = (artboardRight+(-1*artboardX))/2;
// 		var verticalCenterPosition = (artboardY-(artboardBottom))/2;
// 		//alert(app.activeDocument.rulerOrigin+"\n left "+artboardX+"\ntop "+artboardY+"\nright "+artboardRight+"\nbottom "+artboardBottom+"\nTheleft: "+horziontalCenterPosition+"\nThevert: "+verticalCenterPosition);

// 		activeDoc.rulerOrigin = [horziontalCenterPosition,verticalCenterPosition];
 
// 	app.selection = [];
// 	activeDoc.selectObjectsOnActiveArtboard();
// 	// app.executeMenuCommand ('selectallinartboard');

//     // Check if anything is selected:
//     if (selection.length > 0) 
//     {
//         for (j = 0; j < selection.length; j++) 
//         {
//             selection[j].resize (scale*100, scale*100, true, true, true, true, scale*100, Transformation.DOCUMENTORIGIN);
//         }
//     }

// 		var scaledArtboardRect = newRect(-abProps.width/2  * scale, -abProps.height/2  * scale, abProps.width * scale,abProps.height * scale);
// 		activeDoc.artboards[i].artboardRect = scaledArtboardRect;    
// }
// activeDoc.rulerOrigin = originalOrigin;

// // Artboard bounds helper (used above):
// function getArtboardBounds(artboard) {
 
//   var bounds = artboard.artboardRect,
 
//       left   = bounds[0],
//       top    = bounds[1],
//       right  = bounds[2],
//       bottom = bounds[3],
 
//       width  = right - left,
//       height = top - bottom,
 
//       props  = {
//         left   : left,
//         top    : top,
//         width  : width,
//         height : height
//       };
 
//   return props;
// }
 
// function findRequiredScale(props) {
//     var scale = Math.min(requiredABsize / props.height, requiredABsize / props.width);
//     if (scale >1)
//     return scale;
//     else
//     return 1;
// }

// function newRect(x, y, width, height) 
// {
//     var l = 0;
//     var t = 1;
//     var r = 2;
//     var b = 3;
 
//     var rect = [];
 
//     rect[l] = x;
//     rect[t] = -y;
//     rect[r] = width + x;
//     rect[b] = -(height - rect[t]);
 
//     return rect;
// };





var idoc = app.activeDocument;

var abs = idoc.artboards;

for (var a=abs.length-1; a>=0; a--) {

    idoc.selection = null;

    thisBoard = abs;

    idoc.artboards.setActiveArtboardIndex (a); // activate each artboard

    idoc.selectObjectsOnActiveArtboard(); // select all in artboard

    if(!idoc.selection.length) {

        thisBoard.remove(); //Delete artboard if it is empty,

        } else {

        idoc.fitArtboardToSelectedArt(a); // fit artboard to selection

    }

}

idoc.selection = null;

idoc.rearrangeArtboards();