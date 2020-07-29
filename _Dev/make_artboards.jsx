function make_artboards(){  
    // written by Qwertyfly  
    // this may not work as expected if art contains Clipping paths  
    if(app.documents.length==0){return;}  
    var doc = app.activeDocument;  
    var grps = doc.pageItems;  
    var abs = doc.artboards;  
    var c = 0;  
    for(var i=0; i<grps.length; i++){  
        if(grps[i].parent.typename == "Layer"){  
            c++  
        }  
    }  
    if(c<=100){  
        for(var i=1; i<abs.length; i++){  
            abs[i].remove();  
        }  
        for(var i=0; i<grps.length; i++){  
            if(grps[i].parent.typename == "Layer"){  
                //this one needs an artboard  
                var box = grps[i].visibleBounds;  
                // this line is just to give the artboard some white space around the art  
                box[0] = box[0]-10; box[1] = box[1]+10; box[2] = box[2]+10; box[3] = box[3]-10;  
                var AB = doc.artboards.add(box);  
                if(!i){abs[0].remove();}  
            }  
        }  
    }else{  
        alert(c + " is too many items, max of 100 artboards per document");  
    }  
}  
make_artboards();  