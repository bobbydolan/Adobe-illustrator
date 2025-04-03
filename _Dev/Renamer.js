//===========================================================

//          Rename Artboards

//===========================================================


//          Version 0.1


//          25/5/2015


//          Qwertyfly


//===========================================================


var doc = app.activeDocument,
    abs = [];


for (var i = 0; i < doc.artboards.length; i++) {


    abs.push(doc.artboards.name);


}


var w = new Window('dialog', "Artboard Name Editor");


var list = w.add('group');


list.orientation = "Column";


var head = list.add('group');


head.alignment = "left";


var p = head.add('statictext', undefined, "Prefix");


var n = head.add('statictext', [0, 0, 165, 20], "         Artboard Name");


var s = head.add('statictext', undefined, "Suffix");


var pre = [],
    nam = [],
    suf = [];


for (var i = 0; i < abs.length; i++) {


    newLine(i, "item" + i);


}


function newLine(num, item) {


    item = list.add('group');


    item.alignment = "left";


    pre[num] = item.add('checkbox', undefined, "");


    nam[num] = item.add('edittext', [0, 0, 200, 20], abs);


    nam[num].characters = 50;


    suf[num] = item.add('checkbox', undefined, "");


}


var sep1 = list.add("panel");


sep1.alignment = ["fill", "fill"];


sep1.minimumSize.height = sep1.maximumSize.height = 2;


var prefixt = list.add('statictext', undefined, "Prefix to add to checked artboards");


var prefix = list.add('edittext', [0, 0, 250, 20], "");


var sep2 = list.add("panel");


sep2.alignment = ["fill", "fill"];


sep2.minimumSize.height = sep2.maximumSize.height = 2;


var prefixt = list.add('statictext', undefined, "Suffix to add to checked artboards");


var suffix = list.add('edittext', [0, 0, 250, 20], "");


var sep3 = list.add("panel");


sep3.alignment = ["fill", "fill"];


sep3.minimumSize.height = sep3.maximumSize.height = 2;


var ButtonGroup = w.add("group");


ButtonGroup.margins = [0, -10, 0, -8];


ButtonGroup.alignment = "right";


var go = ButtonGroup.add("button", undefined, "OK");


var stop = ButtonGroup.add("button", undefined, "Cancel");


stop.onClick = function () {


    w.close();


}


go.onClick = function () {


    var validatePre = false,
        validateSuf = false,
        validateMessage = "";


    for (var i = 0; i < abs.length; i++) {


        if (pre.value == true && prefix.text == "") {
            validatePre = true
        }


        if (suf.value == true && suffix.text == "") {
            validateSuf = true
        }


    }


    if (validatePre == true) {
        validateMessage = "Artboards have been marked for Prefix, but no Prefix entered\n"
    }


    if (validateSuf == true) {
        validateMessage = validateMessage + "Artboards have been marked for Suffix, but no Suffix entered"
    }


    if (validateMessage != "") {


        alert(validateMessage);


    } else {


        w.close();


        goTime();


    }


}


w.show();




function goTime() {


    for (var i = 0; i < abs.length; i++) {


        var na = nam.text;


        var pr = "";


        var su = "";


        if (pre.value == true) {
            pr = prefix.text + " - "
        }


        if (suf.value == true) {
            su = " - " + suffix.text
        }


        doc.artboards.name = pr + na + su;


    }


}