var zoomLevel = prompt("Percentage:", "100");

if ( zoomLevel ) {
    zoomLevel = zoomLevel / 100;
    app.executeMenuCommand("fitin"); // Centers the artboard to the window
    app.activeDocument.activeView.zoom = zoomLevel;
}