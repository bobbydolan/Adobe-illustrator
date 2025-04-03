//===========================================================


//


//          Rename Artboards


//


//===========================================================


//


//          Version 0.2.1


//          10/6/2015


//          Qwertyfly


//


//===========================================================


//


//          ChangeLog


//


//          Version 0.2


//          -added scrollbar (needed full rework)


//


//          Version 0.2.1


//          -bug fix, forgot to initiate the "pre" "nam" & "suf" arrays.


//          -added user var for Seperators


//


//===========================================================


//          User set variable


var rows = 10; // Number of visible rows.


var preSep = " - "; // Seperator between Prefix and name


var sufSep = " - "; // Seperator between name and Suffix


//===========================================================


var doc = app.activeDocument,
    abs = [],
    item = [],
    pre = [],
    nam = [],
    suf = [];


for (var i = 0; i < doc.artboards.length; i++) {


    abs = [];


    abs = [false, doc.artboards.name, false, i];


}


var w = new Window('dialog', "Artboard Name Editor");


var list = w.add('group');


list.orientation = "Column";


var head = list.add('group');


head.alignment = "left";


var p = head.add('statictext', undefined, "Prefix");


var n = head.add('statictext', [0, 0, 165, 20], "         Artboard Name");


var s = head.add('statictext', undefined, "Suffix");


//-----------------------------------------------------------------------------------------------------


var scrollwin = list.add('group');


scrollwin.alignChildren = "fill";


var items = scrollwin.add("panel");


if (abs.length < rows) {


    for (var i = 0; i < abs.length; i++) {


        newLine(i, item);


    }


} else {


    var sbar = scrollwin.add("scrollbar", undefined, 0, 0, abs.length - rows);


    sbar.preferredSize.width = 20;


    for (var i = 0; i < rows; i++) {


        item = items.add('group');


        item.alignment = "left";


        newLine(i, item);


    }


    sbar.onChanging = function () {


        var start = Math.round(this.value);


        var stop = start + rows;


        var r = 0;


        for (var i = start; i < stop; i++) {


            pre.value = abs[0];


            pre.label = abs[3];


            nam.text = abs[1];


            nam.label = abs[3];


            suf.value = abs[2];


            suf.label = abs[3];


            r++;


        }


    }


}


function newLine(num, item) {


    pre[num] = item.add('checkbox', undefined, "");


    pre[num].value = abs[num][0];


    pre[num].label = abs[num][3];


    pre[num].onClick = function () {
        if (abs[this.label][0] == false) {
            abs[this.label][0] = true
        } else {
            abs[this.label][0] = false
        }
    }


    nam[num] = item.add('edittext', [0, 0, 200, 20]);


    nam[num].characters = 50;


    nam[num].text = abs[num][1];


    nam[num].label = abs[num][3];


    nam[num].onChange = function () {
        abs[this.label][1] = this.text;
    }


    suf[num] = item.add('checkbox', undefined, "");


    suf[num].value = abs[num][2];


    suf[num].label = abs[num][3];


    suf[num].onClick = function () {
        if (abs[this.label][2] == false) {
            abs[this.label][2] = true
        } else {
            abs[this.label][2] = false
        }
    }


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


        if (abs[0].value == true && prefix.text == "") {
            validatePre = true
        }


        if (abs[2].value == true && suffix.text == "") {
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


        var na = abs[1];


        var pr = "";


        var su = "";


        if (abs[0] == true) {
            pr = prefix.text + "" + preSep
        }


        if (abs[2] == true) {
            su = sufSep + "" + suffix.text
        }


        doc.artboards.name = pr + na + su;


    }


}