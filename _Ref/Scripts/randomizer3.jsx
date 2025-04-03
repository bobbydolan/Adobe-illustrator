var doc=app.activeDocument;
var s=doc.selection;  

///////////////////////////////////////////////////////////////////////////////////////////////////WIDOW/////////////////////////////////////////////////////////////////////////////

var myWindow=new Window("dialog","Randomizer");
myWindow.orientation = "column";

//Scale X
    var scaleXGroup= myWindow.add("group");
    scaleXGroup.orientation = "column";
    var scaleXText=scaleXGroup.add("statictext", undefined, "Scale X");
        var scaleXGroup1=scaleXGroup.add("group");
        scaleXGroup1.orientation = "row";
        
        var scaleXGroupMin=scaleXGroup1.add("group");
        scaleXGroupMin.orientation = "column";
            var scaleXGroupMin1=scaleXGroupMin.add("group");
            scaleXGroupMin1.orientation = "row";
                var scaleXTextMin=scaleXGroupMin1.add("statictext", undefined, "Min");
                var scaleXMinValue = scaleXGroupMin1.add ('edittext {text: 100, characters: 3, justify: "right", active: true}'); 
            var scaleXMinSlider = scaleXGroupMin.add ('slider {minValue: 0, maxValue: 100, value: 100}');
        scaleXMinSlider.onChanging = function () {scaleXMinValue.text = scaleXMinSlider.value ;
                                                                        if(check1.value){
                                                                            scaleYMinValue.text = scaleXMinSlider.value;
                                                                            }else{  scaleYMinValue.text = scaleYMinSlider.value;}
                }
        scaleXMinValue.onChanging = function () {scaleXMinSlider.value = Number (scaleXMinValue.text) ;
                                                                     if(check1.value){
                                                                        scaleYMinSlider.value = Number (scaleXMinValue.text) ;
                                                                        }else{ scaleYMinSlider.value = Number (scaleYMinValue.text) ;} 
                }
        
        scaleXGroup1.add ("panel", [100,0,103,50]);
        
        var scaleXGroupMax=scaleXGroup1.add("group");
        scaleXGroupMax.orientation = "column";
            var scaleXGroupMax1=scaleXGroupMax.add("group");
            scaleXGroupMax1.orientation = "row";
                var scaleXTextMax=scaleXGroupMax1.add("statictext", undefined, "Max");
                var scaleXMaxValue = scaleXGroupMax1.add ('edittext {text: 100, characters: 3, justify: "right", active: true}'); 
            var scaleXMaxSlider = scaleXGroupMax.add ("slider", undefined, 100, 100, 1000);
        scaleXMaxSlider.onChanging = function () {scaleXMaxValue.text = scaleXMaxSlider.value;
                                                                             if(check1.value){
                                                                                scaleYMaxValue.text = scaleXMaxSlider.value;
                                                                                }else{  scaleYMaxValue.text = scaleYMaxSlider.value;}
                                                                        }
        scaleXMaxValue.onChanging = function () {scaleXMaxSlider.value = Number (scaleXMaxValue.text);
                                                                              if(check1.value){
                                                                                scaleYMaxSlider.value = Number (scaleXMaxValue.text) ;
                                                                                }else{ scaleYMaxSlider.value = Number (scaleYMaxValue.text) ;}
                                                                        }
        
        var check1 = myWindow.add ("checkbox", undefined, "uniform scale");
        
        myWindow.add ("panel", [0,20,250,23]);
        
 //Scale Y
    var scaleYGroup= myWindow.add("group");
    scaleYGroup.orientation = "column";
    var scaleYText=scaleYGroup.add("statictext", undefined, "Scale Y");
        var scaleYGroup1=scaleYGroup.add("group");
        scaleYGroup1.orientation = "row";
        
        var scaleYGroupMin=scaleYGroup1.add("group");
        scaleYGroupMin.orientation = "column";
            var scaleYGroupMin1=scaleYGroupMin.add("group");
            scaleYGroupMin1.orientation = "row";
                var scaleYTextMin=scaleYGroupMin1.add("statictext", undefined, "Min");
                var scaleYMinValue = scaleYGroupMin1.add ('edittext {text: 100, characters: 3, justify: "right", active: true}'); 
            var scaleYMinSlider = scaleYGroupMin.add ('slider {minValue: 0, maxValue: 100, value: 100}');
        scaleYMinSlider.onChanging = function () {   if(check1.value){
                scaleYMinValue.text = scaleXMinSlider.value;
                }else{  scaleYMinValue.text = scaleYMinSlider.value;}
          
            }
        scaleYMinValue.onChanging = function () {  if(check1.value){
                scaleYMinSlider.value = Number (scaleXMinValue.text) ;
                }else{ scaleYMinSlider.value = Number (scaleYMinValue.text) ;} }
        
        scaleYGroup1.add ("panel", [100,0,103,50]);
        
        var scaleYGroupMax=scaleYGroup1.add("group");
        scaleYGroupMax.orientation = "column";
            var scaleYGroupMax1=scaleYGroupMax.add("group");
            scaleYGroupMax1.orientation = "row";
                var scaleYTextMax=scaleYGroupMax1.add("statictext", undefined, "Max");
                var scaleYMaxValue = scaleYGroupMax1.add ('edittext {text: 100, characters: 3, justify: "right", active: true}'); 
            var scaleYMaxSlider = scaleYGroupMax.add ("slider", undefined, 100, 100, 1000);
        scaleYMaxSlider.onChanging = function () {
            if(check1.value){
                scaleYMaxValue.text = scaleXMaxSlider.value;
                }else{  scaleYMaxValue.text = scaleYMaxSlider.value;}
          
            }
        scaleYMaxValue.onChanging = function () {
            if(check1.value){
                scaleYMaxSlider.value = Number (scaleXMaxValue.text) ;
                }else{ scaleYMaxSlider.value = Number (scaleYMaxValue.text) ;}
           
            }       
        
        
      
        
        
        myWindow.add ("panel", [0,20,250,23]);
        myWindow.add ("panel", [-10,20,250,23]);

        
        
//Opacity
    var opacityGroup= myWindow.add("group");
    opacityGroup.orientation = "column";
    var opacityText=opacityGroup.add("statictext", undefined, "Opacity");
        var opacityGroup1=opacityGroup.add("group");
        opacityGroup1.orientation = "row";
        
        var opacityGroupMin=opacityGroup1.add("group");
        opacityGroupMin.orientation = "column";
            var opacityGroupMin1=opacityGroupMin.add("group");
            opacityGroupMin1.orientation = "row";
                var opacityTextMin=opacityGroupMin1.add("statictext", undefined, "Min");
                var opacityMinValue = opacityGroupMin1.add ('edittext {text: 100, characters: 3, justify: "right", active: true}'); 
            var opacityMinSlider = opacityGroupMin.add ('slider {minValue: 0, maxValue: 100, value: 100}');
        opacityMinSlider.onChanging = function () {opacityMinValue.text = opacityMinSlider.value }
        opacityMinValue.onChanging = function () {opacityMinSlider.value = Number (opacityMinValue.text) } 
        
        opacityGroup1.add ("panel", [100,0,103,50]);
        
        var opacityGroupMax=opacityGroup1.add("group");
        opacityGroupMax.orientation = "column";
            var opacityGroupMax1=opacityGroupMax.add("group");
            opacityGroupMax1.orientation = "row";
                var opacityTextMax=opacityGroupMax1.add("statictext", undefined, "Max");
                var opacityMaxValue = opacityGroupMax1.add ('edittext {text: 100, characters: 3, justify: "right", active: true}'); 
            var opacityMaxSlider = opacityGroupMax.add ("slider", undefined, 100, 0, 100);
        opacityMaxSlider.onChanging = function () {opacityMaxValue.text = opacityMaxSlider.value }
        opacityMaxValue.onChanging = function () {opacityMaxSlider.value = Number (opacityMaxValue.text) }       
        
        
        myWindow.add ("panel", [0,20,250,23]);
        myWindow.add ("panel", [-10,20,250,23]);

        
//Move X
    var moveXGroup= myWindow.add("group");
    moveXGroup.orientation = "column";
    var moveXText=moveXGroup.add("statictext", undefined, "Move X");
        var moveXGroup1=moveXGroup.add("group");
        moveXGroup1.orientation = "row";
        
        var moveXGroupMin=moveXGroup1.add("group");
        moveXGroupMin.orientation = "column";
            var moveXGroupMin1=moveXGroupMin.add("group");
           moveXGroupMin1.orientation = "row";
                var moveXTextMin=moveXGroupMin1.add("statictext", undefined, "Min");
                var moveXMinValue = moveXGroupMin1.add ('edittext {text: 0, characters: 3, justify: "right", active: true}'); 
            var moveXMinSlider = moveXGroupMin.add ("slider", undefined, 0, -1000, 0);
        moveXMinSlider.onChanging = function () {moveXMinValue.text = moveXMinSlider.value }
        moveXMinValue.onChanging = function () {moveXMinSlider.value = Number (moveXMinValue.text) }
        
        moveXGroup1.add ("panel", [100,0,103,50]);
        
        var moveXGroupMax=moveXGroup1.add("group");
        moveXGroupMax.orientation = "column";
            var moveXGroupMax1=moveXGroupMax.add("group");
            moveXGroupMax1.orientation = "row";
                var moveXTextMax=moveXGroupMax1.add("statictext", undefined, "Max");
                var moveXMaxValue = moveXGroupMax1.add ('edittext {text: 0, characters: 3, justify: "right", active: true}'); 
            var moveXMaxSlider = moveXGroupMax.add ("slider", undefined, 0, 0, 1000);
        moveXMaxSlider.onChanging = function () {moveXMaxValue.text = moveXMaxSlider.value }
        moveXMaxValue.onChanging = function () {moveXMaxSlider.value = Number (moveXMaxValue.text) }
        
        myWindow.add ("panel", [0,20,250,23]);
        
 //Move Y
    var moveYGroup= myWindow.add("group");
    moveYGroup.orientation = "column";
    var moveYText=moveYGroup.add("statictext", undefined, "Move Y");
        var moveYGroup1=moveYGroup.add("group");
        moveYGroup1.orientation = "row";
        
        var moveYGroupMin=moveYGroup1.add("group");
        moveYGroupMin.orientation = "column";
            var moveYGroupMin1=moveYGroupMin.add("group");
            moveYGroupMin1.orientation = "row";
                var moveYTextMin=moveYGroupMin1.add("statictext", undefined, "Min");
                var moveYMinValue = moveYGroupMin1.add ('edittext {text: 0, characters: 3, justify: "right", active: true}'); 
            var moveYMinSlider = moveYGroupMin.add ("slider", undefined, 0, -1000, 0);
        moveYMinSlider.onChanging = function () {moveYMinValue.text = moveYMinSlider.value }
        moveYMinValue.onChanging = function () {moveYMinSlider.value = Number (moveYMinValue.text) }
        
        moveYGroup1.add ("panel", [100,0,103,50]);
        
        var moveYGroupMax=moveYGroup1.add("group");
        moveYGroupMax.orientation = "column";
            var moveYGroupMax1=moveYGroupMax.add("group");
            moveYGroupMax1.orientation = "row";
                var moveYTextMax=moveYGroupMax1.add("statictext", undefined, "Max");
                var moveYMaxValue = moveYGroupMax1.add ('edittext {text: 0, characters: 3, justify: "right", active: true}'); 
            var moveYMaxSlider = moveYGroupMax.add ("slider", undefined, 0, 0, 1000);
        moveYMaxSlider.onChanging = function () {moveYMaxValue.text = moveYMaxSlider.value }
        moveYMaxValue.onChanging = function () {moveYMaxSlider.value = Number (moveYMaxValue.text) }       
        
        
        myWindow.add ("panel", [0,20,250,23]);
        myWindow.add ("panel", [-10,20,250,23]);

        
        
        var check2 = myWindow.add ("checkbox", undefined, "Random roteted");
        
        myWindow.add ("panel", [0,20,250,23]);
        myWindow.add ("panel", [-10,20,250,23]);

        
        
        var ok_button = myWindow.add ("button", undefined, "OK");
      ok_button.onClick = randimizeFunc;  
         
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////      
        


if(s.length<1){
    alert("No selected objects");
    } else{
       myWindow.show ();
       
        }
    
 ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
   function randimizeFunc(){
       myWindow.hide();
        
        var xScaleMin=scaleXMinSlider.value;
        var xScaleMax=scaleXMaxSlider.value;

        var yScaleMin=scaleYMinSlider.value;
        var yScaleMax=scaleYMaxSlider.value;
        
        var xMoveMin=moveXMinSlider.value;
        var xMoveMax=moveXMaxSlider.value;

        var yMoveMin=moveYMinSlider.value;
        var yMoveMax=moveYMaxSlider.value;
        

        var opacityMin=opacityMinSlider.value;
        var opacityMax=opacityMaxSlider.value;

        var rot=check2.value;
        var unifScale;

        for(var i=0;i<s.length;i++){
            
            if(check1.value){ 
                unifScale=xScaleMin+Math.random()*(xScaleMax-xScaleMin);
                s[i].resize(unifScale,unifScale);
                }else{
                             if(xScaleMin!=xScaleMax){
                            s[i].resize(xScaleMin+Math.random()*(xScaleMax-xScaleMin),100);
                            } 
                            
                            if(yScaleMin!=yScaleMax){
                            s[i].resize(100,yScaleMin+Math.random()*(yScaleMax-yScaleMin));
                            }
                    }
            
              
                    
                if(opacityMin!=opacityMax){
                    s[i].opacity=(opacityMin+Math.random()*(opacityMax-opacityMin));  
                    } else{
                         s[i].opacity=(opacityMin);
                        }
                    
                 if(xMoveMin!=0 || xMoveMax!=0){
                    s[i].translate(Math.random()*(xMoveMax-xMoveMin)+xMoveMin);
                    } 
                
                    if(yMoveMin!=0 || yMoveMax!=0){
                    s[i].translate(0,Math.random()*(yMoveMax-yMoveMin)+yMoveMin);
                    } 
                
                
                    
                 if (rot){
                     s[i].rotate (Math.random()*360);
                     }
            
            
            }
                
                }

