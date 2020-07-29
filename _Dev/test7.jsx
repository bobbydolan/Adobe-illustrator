
#target illustrator  
var destFolder, sourceFolder, files, fileType, sourceDoc, targetFile, pngExportOpts;  
  
// Select the source folder.  
sourceFolder = Folder.selectDialog( 'Select the folder with all files that have to be converted to a PNG', '~' );  
  
// If the folder is selected, then ....  
if ( sourceFolder != null )  
{  
    files = new Array();  
    fileType = prompt( 'Which type of files would you like to convert to PNG? Example how to input: *.ai', ' ' );  
     
    // check if all files have the right extension like described above.  
    files = sourceFolder.getFiles( fileType );  
     
    if ( files.length > 0 )  
    {  
        // select the destination folder where the png files have to be saved  
        destFolder = Folder.selectDialog( 'Select the folder where the converted PNG files have to be saved.', '~' );  
        for ( i = 0; i < files.length; i++ )  
        {  
            sourceDoc = app.open(files[i]); // returns the document object  
                                     
            // Call function getNewName to get the name and file to save the pdf  
            targetFile = getNewName();  
             
            // Call function getPNGOptions get the PNGExportOptions for the files  
            pngExportOpts = getPNGOptions();  
             
            // Export as PNG  
            sourceDoc.exportFile( targetFile, ExportType.PNG24, pngExportOpts );  
             
            sourceDoc.close(SaveOptions.DONOTSAVECHANGES);  
        }  
        alert( 'The converted PNG files are saved in following folder: ' + destFolder );  
    }  
    else  
    {  
        alert( 'No files founded!' );  
    }  
}  
  
/********************************************************* 
getNewName: Function to get the new file name. The primary 
name is the same as the source file. 
Functie om de nieuwe filenaam te genereren. De oorspronkelijke naam wordt gebruikt (zonder extensie) 
**********************************************************/  
function getNewName()  
{  
    var ext, docName, newName, saveInFile, docName;  
    docName = sourceDoc.name;  
    ext = '.png'; // new extension for PNG  
    newName = "";  
         
    for ( var i = 0 ; docName[i] != "." ; i++ )  
    {  
        newName += docName[i];  
    }  
    newName += ext; // full name of the new file including the png extension  
     
    // create the new file with the corrected extension  
    saveInFile = new File( destFolder + '/' + newName );  
  
    return saveInFile;  
}  
  
/********************************************************* 
getPNGOptions: Function to set the PNG saving options of the 
files using the PDFSaveOptions object. 
Hier worden de PNG opties beschreven (= als je een opslaan als selecteert, welke opties je aanvinkt en uitvinkt. 
**********************************************************/  
function getPNGOptions()  
{  
     
    // Hier worden de PNG opties beschreven (= als je een opslaan als selecteert, welke opties je aanvinkt en uitvinkt.  
    var pngExportOpts = new ExportOptionsPNG24();  
     
    // Setting PNGExportOptions properties. Please see the JavaScript Reference  
    // for a description of these properties.  
    // Add more properties here if you like  
    pngExportOpts.antiAliasing = true;  
    pngExportOpts.artBoardClipping = false;  
    pngExportOpts.horizontalScale = 2000;  
    //pngExportOpts.matte = true;  
    //pngExportOpts.matteColor = 0, 0, 0;  
    pngExportOpts.saveAsHTML = false;  
    pngExportOpts.transparency = true;  
    pngExportOpts.verticalScale = 2000;  
  
    return pngExportOpts;  
}  