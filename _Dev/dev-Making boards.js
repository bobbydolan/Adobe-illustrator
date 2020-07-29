//@target illustrator
var mea = get_measurements();

if (mea) {
    var doc = app.activeDocument;
    var main = doc.artboards[0];
    main.artboardRect = rect(
        0, 0,
        mea.pageWidth, //mea.left + mea.right + ((mea.width + mea.GapHorizontal) * mea.columns) - mea.GapHorizontal,
        mea.pageHeight, //mea.top + mea.bottom + ((mea.height + mea.GapVertical) * mea.rows) - mea.GapVertical
    );
    main.name = "Main";


    for (var r = 0; r <= mea.rows - 1; r++) { //rows
        for (var c = 0; c <= mea.columns - 1; c++) { //columns
            doc.artboards.add(rect(
                ((mea.width + mea.GapHorizontal) * c) + mea.left,
                ((mea.height + mea.GapVertical) * r) + mea.top,
                mea.width,
                mea.height
            ));
        }
    }
    doc.artboards.setActiveArtboardIndex(1);
    app.executeMenuCommand('fitin');
}

function rect(left, top, w, h) {
    return [left, -top, (left + w), -(top + h)];
}

function get_measurements() {

    var dg = new Window("dialog", "Grid Measurements");

    //Page Size
    var PageGroup = dg.add("group");
    PageGroup.add('StaticText{text: "Page Width: "}');
    var PageWidth = PageGroup.add("edittext");
    PageWidth.text = "1";
    PageWidth.minimumSize.width = 100;
    PageGroup.add('StaticText{text: "Page height: "}');
    var PageHeight = PageGroup.add("edittext");
    PageHeight.text = "1";
    PageHeight.minimumSize.width = 100;

    //Layout Columns
    var LayoutGroup = dg.add("group");
    LayoutGroup.add('StaticText{text: "Rows: "}');
    var rows = LayoutGroup.add("edittext");
    rows.text = "1";
    rows.minimumSize.width = 100;
    LayoutGroup.add('StaticText{text: "Columns: "}');
    var cols = LayoutGroup.add("edittext");
    cols.text = "3";
    cols.minimumSize.width = 100;

    //Margin Columns
    var MarginGroup = dg.add("group");
    MarginGroup.add('StaticText{text: "Top: "}');
    var top = MarginGroup.add("edittext");
    top.text = "1";
    top.minimumSize.width = 100;
    MarginGroup.add('StaticText{text: "Left: "}');
    var left = MarginGroup.add("edittext");
    left.text = "1";
    left.minimumSize.width = 100;

    //Template Size
    var TemplateGroupiOS = dg.add("group");
    TemplateGroupiOS.add('StaticText{text: "iOS Width: "}');
    var iOSWidth = TemplateGroupiOS.add("edittext");
    iOSWidth.text = "1";
    iOSWidth.minimumSize.width = 100;
    TemplateGroupiOS.add('StaticText{text: "iOS height: "}');
    var iOSHeight = TemplateGroupiOS.add("edittext");
    iOSHeight.text = "1";
    iOSHeight.minimumSize.width = 100;
    
    // //Template Size
    // var TemplateGroupAndroid = dg.add("group");
    // TemplateGroupAndroid.add('StaticText{text: "Android Width: "}');
    // var AndroidWidth = TemplateGroupAndroid.add("edittext");
    // AndroidWidth.text = "1";
    // AndroidWidth.minimumSize.width = 100;
    // TemplateGroupAndroid.add('StaticText{text: "Android height: "}');
    // var AndroidHeight = TemplateGroupAndroid.add("edittext");
    // AndroidHeight.text = "1";
    // AndroidHeight.minimumSize.width = 100;

    //Gap / Pitch
    var GapGroup = dg.add("group");
    GapGroup.add('StaticText{text: "Gap Horizontal: "}');
    var GapHorizontal = GapGroup.add("edittext");
    GapHorizontal.text = "100";
    GapHorizontal.minimumSize.width = 100;
    GapGroup.add('StaticText{text: "Gap Vertical: "}');
    var GapVertical = GapGroup.add("edittext");
    GapVertical.text = "100";
    GapVertical.minimumSize.width = 100;

    //Cancel Buttons
    var myButtonGroup = dg.add("group");
    myButtonGroup.alignment = "right";
    myButtonGroup.add("button", undefined, "OK");
    myButtonGroup.add("button", undefined, "Cancel");

    if (dg.show() === 1) {
        var obj = new Object();
        obj.rows = parseFloat(rows.text);
        obj.columns = parseFloat(cols.text);
        obj.top = parseFloat(top.text);
        obj.left = parseFloat(left.text);
        obj.pageWidth = parseFloat(PageWidth.text);
        obj.pageHeight = parseFloat(PageHeight.text);
        obj.width = parseFloat(iOSWidth.text);
        obj.height = parseFloat(iOSHeight.text);
        // obj.width = parseFloat(AndroidWidth.text);
        // obj.height = parseFloat(AndroidHeight.text);
        obj.GapHorizontal = parseFloat(GapHorizontal.text);
        obj.GapVertical = parseFloat(GapVertical.text);
        
        return obj;
    } else {
        return false;
    }
}