#target Illustrator

function createSwatchGroupFromCSV() {
    var valid = true; // Flag for validation
    var docRef = app.activeDocument;
    var swatches = docRef.swatches;
    var swatchGroups = docRef.swatchGroups;
    var destSwatchGroup; // Swatch group to be created
    var csvFileRegex = /\.csv$/i;
    var csvRows; // Array of CSV rows

    // Function to show a message to the user
    function saySomething(msg) {
        alert("Script message:\n" + msg);
    }

    // Function to get the CSV file from the user
    function getCSV() {
        var userSelection = File.openDialog("Select a CSV File", function (f) {
            return f instanceof Folder || csvFileRegex.test(f);
        });

        if (!userSelection) {
            saySomething("No CSV file selected. Aborting.");
            valid = false;
        }
        return userSelection;
    }

    // Function to read the contents of the CSV file
    function readCSV(file) {
        file.open("r");
        var csvContents = file.read();
        file.close();

        if (csvContents === "") {
            saySomething("CSV file is blank.");
            valid = false;
            return;
        }

        csvRows = csvContents.replace(/["']/g, "").split("\n");
    }

    // Function to process the CSV file and create swatches
    function processCSV() {
        destSwatchGroup = swatchGroups.add();
        destSwatchGroup.name = csvFile.name;

        for (var r = 1, len = csvRows.length; r < len && valid; r++) {
            processRow(csvRows[r]);
        }
    }

    // Function to process each row of the CSV
    function processRow(row) {
        if (!row) return;

        var columns = row.indexOf(",") > -1 ? row.split(",") : row.split(";");
        var props = {
            name: columns[0],
            r: parseFloat(columns[1]),
            g: parseFloat(columns[2]),
            b: parseFloat(columns[3])
        };

        createSwatch(props);
    }

    // Function to create a swatch from properties
    function createSwatch(props) {
        var rgbColor = new RGBColor();
        rgbColor.red = props.r;
        rgbColor.green = props.g;
        rgbColor.blue = props.b;

        var newSwatch = swatches.add();
        newSwatch.name = props.name;
        newSwatch.color = rgbColor;

        destSwatchGroup.addSwatch(newSwatch);
    }

    var csvFile = getCSV();

    if (valid) {
        readCSV(csvFile);
    }

    if (valid) {
        processCSV();
    }

    if (valid) {
        saySomething("Success!");
    }
}

createSwatchGroupFromCSV();
