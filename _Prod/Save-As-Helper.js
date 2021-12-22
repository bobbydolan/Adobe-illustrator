// Save-As-Prompt
var doc = app.activeDocument;

var original_file = doc.fullName; // we need this to return to original file

var arr = doc.name.split(".");

var extension = "";

if (arr.length > 1) extension = "." + arr.pop();

creationDate = prompt("Date: ", "MMDD");
prodTeam = prompt("File Name: ", "Name");

var filename = creationDate + '-' + prodTeam ;

var name_ai = filename + '.ai';

// This saves directly to ~/Desktop
// var export_folder = "/Users/bobbydolan/Desktop/_Parse/Pictures-Review/"; // define the place where to save the copy

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
