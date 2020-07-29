/*
Script to Export Illustrator files as PNG's then make a thumbnail.

Runs in CS5 only

Overdocumented so that I know what the heck is going on if I have to look at it again.
*/
 
//Disable Alerts.  We want this to be as unobtrusive as possible.
app.userInteractionLevel = UserInteractionLevel.DONTDISPLAYALERTS;

var repeat = true;

//Main loop
while(repeat){
	main();
	repeatDlg();
}

//DialogBox for repeat
function repeatDlg()
{
	// Create a window of type palette.
	var dlg = new Window("dialog", "Do you want to run this script again?"); 
	dlg.frameLocation = [500,500];
	
	// Add a frame for the contents.
	dlg.btnPanel = dlg.add("panel", [25,15,255,130], "");
	// Add the components, two buttons
	dlg.btnPanel.yesBtn = dlg.btnPanel.add("button", [15,65,105,85], "Yes");
	dlg.btnPanel.noBtn = dlg.btnPanel.add("button", [120, 65, 210, 85], "No");
	// Register event listeners that define the button behavior
	dlg.btnPanel.yesBtn.onClick = function() {
		$.writeln("Yes pressed");
		dlg.close();
	};
	dlg.btnPanel.noBtn.onClick = function() {
		$.writeln("No pressed");
		repeat = false;
		dlg.close();
	};

	// Display the window
	dlg.show();
		
	return true;
		
}

function main() {
	var destFolder, srcFolder, files, fileType, sourceDoc, targetFile, pngExportOpts;
	// Prompt for source folder
	srcFolder = Folder.selectDialog( 'Select the folder with Illustrator files you want to convert to PNG', '~/Desktop/' );
	
	// If a valid folder is selected
	if ( srcFolder != null )
	{
		files = new Array();
    
		// Get all .ai files
		files = Folder(srcFolder).getFiles ('*.ai');
    
		//Make sure that the folder isn't empty
		if ( files.length > 0 )
		{
			//Loop through all files
			for ( i = 0; i < files.length; i++ )
			{
				//Grab the current doc
				sourceDoc = app.open(files[i]);
				docName = sourceDoc.name;

				sourceDoc.selection = null; // deselect everything
				sourceDoc.artboards.setActiveArtboardIndex (0); // activate the artboard.
				sourceDoc.selectObjectsOnActiveArtboard(); // select all in artboard
				sel = sourceDoc.selection[0]; // Get selection
                                var gB = sel.geometricBounds;
				var vB = sel.visibleBounds;
				//sourceDoc.fitArtboardToSelectedArt(0); //Resize artboard to the art.

                                sourceDoc.artboards[0].artboardRect = [gB[0] -15, gB[1] +15, gB[2] +15, gB[3] -15];
  
				// Call function getNewName to get the name and file to save the pdf
				targetFile = getNewName(docName, srcFolder, 300);
            
				// Call function getPNGOptions get the PNGExportOptions for the files
				pngExportOpts = getPNGOptions();
            
				// Export as PNG
				app.activeDocument.exportFile( targetFile, ExportType.PNG24, pngExportOpts );
				
				//Close document
				sourceDoc.close(SaveOptions.DONOTSAVECHANGES);
				
				//Fire up photoshop for creating thumbnail image
				btMessaging(targetFile, getNewName(docName, srcFolder, 145));
			
			}

		}
		else
		{
			alert( 'No matching files found' );
		}
	}

}

//Function to be executed in Photoshop for resizing. Comments in this function mess up the BridgeTalk message.
function createThumb(file, saveFile)
{
	psDoc = app.open(file);
	
	if(psDoc.height > psDoc.width) {
		psDoc.resizeImage(null,UnitValue(145,'px'),null,ResampleMethod.BICUBIC);
	}
	else {
		psDoc.resizeImage(UnitValue(145,'px'),null,null,ResampleMethod.BICUBIC);
	}
	var pngOpts = new ExportOptionsSaveForWeb;
	pngOpts.format = SaveDocumentType.PNG;
	pngOpts.PNG8 = false;
	pngOpts.transparency = true;
	pngOpts.quality = 100;
	
	activeDocument.exportDocument(saveFile, ExportType.SAVEFORWEB,pngOpts);
	
	psDoc.close(SaveOptions.DONOTSAVECHANGES);
}
 
 //BridgeTalk function
 function btMessaging(file, savepath) {
	//Create BridgeTalk message
	var bt = new BridgeTalk();
	bt.target = 'photoshop-12.032';
	bt.body = createThumb.toSource() + "(" + file.toSource()+ ","+savepath.toSource()+");";
	bt.onError = function( btObj ){};
	bt.onResult = function( inBT ){};
	bt.send(30);
}

//Function to create the new file name. 
function getNewName(doc, dstFolder, size)
{
    var ext, docName, newName, saveInFile, docName;
    docName = doc;
    ext = '.png'; // new extension for png file
    newName = "";
        
    for ( var i = 0 ; docName[i] != "." ; i++ ){
        newName += docName[i];
    }
	//If  -[Converted] shows up remove it.
    newName = newName.replace (/.\[Converted\]/g, "");

    newName += ext; // full png name of the file
    
	//Destination folder, with image size dir
	dstFolder = dstFolder +'/'+size+'px/';
	
	//If Folder isn't there create it
	if(!Folder(dstFolder).exists){
		Folder(dstFolder).create();
	}
	
    // Create a file object to save the png
    saveInFile = new File( dstFolder + newName );
 
    return saveInFile;
}
 
//Function setting PNG options for Illustrator 
function getPNGOptions() {
	
    // Create the PDFSaveOptions object to set the PDF options
    var pngExportOpts = new ExportOptionsPNG24();
 
    pngExportOpts.antiAliasing = true;
    pngExportOpts.artBoardClipping = true;
    pngExportOpts.horizontalScale = 100.0;
    pngExportOpts.transparency = true;
    pngExportOpts.verticalScale = 100.0;
 
    return pngExportOpts;
}