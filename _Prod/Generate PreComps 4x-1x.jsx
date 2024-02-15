var mySelection = app.project.selection;
app.beginUndoGroup("scaleSelectedComps.jsx");
for (var i = 0; i < mySelection.length; i++) {
  if (mySelection[i] instanceof CompItem) {
    var compName = mySelection[i].name + " @1x";
    compName = compName.substring(0, 31);
    var W = Math.round(mySelection[i].width * 25 / 100);
    var H = Math.round(mySelection[i].height * 25 / 100);
    var pixAsp = mySelection[i].pixelAspect;
    var Dur = mySelection[i].duration;
    var frRate = mySelection[i].frameRate;
    var resizedComp = app.project.items.addComp(compName, W, H, pixAsp, Dur, frRate);
    var myLayer = resizedComp.layers.add(mySelection[i]);
    var percent =  25
    myLayer.scale.setValue([percent, percent]);
  }
    }
  for (var i = 0; i < mySelection.length; i++) {
    if (mySelection[i] instanceof CompItem) {
      var compName = mySelection[i].name + " @1.5x";
      compName = compName.substring(0, 31);
      var W = Math.round(mySelection[i].width * 37.5 / 100);
      var H = Math.round(mySelection[i].height * 37.5 / 100);
      var pixAsp = mySelection[i].pixelAspect;
      var Dur = mySelection[i].duration;
      var frRate = mySelection[i].frameRate;
      var resizedComp = app.project.items.addComp(compName, W, H, pixAsp, Dur, frRate);
      var myLayer = resizedComp.layers.add(mySelection[i]);
      var percent =  37.5
      myLayer.scale.setValue([percent, percent]);
    }
      }
    for (var i = 0; i < mySelection.length; i++) {
      if (mySelection[i] instanceof CompItem) {
        var compName = mySelection[i].name + " @2x";
        compName = compName.substring(0, 31);
        var W = Math.round(mySelection[i].width * 50 / 100);
        var H = Math.round(mySelection[i].height * 50 / 100);
        var pixAsp = mySelection[i].pixelAspect;
        var Dur = mySelection[i].duration;
        var frRate = mySelection[i].frameRate;
        var resizedComp = app.project.items.addComp(compName, W, H, pixAsp, Dur, frRate);
        var myLayer = resizedComp.layers.add(mySelection[i]);
        var percent =  50
        myLayer.scale.setValue([percent, percent]);
      }
        }
    for (var i = 0; i < mySelection.length; i++) {
      if (mySelection[i] instanceof CompItem) {
        var compName = mySelection[i].name + " @3x";
        compName = compName.substring(0, 31);
        var W = Math.round(mySelection[i].width * 75 / 100);
        var H = Math.round(mySelection[i].height * 75 / 100);
        var pixAsp = mySelection[i].pixelAspect;
        var Dur = mySelection[i].duration;
        var frRate = mySelection[i].frameRate;
        var resizedComp = app.project.items.addComp(compName, W, H, pixAsp, Dur, frRate);
        var myLayer = resizedComp.layers.add(mySelection[i]);
        var percent =  75
        myLayer.scale.setValue([percent, percent]);
      }
        }
    for (var i = 0; i < mySelection.length; i++) {
      if (mySelection[i] instanceof CompItem) {
        var compName = mySelection[i].name + " @4x";
        compName = compName.substring(0, 31);
        var W = Math.round(mySelection[i].width * 100 / 100);
        var H = Math.round(mySelection[i].height * 100 / 100);
        var pixAsp = mySelection[i].pixelAspect;
        var Dur = mySelection[i].duration;
        var frRate = mySelection[i].frameRate;
        var resizedComp = app.project.items.addComp(compName, W, H, pixAsp, Dur, frRate);
        var myLayer = resizedComp.layers.add(mySelection[i]);
        var percent =  100
        myLayer.scale.setValue([percent, percent]);
      }
        }
app.endUndoGroup();
