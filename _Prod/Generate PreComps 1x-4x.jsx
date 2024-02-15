var mySelection = app.project.selection;
app.beginUndoGroup("scaleSelectedComps.jsx");
for (var i = 0; i < mySelection.length; i++) {
  if (mySelection[i] instanceof CompItem) {
    var compName = mySelection[i].name + " @1x";
    compName = compName.substring(0, 31);
    var W = Math.round(mySelection[i].width * 1);
    var H = Math.round(mySelection[i].height * 1);
    var pixAsp = mySelection[i].pixelAspect;
    var Dur = mySelection[i].duration;
    var frRate = mySelection[i].frameRate;
    var resizedComp = app.project.items.addComp(compName, W, H, pixAsp, Dur, frRate);
    var myLayer = resizedComp.layers.add(mySelection[i]);
    var percent =  100
    myLayer.scale.setValue([percent, percent]);
  }
    }
  for (var i = 0; i < mySelection.length; i++) {
    if (mySelection[i] instanceof CompItem) {
      var compName = mySelection[i].name + " @1.5x";
      compName = compName.substring(0, 31);
      var W = Math.round(mySelection[i].width * 1.5);
      var H = Math.round(mySelection[i].height * 1.5);
      var pixAsp = mySelection[i].pixelAspect;
      var Dur = mySelection[i].duration;
      var frRate = mySelection[i].frameRate;
      var resizedComp = app.project.items.addComp(compName, W, H, pixAsp, Dur, frRate);
      var myLayer = resizedComp.layers.add(mySelection[i]);
      var percent =  150
      myLayer.scale.setValue([percent, percent]);
    }
      }
    for (var i = 0; i < mySelection.length; i++) {
      if (mySelection[i] instanceof CompItem) {
        var compName = mySelection[i].name + " @2x";
        compName = compName.substring(0, 31);
        var W = Math.round(mySelection[i].width * 2);
        var H = Math.round(mySelection[i].height * 2);
        var pixAsp = mySelection[i].pixelAspect;
        var Dur = mySelection[i].duration;
        var frRate = mySelection[i].frameRate;
        var resizedComp = app.project.items.addComp(compName, W, H, pixAsp, Dur, frRate);
        var myLayer = resizedComp.layers.add(mySelection[i]);
        var percent =  200
        myLayer.scale.setValue([percent, percent]);
      }
        }
    for (var i = 0; i < mySelection.length; i++) {
      if (mySelection[i] instanceof CompItem) {
        var compName = mySelection[i].name + " @3x";
        compName = compName.substring(0, 31);
        var W = Math.round(mySelection[i].width * 3);
        var H = Math.round(mySelection[i].height * 3);
        var pixAsp = mySelection[i].pixelAspect;
        var Dur = mySelection[i].duration;
        var frRate = mySelection[i].frameRate;
        var resizedComp = app.project.items.addComp(compName, W, H, pixAsp, Dur, frRate);
        var myLayer = resizedComp.layers.add(mySelection[i]);
        var percent =  300
        myLayer.scale.setValue([percent, percent]);
      }
        }
    for (var i = 0; i < mySelection.length; i++) {
      if (mySelection[i] instanceof CompItem) {
        var compName = mySelection[i].name + " @4x";
        compName = compName.substring(0, 31);
        var W = Math.round(mySelection[i].width * 4);
        var H = Math.round(mySelection[i].height * 4);
        var pixAsp = mySelection[i].pixelAspect;
        var Dur = mySelection[i].duration;
        var frRate = mySelection[i].frameRate;
        var resizedComp = app.project.items.addComp(compName, W, H, pixAsp, Dur, frRate);
        var myLayer = resizedComp.layers.add(mySelection[i]);
        var percent =  400
        myLayer.scale.setValue([percent, percent]);
      }
        }
app.endUndoGroup();
