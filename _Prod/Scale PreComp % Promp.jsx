var percent = prompt("Resize factor (percentage):", "50");
var mySelection = app.project.selection;
app.beginUndoGroup("scaleSelectedComps.jsx");
for (var i = 0; i < mySelection.length; i++) {
  if (mySelection[i] instanceof CompItem) {
    var compName = mySelection[i].name + " resized";
    compName = compName.substring(0, 31);
    var W = Math.round(mySelection[i].width * percent / 100);
    var H = Math.round(mySelection[i].height * percent / 100);
    var pixAsp = mySelection[i].pixelAspect;
    var Dur = mySelection[i].duration;
    var frRate = mySelection[i].frameRate;
    var resizedComp = app.project.items.addComp(compName, W, H, pixAsp, Dur, frRate);
    var myLayer = resizedComp.layers.add(mySelection[i]);
    myLayer.scale.setValue([percent, percent]);
  }
}
app.endUndoGroup();
