// reverseArtboardsOrder.jsx
// carlos canto
// http://graphicdesign.stackexchange.com/questions/64865/is-there-a-way-to-automate-reversing-the-order-of-artboards-in-illustrator

function reverseArboardsOrder () {
    var idoc = app.activeDocument;
    var abs = idoc.artboards;
    var abcount = abs.length; 

    var abNames = [];    
    var abRects = [];

    for (i=0; i<abcount; i++) {
        abNames[i] = abs[i].name; 
        abRects[i] = abs[i].artboardRect;
    }

    for (j=0, k=abcount-1; j<abcount; j++, k--) {
        var abRect = abRects[k]; 
        idoc.artboards.remove(k); 
        var newab = idoc.artboards.add(abRect);
        newab.name = abNames[k]; 
    }
    idoc.rearrangeArtboards();
}

reverseArboardsOrder();