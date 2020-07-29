var docRef=activeDocument;
var layerCount=docRef.layers.length;
alert(layerCount +" Top Level Layer(s)");
for(i=layerCount-1;i>=0;i--){
	var currLayer=docRef.layers[i];
	if(currLayer.layers.length>0){
		for(j=currLayer.layers.length-1;j>=0;j--){
	currLayer.layers[j].move(currLayer,ElementPlacement.PLACEAFTER);
	}
	}
	}