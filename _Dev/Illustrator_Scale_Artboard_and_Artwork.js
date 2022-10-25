#target Illustrator
/*
 Revision-1
 Author: Shivendra Agarwal
 Year: 2017
 Title: Script to scale-up artwork and artboard above 15 Mpixel
*/

if ( app.documents.length > 0 ) 
alert("ERROR: \n Close all documents before running this script." );

requiredABarea = prompt( 'Enter a minimum desired artboard area in pixels.', '15000000', 'Select artboard area');
dir = Folder.selectDialog("Select root folder containing Illustrator assets.");	
// If dir variable return null, user most likely canceled the dialog or
// the input folder and it subfolders don't contain any .ai files.
if ( dir != null ) 
{
	// returns an array of file paths in the selected folder.
	files = GetFiles( dir );
	alert ('Total ' + files.length + ' files (AI/EPS) will be processed.', 'Alert');
	for (var f = 0; f< files.length; f++)
	{
		var doc = app.open(files[f]);
		resizeArtboardAndArwork();
		doc.close(SaveOptions.SAVECHANGES);
	}
}

function resizeArtboardAndArwork()
{
	activeDoc = app.activeDocument;
	if (activeDoc.artboards.length > 1)
		alert ('Script is not designed for multiple artboard. \nWorking on active artboard.', 'Alert');
	abActive   = activeDoc.artboards[ activeDoc.artboards.getActiveArtboardIndex() ];
	
	//activeDoc.fitArtboardToSelectedArt(activeDoc.artboards.getActiveArtboardIndex());
	
	var abProps    = getArtboardBounds(abActive);
	scale	   = findRequiredScale(abProps);
	abXoffset = -1* (abProps.left + abProps.width/2);
	abYoffset = -1* (abProps.top - abProps.height/2);
	
	if (scale  > 1)
	{	
		// select all items
		var items = activeDoc.pageItems;
		for(var i = 0;i < items.length;i++)
		{
			items[i].selected = true;
		}
		
		var selection = activeDoc.selection;
		
		// Translate artwork to bring artboard-center at document center, and then apply scale.
		if (selection.length > 0) 
		{
			for (i = 0; i < selection.length; i++) 
			{
				selection[i].translate (abXoffset, abYoffset, true, true, true, true);
				selection[i].resize (scale*100, scale*100, true, true, true, true, scale*100, Transformation.DOCUMENTORIGIN);
			}
		} 
		

		var scaledArtboardRect = newRect(-abProps.width/2  * scale, -abProps.height/2  * scale, abProps.width * scale,abProps.height * scale);
		var newAB = activeDoc.artboards.add(scaledArtboardRect);
		abActive.remove();
		//activeDoc.fitArtboardToSelectedArt(activeDoc.artboards.getActiveArtboardIndex());
		app.executeMenuCommand("fitall");
	}
}


function findRequiredScale(props) 
{
	requiredABarea = 15000000; //px
	currentABarea = props.width * props.height;
	scale = (Math.sqrt(requiredABarea/ currentABarea));
	
	if (scale >1)
	return scale;
	else
	return 1;
}

// Artboard bounds helper (used above):
function getArtboardBounds(artboard) {

  var bounds = artboard.artboardRect,

      left   = bounds[0],
      top    = bounds[1],
      right  = bounds[2],
      bottom = bounds[3],

      width  = right - left,
      height = top - bottom,

      props  = {
        left   : left,
        top    : top,
        width  : width,
        height : height
      };

  return props;
}

function newRect(x, y, width, height) 
{
    var l = 0;
    var t = 1;
    var r = 2;
    var b = 3;
 
    var rect = [];
 
    rect[l] = x;
    rect[t] = -y;
    rect[r] = width + x;
    rect[b] = -(height - rect[t]);
 
    return rect;
};

function GetFiles( folder ) 
{
	var i, item,
		// Array to store the files in...
		files = [],
		// Get files...
		items = folder.getFiles();

	// Loop through all files in the given folder
	for ( i = 0; i < items.length; i++ ) 
	{
		item = items[i];
		// Find .ai files
		var aifileformat = item.name.match(/\.ai$/i);
		var epsfileformat = item.name.match(/\.eps$/i);
		// If item is a folder, check the folder for files.
		if ( item instanceof Folder ) 
		{
			// Combine existing array with files found in the folder
			files = files.concat( GetFiles( item ) );
		}
		// If the item is a file, push it to the array.
		else if ( item instanceof File && (epsfileformat || aifileformat) ) 
		{
			// Push files to the array
			files.push( item );
		}
	}
	return files;
}