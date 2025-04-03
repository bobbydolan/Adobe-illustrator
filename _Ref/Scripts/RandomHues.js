var doc=app.activeDocument;
var s=doc.selection; 
var t=s;
var leng=s.length;
var sColour=doc.swatches.getSelected(); 
var xRed=sColour[1].color.red-sColour[0].color.red;   
var xGreen=sColour[1].color.green-sColour[0].color.green; 
var xBlue=sColour[1].color.blue-sColour[0].color.blue; 

for(var i=0;i< leng;i++){
    var newRGBColor = new RGBColor();
     var k =i*(xRed/leng);
     var j =i*(xGreen/leng);
     var l=i*(xBlue/leng);
        var r = Math.round (sColour[0].color.red+k);   
        var g = Math.round (sColour[0].color.green+j);  
        var b = Math.round (sColour[0].color.blue+l);  

        if(r<0){
            r=0;
            }
        if (r>255){
            r=255;
            }
    
        if(g<0){
            g=0;
            }
        if (g>255){
            g=255;
            }
        
        if(b<0){
            b=0;
            }
        if (b>255){
            b=255;
            }
        newRGBColor.red = r;   

        newRGBColor.green = g;  

        newRGBColor.blue =b;    

   
    
                   
        
 var x=Math.abs(Math.round (Math.random()*t.length)-1);

t[x].fillColor =newRGBColor;         
t.splice(x,1);
//alert(r);
    }

 