var doc = app.activeDocument;

var original_file = doc.fullName; // we need this to return to original file

var arr = doc.name.split(".");

var extension = "";

if (arr.length > 1) extension = "." + arr.pop();

creationDate = prompt("Date: ", "MonthDay");
prodTeam = prompt("Product Team: ", "Team");
projectName = prompt("Project Name: ", "Project");
// SurfaceName = prompt("Surface/Deliverable Name: ", "");
artistCreator = prompt("Artist Name: ", "Artist");
versionNumber = prompt("Artist Name: ", "Version");

var filename = creationDate + '-' + prodTeam + '-' + projectName + '-' + artistCreator + '-' + versionNumber;

// var aiSuff = '-Local.ai'; // put in any extension you like but keep suffix .ai

var name_ai = filename + '.ai';

var export_folder = "~/Desktop"; // define the place where to save the copy

saveCopyAsAI(name_ai);

function saveCopyAsAI(nameAI) {

    var packaged_file = null;

    packaged_file = File(export_folder + "/" + nameAI);

    var save_options = new IllustratorSaveOptions();

    save_options.embedICCProfile = true;

    save_options.pdfCompatible = false

    doc.saveAs(packaged_file, save_options);

    alert('File Saved to ~/Desktop');

}



// CreationDate = prompt("Date: ", "MonthDay");
// ProdTeam = prompt("Product Team: ", "");
// ProjectName = prompt("Project Name: ", "");
// SurfaceName = prompt("Surface/Deliverable Name: ", "");
// ArtistCreator = prompt("Artist Name: ", "First name Last initial");
// VersionNumber = prompt("Artist Name: ", "eg V1 V2 Final");

// var filelName = doc.name;
// var finalName = fileName(CreationDate + "-" + ProdTeam + "-" + ProjectName + "-" + SurfaceName + "-" + ArtistCreator + "-" + VersionNumber);