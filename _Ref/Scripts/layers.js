var main = function(layerCount) {

var doc, layers;

if (!app.documents.length) {

alert("This scripts needs an open document !");

return;

}

//The doc

doc = app.activeDocument;

//Adding useful layers

addLayers ( doc );

//Moving items onto specific layers

moveItems ( doc );

}

var moveItems = function ( doc ) {

var items = doc.pageItems, item, n = items.length, sc, tn, sn, 

layers = getLayersDB(doc),

cutLayer = layers['Thru-cut'],

creaseLayer = layers.Crease,

bleedLayer = layers['Bleed / Grafika'];

while ( n-- ) {

item = items;

sc = item.strokeColor;

tn = sc.typename;

if ( tn =="SpotColor" ) {

sn = sc.spot.name;

if ( sn=="Cut") {

item.move(cutLayer, ElementPlacement.PLACEATBEGINNING);

}

else if ( /^(Reverse )?Crease$/i.test( sn ) ){

item.move(creaseLayer, ElementPlacement.PLACEATBEGINNING);

}

else if ( sn=="Outside Bleed") {

item.move(bleedLayer, ElementPlacement.PLACEATBEGINNING);

}

}

}

}

var addLayers = function ( doc ) {

var layers = getLayersDB ( doc );

var layerNames = [

'Bleed / Grafika',

'Crease',

'Thru-cut'

],

name;

while ( name = layerNames.pop() )  !layers[name]  && addLayer ( doc, name );

};

var addLayer = function ( doc, name ) {

doc.layers.add().name = name;

}

var getLayersDB = function ( doc ) {

var db = {}, layers = doc.layers, n = layers.length, layer;

while ( n-- ) {

layer = layers;

db[layer.name] = layer;

}

return db;

}

main();