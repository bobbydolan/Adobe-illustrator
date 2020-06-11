// Generated by CoffeeScript 1.11.1
#target "Illustrator";
var LayerExporter, layerExporter, unlockAllLayers;

LayerExporter = (function() {
  function LayerExporter() {
    app.pasteRemembersLayers = true;
    app.activeDocument.selection = null;
    unlockAllLayers(app.activeDocument.layers);
    this.exportLayers(app.activeDocument);
  }

  LayerExporter.prototype.exportLayers = function(root) {
    var doc, file, i, layer, len, ref, results;
    ref = root.layers;
    results = [];
    for (i = 0, len = ref.length; i < len; i++) {
      layer = ref[i];
      layer.hasSelectedArtwork = true;
      app.copy();
      file = new File("~/Desktop/" + layer.name + ".ai");
      doc = app.documents.add(DocumentColorSpace.RGB, 1920, 1080);
      app.executeMenuCommand("pasteInPlace");
      app.pasteRememberLayers = true;
      doc.saveAs(file);
      doc.close(SaveOptions.DONOTSAVECHANGES);
      results.push(app.activeDocument.selection = null);
    }
    return results;
  };

  return LayerExporter;

})();

unlockAllLayers = function(parent) {
  var i, layer, len, results;
  results = [];
  for (i = 0, len = parent.length; i < len; i++) {
    layer = parent[i];
    layer.locked = false;
    layer.visible = true;
    results.push(unlockAllLayers(layer.layers));
  }
  return results;
};

layerExporter = new LayerExporter();