 //
 //     LAYER RENAMER
 //    Simple way to rename multiple layers
 //     Including addition of prefix's and suffix's.
 //
 //    Author: Qwertyfly
 //    Contact: tristan@qwertyfly.com
 //
 //    Version 1.001 - 02/3/17
 //
 //     Change Log:
 //     V1.001 - large overhaul
 //                     Including addition of Pages to deal with large layer counts
 //                     and selectall checkboxes.
 //                     Code is still a mess, needs to be cleaned up...,
 //     
 //
 // All code within this script is the property of Tristan O'Brien.
 // This script is free for personal use
 // Permission is required prior to any commercial application.
 //
 //  any suggestions? drop me a line...
 //
 
 
 // -------- User Variable ----------
 var numberOfLayersPerPage = 10;
 //---------------------------------------
 
 
layerRenamer();
function layerRenamer(){
    var doc = app.activeDocument, lays = []; 
    
    for(var i = 0; i < doc.layers.length; i++){  
        lays.push(doc.layers[i].name);  
    }

    var layerQty = lays.length;
    var currentPage = 1;
    var rangeS = 1;
    var rangeE = 10;
    var pageQty = Math.ceil(layerQty/numberOfLayersPerPage);
    var page = [];
    
    var w = new Window('dialog',"Layer Name Editor");  
    var list = w.add('group');  
    list.orientation = "Column";  
    
    var s, n, p, head;
    var  pre = [], nam = [], suf = [];
    
    var tabs = list.add ("tabbedpanel");
    tabs.alignChildren = ["fill", "fill"];
    tabs.preferredSize = [280,300];
    
    for(var j = 0; j < pageQty;j++){
        if(currentPage === pageQty){
            rangeE = layerQty;
        }
        page[currentPage] = tabs.add('tab',undefined,rangeS + " - " + rangeE);
        
//now add lines. 
        addHead(page[currentPage]);
        for(var i = rangeS-1; i < rangeE; i++){  
            newLine(i,"item" + i,page[currentPage]);  
        } 
    
        rangeS = rangeS + 10;
        rangeE = rangeE + 10;
        currentPage++
    }
    
    
    
 function addHead(currentPage){  
    head = currentPage.add('group');  
    head.alignment = "left";  
    p = head.add('statictext', undefined, "Prefix");  
    n = head.add('statictext', [0,0,165,20], "            Layer Name");  
    s = head.add('statictext', undefined, "Suffix");  
}    
    
    
      
    function newLine(num,item,currentPage){  
        item = currentPage.add('group');  
        item.alignment = "left";  
        pre[num] = item.add('checkbox', undefined,"");  
        nam[num] = item.add('edittext', [0,0,200,20], lays[i]);  
        nam[num].characters = 50;  
        suf[num] = item.add('checkbox', undefined, "");  
    }  
    selectAll();
    function selectAll(){
         var selAll =  list.add('group');
         selAll.alignment = ["fill","fill"]; 
         var preAll = selAll.add('checkbox',undefined,"");
         var AllText = selAll.add('statictext',[0,0,230,20],"       <-------      Select All      ------->");
         var postAll = selAll.add('checkbox',undefined,"");
         preAll.onClick = function(){checkAll(pre,preAll.value)};
         postAll.onClick = function(){checkAll(suf,postAll.value)};
    }
    function checkAll(checkboxArray,Value){
        var checked = false;
        if(Value === true){
            checked = true;
        }
        for(var k = 0;k < checkboxArray.length ; k++){
            checkboxArray[k].value = checked;
        }
    }

    var sep1 = list.add("panel");  
    sep1.alignment = ["fill","fill"];  
    sep1.minimumSize.height = sep1.maximumSize.height = 2;  
    var prefixt = list.add('statictext', undefined, "Prefix to add to checked layers");  
    var prefix = list.add('edittext', [0,0,250,20], "");  
    var sep2 = list.add("panel");  
    sep2.alignment = ["fill","fill"];  
    sep2.minimumSize.height = sep2.maximumSize.height = 2;  
    var prefixt = list.add('statictext', undefined, "Suffix to add to checked layers");  
    var suffix = list.add('edittext', [0,0,250,20], "");  
    var sep3 = list.add("panel");  
    sep3.alignment = ["fill","fill"];  
    sep3.minimumSize.height = sep3.maximumSize.height = 2;  
    var ButtonGroup = w.add("group");  
      ButtonGroup.margins = [0,-10,0,-8];  
      ButtonGroup.alignment = "right";  
      var go = ButtonGroup.add ("button", undefined, "OK");  
      var stop = ButtonGroup.add ("button", undefined, "Cancel");  
      stop.onClick = function(){  
      w.close();  
      }  
        go.onClick = function(){  
            var validatePre = false, validateSuf = false, validateMessage = "";  
            for(var i = 0; i < lays.length; i++){  
                if(pre[i].value == true && prefix.text == ""){validatePre = true}  
                if(suf[i].value == true && suffix.text == ""){validateSuf = true}  
            }  
            if(validatePre == true){validateMessage = "Layers have been marked for Prefix, but no Prefix entered\n"}  
            if(validateSuf == true){validateMessage = validateMessage + "Layers have been marked for Suffix, but no Suffix entered"}  
            if(validateMessage != ""){  
                alert(validateMessage);  
            }else{  
                w.close();  
                goTime();  
            }  
      }  
    w.show(); 
      
      
    function goTime(){  
        for(var i = 0; i < lays.length; i++){  
            var na = nam[i].text;  
            var pr = "";  
            var su = "";  
            if(pre[i].value == true){pr = prefix.text + " - "}  
            if(suf[i].value == true){su = " - " + suffix.text}  
            doc.layers[i].name = pr + na + su;  
        }  
    }
}