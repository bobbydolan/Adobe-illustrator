#target illustrator
#targetengine "session"   

/////////////--------------------------- Main ---------------------------------------------
var WindowBorderInX = 10; var WindowBorderInY = 15;
var WindowMainWidth = 543; var WindowMainHeight = 150;
var SpaceBetweenX = 10;var SpaceBetweenY = 10;
var StaticTextFindWidth = 30; var StaticTextFindHeight = 15;
var StaticTextReplaceWidth = 60; var StaticTextReplaceHeight = 15;
var RegionSwatchesWidth = Math.floor((WindowMainWidth - 2*WindowBorderInX - SpaceBetweenX)/2);// width SwatchesPanel
var BottomBorderY = WindowBorderInY; // End of Window in Y
dlg = new Window('palette', 'Replace Colors',{x:100,y:100,width:WindowMainWidth,height:WindowMainHeight+100},{resizeable:true,closeButton:true,maximizeButton:true,minimizeButton:true});

////////////////////////////////////////////////// Objets in Window  //////////////////////////////////////////////////////////////////////

//-------------------------------StaticTextFind and StaticTextNameOfColorFind
var Group1Find = dlg.add('group',{x:WindowBorderInX,y:BottomBorderY,width:RegionSwatchesWidth,height:20});
var StaticTextFind = Group1Find.add('StaticText',{x:0,y:0,width:10,height:10}); 
StaticTextFind.text = 'Find'; StaticTextFind.graphics.font = ScriptUI.newFont ('Tahoma', 'BOLD', 11);
StaticTextFind.bounds.width = StaticTextFind.preferredSize.width;
StaticTextFind.bounds.height = StaticTextFind.preferredSize.height;
var ButtonSwatchesFind = Group1Find.add('group',{x:StaticTextFind.bounds.right+2,y:StaticTextFind.bounds.y,width:20,height:20});
ButtonSwatchesFind.Name = 'ButtonSwatchesFind';
var StaticTextNameOfColorFind = Group1Find.add('StaticText',{x:ButtonSwatchesFind.bounds.right+SpaceBetweenX,y:StaticTextFind.bounds.y,width:10,height:10}); 
StaticTextNameOfColorFind.Name = 'StaticTextNameOfColorFind';
StaticTextNameOfColorFind.text = 'Black (C:0 M:0 Y:0 K:100)';
StaticTextNameOfColorFind.bounds.width = StaticTextNameOfColorFind.preferredSize.width;
StaticTextNameOfColorFind.bounds.height = StaticTextNameOfColorFind.preferredSize.height;
Group1Find.bounds.height = Math.max(StaticTextFind.bounds.height,ButtonSwatchesFind.bounds.height,StaticTextNameOfColorFind.bounds.height);

BottomBorderY = Group1Find.bounds.bottom + SpaceBetweenY;

//---------------------------------- Tolerance  Find ------------------------------------
var Group3FindTolerance = dlg.add('group',{x:WindowBorderInX,y:BottomBorderY,width:RegionSwatchesWidth,height:20});
var StaticTextFindTolerance = Group3FindTolerance.add('StaticText',{x:0,y:0,width:10,height:10});
StaticTextFindTolerance.text = 'Tolerance:'; 
StaticTextFindTolerance.bounds.width = StaticTextFindTolerance.preferredSize.width;
StaticTextFindTolerance.bounds.height = StaticTextFindTolerance.preferredSize.height;
var EditTextFindTolerance = Group3FindTolerance.add('edittext',{x:StaticTextFindTolerance.bounds.right+2,y:0,width:10,height:10},'0');
EditTextFindTolerance.characters = 5; 
EditTextFindTolerance.bounds.width = EditTextFindTolerance.preferredSize.width;
EditTextFindTolerance.bounds.height = EditTextFindTolerance.preferredSize.height;
var SliderFindTolerance = Group3FindTolerance.add ("slider",{x:EditTextFindTolerance.bounds.right+2,y:0,width:Group3FindTolerance.bounds.width-EditTextFindTolerance.bounds.right-5,height:10},0,0,100); 
SliderFindTolerance.onChanging = function () {EditTextFindTolerance.text = Math.round(SliderFindTolerance.value);}
EditTextFindTolerance.onChange = function(){ if (isNaN(EditTextFindTolerance.text)){SliderFindTolerance.value = 0;EditTextFindTolerance.text = 0} else {SliderFindTolerance.value = EditTextFindTolerance.text;EditTextFindTolerance.text = Math.round(SliderFindTolerance.value)}}
Group3FindTolerance.bounds.height = Math.max(StaticTextFindTolerance.bounds.height,EditTextFindTolerance.bounds.height,SliderFindTolerance.bounds.height);

BottomBorderY = Group3FindTolerance.bounds.bottom + SpaceBetweenY;


//--------------------------------- Color and Group Swatches Listbox Find
var Group2Find = dlg.add('group',{x:WindowBorderInX,y:BottomBorderY,width:RegionSwatchesWidth,height:20});
var StaticTextListBoxGroupSwatchesFind = Group2Find.add('StaticText',{x:0,y:0,width:10,height:10}); 
StaticTextListBoxGroupSwatchesFind.text = 'Group Swatches:';
StaticTextListBoxGroupSwatchesFind.bounds.width = StaticTextListBoxGroupSwatchesFind.preferredSize.width;
StaticTextListBoxGroupSwatchesFind.bounds.height = StaticTextListBoxGroupSwatchesFind.preferredSize.height;
var ListBoxGroupSwatchesFind = Group2Find.add ('dropdownlist', {x:StaticTextListBoxGroupSwatchesFind.bounds.right+SpaceBetweenX,y:0,width:Group2Find.bounds.width-(StaticTextListBoxGroupSwatchesFind.bounds.width+SpaceBetweenX),height:10});
ListBoxGroupSwatchesFind.Name = 'ListBoxGroupSwatchesFind';
ListBoxGroupSwatchesFind.add('item','Null');
ListBoxGroupSwatchesFind.bounds.height = ListBoxGroupSwatchesFind.preferredSize.height;
ListBoxGroupSwatchesFind.removeAll();
Group2Find.bounds.height = Math.max(ListBoxGroupSwatchesFind.bounds.height,StaticTextListBoxGroupSwatchesFind.bounds.height);

BottomBorderY = Group2Find.bounds.bottom + SpaceBetweenY;
//----------------------------SwatchesPanelFind
var SwatchesPanelFind = dlg.add ('panel',{x:WindowBorderInX,y:BottomBorderY,width:RegionSwatchesWidth,height:100});
SwatchesPanelFind.Name = 'SwatchesPanelFind';

BottomBorderY = SwatchesPanelFind.bounds.bottom + SpaceBetweenY;

//------------------------------ StaticTextReplace and StaticTextNameOfColorReplace
var Group1Replace = dlg.add('group',{x:WindowBorderInX,y:BottomBorderY,width:RegionSwatchesWidth,height:20});
var StaticTextReplace = Group1Replace.add('StaticText',{x:0,y:0,width:10,height:10}); 
StaticTextReplace.text = 'Replace'; StaticTextReplace.graphics.font = ScriptUI.newFont ('Tahoma', 'BOLD', 11);
StaticTextReplace.bounds.width = StaticTextReplace.preferredSize.width;
StaticTextReplace.bounds.height = StaticTextReplace.preferredSize.height;
var ButtonSwatchesReplace = Group1Replace.add('group',{x:StaticTextReplace.bounds.right+2,y:StaticTextFind.bounds.y,width:20,height:20});
ButtonSwatchesReplace.Name = 'ButtonSwatchesReplace';
var StaticTextNameOfColorReplace = Group1Replace.add('StaticText',{x:ButtonSwatchesReplace.bounds.right+SpaceBetweenX,y:StaticTextReplace.bounds.y,width:10,height:10}); 
StaticTextNameOfColorReplace.Name = 'StaticTextNameOfColorReplace';
StaticTextNameOfColorReplace.text = 'Black (C:0 M:0 Y:0 K:100)';
StaticTextNameOfColorReplace.bounds.width = StaticTextNameOfColorReplace.preferredSize.width;
StaticTextNameOfColorReplace.bounds.height = StaticTextNameOfColorReplace.preferredSize.height;
Group1Replace.bounds.height = Math.max(StaticTextReplace.bounds.height,ButtonSwatchesReplace.bounds.height,StaticTextNameOfColorReplace.bounds.height);

BottomBorderY = Group1Replace.bounds.bottom + SpaceBetweenY;

//--------------------------------- Color and Group Swatches Listbox Replace
var Group2Replace = dlg.add('group',{x:WindowBorderInX,y:BottomBorderY,width:RegionSwatchesWidth,height:20});
var StaticTextListBoxGroupSwatchesReplace = Group2Replace.add('StaticText',{x:0,y:0,width:10,height:10}); 
StaticTextListBoxGroupSwatchesReplace.text = 'Group Swatches:';
StaticTextListBoxGroupSwatchesReplace.bounds.width = StaticTextListBoxGroupSwatchesReplace.preferredSize.width;
StaticTextListBoxGroupSwatchesReplace.bounds.height = StaticTextListBoxGroupSwatchesReplace.preferredSize.height;
var ListBoxGroupSwatchesReplace = Group2Replace.add ('dropdownlist', {x:StaticTextListBoxGroupSwatchesReplace.bounds.right+SpaceBetweenX,y:0,width:Group2Replace.bounds.width-(StaticTextListBoxGroupSwatchesReplace.bounds.width+SpaceBetweenX),height:10});
ListBoxGroupSwatchesReplace.Name = 'ListBoxGroupSwatchesReplace';
ListBoxGroupSwatchesReplace.add('item','Null');
ListBoxGroupSwatchesReplace.bounds.height = ListBoxGroupSwatchesReplace.preferredSize.height;
ListBoxGroupSwatchesReplace.removeAll();
Group2Replace.bounds.height = Math.max(ListBoxGroupSwatchesReplace.bounds.height,StaticTextListBoxGroupSwatchesReplace.bounds.height);

BottomBorderY = Group2Replace.bounds.bottom + SpaceBetweenY;

//----------------------------SwatchesPanelReplace
var SwatchesPanelReplace = dlg.add ('panel',{x:WindowBorderInX,y:BottomBorderY,width:RegionSwatchesWidth,height:100});
SwatchesPanelReplace.Name = 'SwatchesPanelReplace';

BottomBorderY = SwatchesPanelReplace.bounds.bottom + SpaceBetweenY;

//---------------------------------- Random ------------------------------------
var GroupRandom = dlg.add('group',{x:WindowBorderInX,y:BottomBorderY,width:RegionSwatchesWidth,height:20});
var StaticTextRandom = GroupRandom.add('StaticText',{x:0,y:0,width:10,height:10});
StaticTextRandom.text = 'Random:'; 
StaticTextRandom.bounds.width = StaticTextRandom.preferredSize.width;
StaticTextRandom.bounds.height = StaticTextRandom.preferredSize.height;
var EditTextRandom = GroupRandom.add('edittext',{x:StaticTextRandom.bounds.right+2,y:0,width:10,height:10},'0');
EditTextRandom.characters = 5; 
EditTextRandom.bounds.width = EditTextRandom.preferredSize.width;
EditTextRandom.bounds.height = EditTextRandom.preferredSize.height;
var SliderRandom = GroupRandom.add ("slider",{x:EditTextRandom.bounds.right+2,y:0,width:GroupRandom.bounds.width-EditTextRandom.bounds.right-5,height:10},0,0,100); 
SliderRandom.onChanging = function () {EditTextRandom.text = Math.round(SliderRandom.value);}
EditTextRandom.onChange = function(){ if (isNaN(EditTextRandom.text)){SliderRandom.value = 0;EditTextRandom.text = 0} else {SliderRandom.value = EditTextRandom.text; EditTextRandom.text = Math.round(SliderRandom.value)}}
GroupRandom.bounds.height = Math.max(StaticTextRandom.bounds.height,EditTextRandom.bounds.height,SliderRandom.bounds.height);

BottomBorderY = GroupRandom.bounds.bottom + SpaceBetweenY;

//=============================================================================================
//---------------------------- Options -----------------------------------

var GroupCheckBox = dlg.add('panel',{x:WindowBorderInX,y:BottomBorderY,width:RegionSwatchesWidth,height:30},'What is replace');
var checkboxSelected = GroupCheckBox.add("radiobutton",{x:2,y:2,width:20,height:20},'Selected');
checkboxSelected.bounds.width = checkboxSelected.preferredSize.width;
var checkboxLayerInArtboard = GroupCheckBox.add("radiobutton",{x:checkboxSelected.bounds.right,y:2,width:20,height:20},'Layer in Artboard');
checkboxLayerInArtboard.bounds.width = checkboxLayerInArtboard.preferredSize.width;
var checkboxArtboard = GroupCheckBox.add("radiobutton",{x:checkboxLayerInArtboard.bounds.right,y:2,width:20,height:20},'Artboard');
checkboxArtboard.bounds.width = checkboxArtboard.preferredSize.width;
var checkboxLayerInDocument = GroupCheckBox.add("radiobutton",{x:2,y:checkboxSelected.bounds.bottom,width:20,height:20},'Layer in Document');
checkboxLayerInDocument.bounds.width = checkboxLayerInDocument.preferredSize.width;
var checkboxDocument = GroupCheckBox.add("radiobutton",{x:checkboxLayerInDocument.bounds.right,y:checkboxSelected.bounds.bottom,width:20,height:20},'Document');
checkboxDocument.bounds.width = checkboxDocument.preferredSize.width;
GroupCheckBox.bounds.width = Math.max(checkboxArtboard.bounds.right,checkboxDocument.bounds.right)+2;
GroupCheckBox.bounds.height = checkboxDocument.bounds.bottom + 8;

BottomBorderY = GroupCheckBox.bounds.bottom + SpaceBetweenY;

var GroupWhatReplaceBox = dlg.add('panel',{x:WindowBorderInX,y:BottomBorderY ,width:RegionSwatchesWidth,height:30},'Type of  replace');
var checkboxFill = GroupWhatReplaceBox.add('checkbox', {x:2,y:2,width:20,height:20},'Fill');
checkboxFill.bounds.width = checkboxFill.preferredSize.width; 
var checkboxStroke = GroupWhatReplaceBox.add('checkbox', {x:checkboxFill.bounds.right+2,y:2,width:80,height:20},'Stroke');
checkboxStroke.bounds.width = checkboxStroke.preferredSize.width; 
GroupWhatReplaceBox.bounds.width = GroupWhatReplaceBox.preferredSize.width;

var ButtonReplace = dlg.add('button',{x:GroupWhatReplaceBox.bounds.right+5,y:BottomBorderY+5 ,width:100,height:GroupWhatReplaceBox.preferredSize.height+10},'Replace');

////////////////////////////  Size of Window dlg    /////////////////////////////////////////
dlg.minimumSize.width = dlg.maximumSize.width = dlg.bounds.width = SwatchesPanelReplace.bounds.right+WindowBorderInX;
dlg.maximumSize.height = dlg.bounds.height = ButtonReplace.bounds.bottom+WindowBorderInY;
ButtonMinResize = dlg.add('button',{x:dlg.maximumSize.width-25,y:dlg.maximumSize.height-13,width:25,height:13},'MIN');
ButtonMinResize.graphics.font = ScriptUI.newFont ('Tahoma', 'BOLD', 8);
Information = dlg.add('StaticText',{x:0,y:dlg.maximumSize.height-11,width:25,height:10}); 
Information.text = '© 2012 Alex Sheingart  e-mail:sheingart2901@yahoo.com'; 
Information.graphics.font = ScriptUI.newFont ('Tahoma', 'REGULAR', 9);
Information.bounds.width = Information.preferredSize.width;
ButtonMaxResize = dlg.add('button',{x:dlg.maximumSize.width-25,y:0,width:25,height:13},'MAX');
ButtonMaxResize.graphics.font = ScriptUI.newFont ('Tahoma', 'BOLD', 8);
ButtonMaxResize.visible = false;
//=============================================================================================

//////////////////////////////     end Objets in Window           /////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////// Elements  //////////////////////////////////////////////////////////////////////]

var SizeThumbnailOfButtonInPanelDlg = new Object();//-----sizes of button(from ButtonInPanelDlg) in table colors of buttons Thumbnail
        SizeThumbnailOfButtonInPanelDlg.small = new Object();
        SizeThumbnailOfButtonInPanelDlg.small.width = 20;
        SizeThumbnailOfButtonInPanelDlg.small.height = 20;
        SizeThumbnailOfButtonInPanelDlg.medium = new Object ();
        SizeThumbnailOfButtonInPanelDlg.medium.width = 30;
        SizeThumbnailOfButtonInPanelDlg.medium.height = 30;
        SizeThumbnailOfButtonInPanelDlg.large = new Object ();
        SizeThumbnailOfButtonInPanelDlg.large.width = 50;
        SizeThumbnailOfButtonInPanelDlg.large.height = 50;
var SizeListOfButtonInPanelDlg = new Object();//-----sizes of button(from ButtonInPanelDlg) in table colors of buttons List
        SizeListOfButtonInPanelDlg.small = new Object();
        SizeListOfButtonInPanelDlg.small.width = 100;
        SizeListOfButtonInPanelDlg.small.height = 20;
        SizeListOfButtonInPanelDlg.large = new Object();
        SizeListOfButtonInPanelDlg.small.width = 100;    
        SizeListOfButtonInPanelDlg.large.height = 50;
var SelectedButtonsColorsInSwatches = new Object();//--------number of swatch in list of colors
        SelectedButtonsColorsInSwatches.SwatchesPanelFind = 0;
        SelectedButtonsColorsInSwatches.SwatchesPanelReplace = 0;
////////////////////////////////////////////////// end of Elements  //////////////////////////////////////////////////////////////////////



///////////////////////////////////////////////////////////////  Function of Events  ////////////////////////////////////////////////////////////////////////////
ButtonMinResize.onClick = function()
    { dlg.bounds.height = 13;
        ButtonMaxResize.visible = true;
    }
ButtonMaxResize.onClick = function()
    {dlg.bounds.height = dlg.maximumSize.height;
        ButtonMaxResize.visible = false;
    }
        
ButtonReplace.onClick = function(){
   var bt = new BridgeTalk();
   bt.target = "Illustrator";
   bt.body = "{\n"+
   "ToGoReplaceColor(app.activeDocument," + 
   (ButtonSwatchesFind.IndexInArraySwatches).toString() + "," +
   (ButtonSwatchesReplace.IndexInArraySwatches).toString() + "," +
   (ListBoxGroupSwatchesFind.selection.index).toString() + "," +
   (ListBoxGroupSwatchesReplace.selection.index).toString() + "," +
   (checkboxSelected.value).toString() + "," +
   (checkboxArtboard.value).toString() + "," +
   (checkboxDocument.value).toString() + "," +
   (checkboxLayerInDocument.value).toString() + "," +
   (checkboxLayerInArtboard.value).toString() + "," +
   (checkboxFill.value).toString() + "," +
   (checkboxStroke.value).toString() + "," +
   EditTextFindTolerance.text  + "," +
   EditTextRandom.text + 
   ");\n"+
   ToGoReplaceColor.toString() + "\n"+
   "}\n";
    bt.onResult = function( resultMsg ) {
        //alert("Result = " + resultMsg.body);
     }
     bt.onError = function( errorMsg ) {
          alert("Error = " + errorMsg.body); 
     }
   bt.send();      
    }


    
function ChangeListSwatches(){// dropdownlist FIND
    switch (this.Name){
        case 'ListBoxGroupSwatchesFind':{
                for(var i=0;i<SwatchesPanelFind.children.length;i++){SwatchesPanelFind.children[i].visible = false}
                SwatchesPanelFind.children[this.selection.index].visible = true;
                break}
        case 'ListBoxGroupSwatchesReplace':{
                for(var i=0;i<SwatchesPanelReplace.children.length;i++){SwatchesPanelReplace.children[i].visible = false}
                SwatchesPanelReplace.children[this.selection.index].visible = true;
                break}
        default: {break}
       }// switch
    }


function  FunctionClickOnButtonColor() {
                if(!this.Contour){SelectContourButton(this);this.Contour=true;ContourHideShow(this);}
                ContourHideShow(this);
                ContourHideShow(this.parent.children[this.parent.SelectedButtonInArray]);
                this.parent.SelectedButtonInArray = this.IndexInArraySwatches;
                switch (this.parent.parent.parent.Name){
                    case 'SwatchesPanelFind':{SelectContainerFromButtonColorInFindReplace(this,'FIND');break}
                    case 'SwatchesPanelReplace':{SelectContainerFromButtonColorInFindReplace(this,'REPLACE');break}
                    default: {break};
                    }
  }

//------------------- ScrollBar Change
function ChangeScrollbarTableColors(heightElement){ 
   for (var i=0;i<this.parent.children.length;i++){if (this.parent.children[i].type == 'group'){break}}
   heightofbutton = this.parent.children[i].bounds.height;
   this.parent.children[i].bounds.top = -this.value;
    }

//------------------- Event of Button Replace
function ToGoReplaceColor(ActDoc,IndexInSwatchesFind,IndexInSwatchesReplace, IndexInSwatchGroupsFind,IndexInSwatchGroupsReplace,checkboxSelected,checkboxArtboard,checkboxDocument,checkboxLayerInDocument,checkboxLayerInArtboard, checkboxFill, checkboxStroke, FindTolerance, Random)
{  NumberReplaceObjects = null; 
    ReplaceColorObject = false;
    SwatchesInFind = app.activeDocument.swatchGroups[IndexInSwatchGroupsFind].getAllSwatches(); // create swatches from group with index  Find
    SwatchesInReplace =  app.activeDocument.swatchGroups[IndexInSwatchGroupsReplace].getAllSwatches(); // create swatches from group with index  Replace
 //////////////////////////////////////////////////////////-------------   Functions compare and replace colors  ----------------------/////////////////////////////////////////
 
 /// --------------------------------- function find and replace color in PageItems
function ToSetColorObject(ObjectFromGroup,color1,color2,changeFill,changeStroke, FindTolerance, Random){
    function setLegal(num, max) 
    {
	if (max == undefined) {max = 100;}
	if (num<0) {return -num%max;
        } else if (num>max) {
            return max-(num%max);
        } else {return num;}
    }///----------setLegal(num, max)

function setColor(obj, dev) {
            var d = Math.round(Math.random(1)*dev);
            if (obj == undefined) {
                //do nothing
            } else if (obj.typename == "RGBColor") {
                d = Math.round(Math.random(1)*dev);
                var r = obj.red;
                obj.red = setLegal((r-dev)+(d*2), 255);
                d = Math.round(Math.random(1)*dev);
                var g = obj.green;
                obj.green = setLegal((g-dev)+(d*2), 255);
                d = Math.round(Math.random(1)*dev);
                var b = obj.blue;
                obj.blue = setLegal((b-dev)+(d*2), 255);
            } else if (obj.typename == "SpotColor") {
                var d = Math.round(Math.random(1)*dev);
                var t = obj.tint;
                obj.tint = setLegal((t-dev)+(d*2), 100);
            } else if (obj.typename == "GrayColor") {
                var d = Math.round(Math.random(1)*dev);
                var t = obj.gray;
                obj.gray = (setLegal((t-dev)+(d*2), 100));
            } else if (obj.typename == "CMYKColor") {
                d = Math.round(Math.random(1)*dev);
                var c = obj.cyan;
                obj.cyan = setLegal((c-dev)+(d*2), 100);
                d = Math.round(Math.random(1)*dev);
                var m = obj.magenta;
                obj.magenta = setLegal((m-dev)+(d*2), 100);
                d = Math.round(Math.random(1)*dev);
                var y = obj.yellow;
                obj.yellow = setLegal((y-dev)+(d*2), 100);
                d = Math.round(Math.random(1)*dev);
                var k = obj.black;
                obj.black = setLegal((k-dev)+(d*2), 100);
           }
        } ///---------function setColor(obj, dev)
    
    switch (ObjectFromGroup.typename) {
        case 'GroupItem':{//$.writeln(ObjectFromGroup.typename);
                    for(var i=0;i<ObjectFromGroup.pageItems.length;i++) 
                    {ToSetColorObject(ObjectFromGroup.pageItems[i],color1,color2,changeFill,changeStroke, FindTolerance, Random);}
            break;}
        case 'PathItem':{//$.writeln(ObjectFromGroup.typename); 
                        if (changeFill) {
                            if (CompareColorObjects(ObjectFromGroup.fillColor,color1, FindTolerance))
                            {   ObjectFromGroup.fillColor = color2; 
                                if (Random>0) {setColor(ObjectFromGroup.fillColor, Random);}
                                ReplaceColorObject = true;}
                            }
                        if (changeStroke) {
                            if (CompareColorObjects(ObjectFromGroup.strokeColor,color1, FindTolerance))
                            {   ObjectFromGroup.strokeColor = color2; 
                                if (Random>0) {setColor(ObjectFromGroup.strokeColor, Random);}
                                ReplaceColorObject = true;} 
                            }
            break;}
        case 'CompoundPathItem':{//$.writeln(ObjectFromGroup.typename); 
                                            for (var i=0;i<ObjectFromGroup.pathItems.length;i++){
                                                ToSetColorObject(ObjectFromGroup.pathItems[i],color1,color2,changeFill,changeStroke, FindTolerance, Random)
                                                }
            break;}
        case 'GraphItem':{//$.writeln(ObjectFromGroup.typename); 
            break;}
        case 'LegacyTextItem':{//$.writeln(ObjectFromGroup.typename); 
            break;}
        case 'MeshItem':{//$.writeln(ObjectFromGroup.typename); 
            break;}
        case 'NonNativeItem':{//$.writeln(ObjectFromGroup.typename); 
            break;}
        case 'PlacedItem':{//$.writeln(ObjectFromGroup.typename); 
            break;}
        case 'PluginItem':{//$.writeln(ObjectFromGroup.typename); 
            break;}
        case 'RasterItem':{//$.writeln(ObjectFromGroup.typename); 
            break;}
        case 'SymbolItem':{//$.writeln(ObjectFromGroup.typename); 
            break;}
        case 'TextFrame':{
            // lines - number lines of Text in TextFrame
                        if (changeFill) {
                            if ((ObjectFromGroup.kind == TextType.AREATEXT) || (ObjectFromGroup.kind == TextType.PATHTEXT)){
                                ToSetColorObject(ObjectFromGroup.textPath,color1,color2,changeFill,changeStroke, FindTolerance, Random)};
                            for (var i=0;i<ObjectFromGroup.textRanges.length;i++){
                                ToSetColorObject(ObjectFromGroup.textRanges[i],color1,color2,changeFill,changeStroke, FindTolerance, Random);
                            }
                            }
                       if (changeStroke) {
                            if ((ObjectFromGroup.kind == TextType.AREATEXT) || (ObjectFromGroup.kind == TextType.PATHTEXT)){                            
                            ToSetColorObject(ObjectFromGroup.textPath,color1,color2,changeFill,changeStroke, FindTolerance, Random)};
                            for (var i=0;i<ObjectFromGroup.textRanges.length;i++){
                            ToSetColorObject(ObjectFromGroup.textRanges[i],color1,color2,changeFill,changeStroke, FindTolerance, Random);
                            }
                            }
                        //textPath - fillColor, strokeColor of TextFrame
                        break;}
        case 'Characters':{//$.writeln(ObjectFromGroup.typename);
                        //characters.length, fillColor, strokeColor (fill of Character)
                    for (i=0;i<ObjectFromGroup.length;i++){
                        if (changeFill) {
                            if (CompareColorObjects(ObjectFromGroup[i].fillColor,color1, FindTolerance))
                            {   ObjectFromGroup[i].fillColor = color2; 
                                if (Random>0) {setColor(ObjectFromGroup[i].fillColor, Random);}
                                ReplaceColorObject = true;}
                            }
                        if (changeStroke) {
                            if (CompareColorObjects(ObjectFromGroup[i].strokeColor,color1, FindTolerance))
                            {   ObjectFromGroup[i].strokeColor = color2; 
                                if (Random>0) {setColor(ObjectFromGroup[i].strokeColor, Random);}
                                ReplaceColorObject = true;} 
                            }
                        }
            break;}
        case 'TextRange':{//$.writeln(ObjectFromGroup.typename);
            //characters-Characters,  characterAttributes-CharacterAttributes?
            for (var i=0;i<ObjectFromGroup.characters.length;i++){
                        if (changeFill) {
                            if (CompareColorObjects(ObjectFromGroup.characters[i].fillColor,color1, FindTolerance))
                            {   ObjectFromGroup.characters[i].fillColor = color2; 
                                if (Random>0) {setColor(ObjectFromGroup[i].fillColor, Random);}
                                ReplaceColorObject = true;}
                            }
                        if (changeStroke) {
                            if (CompareColorObjects(ObjectFromGroup.characters[i].strokeColor,color1, FindTolerance))
                            {   ObjectFromGroup.characters[i].strokeColor = color2; 
                                if (Random>0) {setColor(ObjectFromGroup[i].strokeColor, Random);}
                                ReplaceColorObject = true;} 
                            }
                }
            break;}
        case 'TextPath':{//$.writeln(ObjectFromGroup.typename);
                        if (changeFill) {
                            if (CompareColorObjects(ObjectFromGroup.fillColor,color1, FindTolerance))
                            {   ObjectFromGroup.fillColor = color2; 
                                if (Random>0) {setColor(ObjectFromGroup.fillColor, Random);}
                                ReplaceColorObject = true;}
                            }
                        if (changeStroke) {
                            if (CompareColorObjects(ObjectFromGroup.strokeColor,color1, FindTolerance))
                            {   ObjectFromGroup.strokeColor = color2; 
                                if (Random>0) {setColor(ObjectFromGroup[i].strokeColor, Random);}
                                ReplaceColorObject = true;} 
                            }
            break;}
        default:{break;};
        }
    return ReplaceColorObject;
}
/// --------------------------------- END  function find and replace color in PageItems

/// --------------------------------- function compare colors in objects
function CompareColorObjects(color1, color2, tolerance){
        if (color1.typename != color2.typename) return false;
        switch (color1.typename) {
            case 'CMYKColor':{//$.writeln(color1.typename);
                 return Math.abs(color1.black - color2.black) <= tolerance
                            && Math.abs(color1.magenta - color2.magenta) <= tolerance
                            && Math.abs(color1.cyan - color2.cyan) <= tolerance
                            && Math.abs(color1.yellow - color2.yellow) <= tolerance;}
            case 'GradientColor':{//$.writeln(color1.typename);
                            if (color1.angle != color2.angle) return false;
                            if (color1.hiliteAngle != color2.hiliteAngle) return false;
                            if (color1.hiliteLength != color2.hiliteLength) return false;
                            //if (color1.length  != color2.length) return false;//
                            if (color1.matrix.mValueA != color2.matrix.mValueA) return false;
                            if (color1.matrix.mValueB != color2.matrix.mValueB) return false;
                            if (color1.matrix.mValueC != color2.matrix.mValueC) return false;
                            if (color1.matrix.mValueD != color2.matrix.mValueD) return false;
                            if (color1.matrix.mValueTX != color2.matrix.mValueTX) return false;
                            if (color1.matrix.mValueTY != color2.matrix.mValueTY) return false;
                            //if (color1.origin[0] != color2.origin[0]) return false;//
                            //if (color1.origin[1] != color2.origin[1]) return false;//
                            if (color1.gradient.type != color2.gradient.type) return false;
                            if (color1.gradient.gradientStops.length != color2.gradient.gradientStops.length) return false;
                            for (var i=0;i<color1.gradient.gradientStops.length;i++){
                                if (color1.gradient.gradientStops[i].midPoint != color2.gradient.gradientStops[i].midPoint) return false;
                                if (color1.gradient.gradientStops[i].opacity != color2.gradient.gradientStops[i].opacity) return false;
                                if (color1.gradient.gradientStops[i].rampPoint != color2.gradient.gradientStops[i].rampPoint) return false;
                                if (!(CompareColorObjects(color1.gradient.gradientStops[i].color,color2.gradient.gradientStops[i].color, tolerance))) return false;
                                }
                return true;}
            case 'GrayColor':{//$.writeln(color1.typename);
                return Math.abs(color1.gray - color2.gray)<= tolerance;}
            case 'LabColor':{//$.writeln(color1.typename);
                return Math.abs(color1.a - color2.a)<= tolerance && Math.abs(color1.b - color2.b)<= tolerance && Math.abs(color1.l - color2.l)<= tolerance;}
            case 'NoColor':{//$.writeln(color1.typename);
                return true;}
            case 'PatternColor':{//$.writeln(color1.typename);
                return false;}
            case 'RGBColor':{//$.writeln(color1.typename);
                return Math.abs(color1.red - color2.red) <= tolerance && Math.abs(color1.blue - color2.blue) <= tolerance && Math.abs(color1.green - color2.green)<= tolerance;}
            case 'SpotColor':{//$.writeln(color1.typename);
                            if (color1.tint != color2.tint) return false;
                            if (color1.colorType != color2.colorType) return false;
                            if (color1.spotKind != color2.spotKind) return false;                            
                            if (!(CompareColorObjects(color1.spot.color,color2.spot.color, tolerance))) return false;
                            return true;
                break}
            default: return false;
            }
    }
/// ---------------------------------END  function compare colors in objects

 //////////////////////////////////////////////////////////-------------   END Functions compare and replace colors  ----------------------/////////////////////////////////////////

  if (!(checkboxFill || checkboxStroke))  {return}
  var dlg1 = new Window("palette", "SnpCreateProgressBar", {x:($.screens[0].right-$.screens[0].left)/2-50,y:($.screens[0].bottom-$.screens[0].top)/2-50,width:200,height:35},{resizeable:true,closeButton:true,maximizeButton:true,minimizeButton:true});
  var progressbar = dlg1.add("progressbar", {x:20, y:10, width:160, height:15}); progressbar.minvalue = 0;
  dlg1.show();
    if (checkboxSelected){
                 NumberReplaceObjects = 0;
                 progressbar.maxvalue = ActDoc.selection.length-1;
                for (var i=0;i<ActDoc.selection.length;i++){
                            ReplaceColorObject = false;
                            progressbar.value = i;
                            if(ToSetColorObject(ActDoc.selection[i],SwatchesInFind[IndexInSwatchesFind].color,SwatchesInReplace[IndexInSwatchesReplace].color,checkboxFill,checkboxStroke, FindTolerance, Random))
                              {
                                NumberReplaceObjects++; 
                                dlg1.update();
                                }                                
                            }
        }
    if (checkboxArtboard){
                 NumberReplaceObjects = 0;
                ActDoc.selectObjectsOnActiveArtboard();
                progressbar.maxvalue = ActDoc.selection.length-1;
                for (var i=0;i<ActDoc.selection.length;i++){
                            ReplaceColorObject = false;
                            progressbar.value = i;
                            if(ToSetColorObject(ActDoc.selection[i],SwatchesInFind[IndexInSwatchesFind].color,SwatchesInReplace[IndexInSwatchesReplace].color,checkboxFill,checkboxStroke, FindTolerance, Random))
                             {
                                NumberReplaceObjects++; 
                              dlg1.update();
                              }
                            }
           activeLayerSelect = ActDoc.activeLayer;
           ActDoc.selection = null;
           ActDoc.activeLayer = activeLayerSelect;
        }
    if (checkboxDocument){
                 NumberReplaceObjects = 0;
                progressbar.maxvalue = ActDoc.pageItems.length-1;
                 for (var i=0;i<ActDoc.pageItems.length;i++){
                            ReplaceColorObject = false;
                            progressbar.value = i;
                            if(ToSetColorObject(ActDoc.pageItems[i],SwatchesInFind[IndexInSwatchesFind].color,SwatchesInReplace[IndexInSwatchesReplace].color,checkboxFill,checkboxStroke, FindTolerance, Random)) {
                                NumberReplaceObjects++; 
                                dlg1.update();
                                }
            }
        }
    if (checkboxLayerInDocument){
               NumberReplaceObjects = 0;
                progressbar.maxvalue = ActDoc.pageItems.length-1;
                for (var i=0;i<ActDoc.activeLayer.pageItems.length;i++){
                            ReplaceColorObject = false;
                            progressbar.value = i;
                            if(ToSetColorObject(ActDoc.activeLayer.pageItems[i],SwatchesInFind[IndexInSwatchesFind].color,SwatchesInReplace[IndexInSwatchesReplace].color,checkboxFill,checkboxStroke, FindTolerance, Random))
                              {
                                NumberReplaceObjects++; 
                                dlg1.update();
                               }
                            }
        }
    if (checkboxLayerInArtboard){
               NumberReplaceObjects = 0;
               ActDoc.selectObjectsOnActiveArtboard();
               progressbar.maxvalue = ActDoc.selection.length-1;
               for (var i=0;i<ActDoc.selection.length;i++){
                     ReplaceColorObject = false;
                     progressbar.value = i;
                     if (ActDoc.selection[i].layer.name ==  ActDoc.activeLayer.name){
                            if(ToSetColorObject(ActDoc.selection[i],SwatchesInFind[IndexInSwatchesFind].color,SwatchesInReplace[IndexInSwatchesReplace].color,checkboxFill,checkboxStroke, FindTolerance, Random))
                              {
                                NumberReplaceObjects++; 
                               dlg1.update();
                              }
                            }
               }
           activeLayerSelect = ActDoc.activeLayer;
           ActDoc.selection = null;
           ActDoc.activeLayer = activeLayerSelect;
        }
    dlg1.update(); 
   if (NumberReplaceObjects == 0){ alert('The objects are not found')};
    dlg1.close();
  }

///////////////////////////////////////////////////////////////  End Function of Events  ////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////// Functions clone object(group)   don't  use ///////////////////////////////////////////////////

function cloneObject(objIn,objOut)
{
    for(var i = 0; i<objIn.children.length;i++){
      objOut.add(objIn.type,{x:objIn.children[i].bounds.x,y:objIn.children[i].bounds.y,width:objIn.children[i].bounds.width,height:objIn.children[i].bounds.height});
      if (objIn.children[i].children.length > 0){cloneObject(objIn.children[i],objOut.children[i])}
      objOut.children[i].graphics.backgroundColor = objIn.children[i].graphics.backgroundColor ;
    }
}
///////////////////////////////////////////////// End Functions clone object(group)    don't  use ///////////////////////////////////////////////////


///////////////////////////////////////////////// Functions create panel Swatches   ///////////////////////////////////////////////////

function SwatchesPanelDraw(ArraySwatchesColors,SwatchesPanel,SizeThumbnailOfButton,SizeListOfButton)  ////////////////////   error Scrollbar for each SwatchesPanel.children[SwatchesPanel.children.length-1]
    {
     ScrollbarThumbnailOfButton = SwatchesPanel.add ('scrollbar',{x:SwatchesPanel.bounds.width-20,y:0,width:15,height:SwatchesPanel.bounds.height-5});  //----Add Scroll Bar of Panel
     ScrollbarThumbnailOfButton.enabled = false;
    
    ///----------------------------   create small  Thumbnail  --------------------------------- 
     GroupThumbnailOfButton = SwatchesPanel.add('group',{x:0,y:0,width:SwatchesPanel.bounds.width-ScrollbarThumbnailOfButton.bounds.width-5,height:SwatchesPanel.bounds.height});
     SizeOfGroupOfButton(SwatchesPanel.children[SwatchesPanel.children.length-1],ArraySwatchesColors.length,SizeThumbnailOfButton.small.width,SizeThumbnailOfButton.small.height,'Thumbnail'); /////  size of group   /////
     AddButtonColorsInGroup(ArraySwatchesColors,GroupThumbnailOfButton,SizeThumbnailOfButton.small,'Thumbnail');//////////////////////  add buttons of colors in group

///----------------------------------------------/   Property of ScrollbarThumbnailOfButton            /-----------------------------------------------
     if ((GroupThumbnailOfButton.bounds.height > SwatchesPanel.bounds.height)||(GroupThumbnailOfButton.bounds.height == SwatchesPanel.bounds.height))    {
         ScrollbarThumbnailOfButton.enabled = true;///// show scrollbar     
         ScrollbarThumbnailOfButton.minvalue = 0; 
         ScrollbarThumbnailOfButton.stepdelta = 1;
         ScrollbarThumbnailOfButton.jumpdelta = 1;
         NumberRow  = GroupThumbnailOfButton.bounds.height/SizeThumbnailOfButton.small.height; 
         NumberColumn = GroupThumbnailOfButton.bounds.width/SizeThumbnailOfButton.small.width;
         ScrollbarThumbnailOfButton.maxvalue = GroupThumbnailOfButton.bounds.height - SwatchesPanel.bounds.height;
         ScrollbarThumbnailOfButton.onChange = ChangeScrollbarTableColors;
     }  ////   End  Property of ScrollbarThumbnailOfButton            /-----------------------------------------------

}
///////////////////////////////////////////////// End Functions create panel Swatches   ///////////////////////////////////////////////////


//////////////////------------------------------- Function change size group  ----------------------//////////////////
function SizeOfGroupOfButton(GroupOfButton,NumberColors,WidthOfButton,HeightOfButton,typeofview) {
    switch (typeofview) {
        case 'Thumbnail' :
            {   GroupOfButton.bounds.width = Math.floor(GroupOfButton.bounds.width/WidthOfButton)*WidthOfButton; //////////////////////// width Group
                 GroupOfButton.bounds.height = Math.ceil(NumberColors/Math.floor(GroupOfButton.bounds.width/WidthOfButton))*HeightOfButton; //////////////////////// height Group
                 break;
                }
         case 'List':
            {   GroupOfButton.bounds.height = NumberColors*HeightOfButton;  //////////////////////// height Group
                break;
                }
        default:break;
        }
}   //////////////////-------------------------------  end function change size group  ----------------------//////////////////



//////////////////-------------------------------  Function to fill  group   ----------------------//////////////////
    
function AddButtonColorsInGroup(ArraySwatches,GroupOfButtons,SizeElement,typeofview) {
    GroupOfButtons.ArraySwatches = ArraySwatches;
    switch (typeofview) { // to fill thumbnail
        case 'Thumbnail' :
            {   
                    var NumberRowInPanel =  GroupOfButtons.bounds.height/SizeElement.height;
                    var NumberColumnInPanel = GroupOfButtons.bounds.width/SizeElement.width;
                    var NumberColors = ArraySwatches.length - 1;
                    GroupOfButtons.SelectedButtonInArray = 0;// selected button with index = 0 in group
                    for (var i=0; i<NumberRowInPanel;i++) {
                        for (var j=0;j<NumberColumnInPanel;j++){
                            var k=i*NumberColumnInPanel+j;
                            if ((k > NumberRowInPanel*NumberColumnInPanel-1)||(k>NumberColors)) {break;} // - break process create buttons in CroupOfButton
                            ButtonInGroup = GroupOfButtons.add ('group', {x:j*SizeElement.width,y:i*SizeElement.height,width:SizeElement.width,height:SizeElement.height});//---- create button in Group
                            ButtonInGroup.helpTip = ArraySwatches[k].name;// ------------- name colors
                            ButtonInGroup.addEventListener( 'click', FunctionClickOnButtonColor); //------------- event of button
                            ButtonInGroup.Contour = false;
                            ButtonInGroup.IndexInArraySwatches = k;
                            SelectColorOfButton(GroupOfButtons.ArraySwatches,ButtonInGroup);
                          } // for j
                         if ((k > NumberRowInPanel*NumberColumnInPanel-1)||(k>NumberColors)) {break;}
                         } // for i
                       SelectContourButton(GroupOfButtons.children[0]);
                       GroupOfButtons.children[0].Contour = true;
             break;}//  case 'Thumbnail'
           case  'List':{break;}// to fill list     ///////////////////////////////////////////////////////////DON'T WORK///////////////////////////////////////////////////
           default: break;
           }// switsh
}
//////////////////-------------------------------End  Function to fill  group   ----------------------//////////////////

//////////////////////////////////////////////////////////-------------  Function to select color in button  ----------------------/////////////////////////////////////////
function SelectColorOfButton(ArraySwatches,ButtonColor){
    var typecolor =  ArraySwatches[ButtonColor.IndexInArraySwatches].color.typename;
    switch(typecolor) {////////////////////////   switch
        case 'NoColor':{
                               ButtonColor.graphics.backgroundColor  =  ButtonColor.graphics.newBrush(ButtonColor.graphics.BrushType.SOLID_COLOR, [1, 1, 1, 1] );
                                var x2 = ButtonColor.bounds.width-1; var y2 = 0; var x1 = 0; var y1 = ButtonColor.bounds.height-2;
                                var k = (y2-y1)/(x2-x1);
                                for (var x=x1;x<ButtonColor.bounds.width-1;x++){
                                    ButtonColor.add('group',{x:x,y:(k*(x-x1)+y1),width:2,height:2});
                                    ButtonColor.children[x].graphics.backgroundColor =  ButtonColor.children[x].graphics.newBrush ( ButtonColor.children[x].graphics.BrushType.SOLID_COLOR, [1,0,0,1]);
                                    }
                                break}//  case 'NoColor'
        case  'SpotColor': {
                            switch(ButtonColor.helpTip){
                                   case '[Registration]':{ 
                                        ButtonColor.graphics.backgroundColor  =  ButtonColor.graphics.newBrush(ButtonColor.graphics.BrushType.SOLID_COLOR, [1, 1, 1, 0.5] );
                                        BackGroungColor = ButtonColor.graphics.newBrush ( ButtonColor.graphics.BrushType.SOLID_COLOR, [0,0,0,1]);

                                        ButtonColor.add('group',{x:ButtonColor.bounds.width/2,y:2,width:1, height:ButtonColor.bounds.height-4});// draw line --
                                        ButtonColor.children[ButtonColor.children.length-1].graphics.backgroundColor = BackGroungColor;
                                        
                                        ButtonColor.add('group',{x:2,y:ButtonColor.bounds.height/2-1,width:ButtonColor.bounds.width-4, height:1});// draw line  |
                                        ButtonColor.children[ButtonColor.children.length-1].graphics.backgroundColor = BackGroungColor;

                                        ButtonColor.add('group',{x:4,y:4,width:ButtonColor.bounds.width-8, height:1});// draw rect
                                        ButtonColor.children[ButtonColor.children.length-1].graphics.backgroundColor = BackGroungColor;
                                        
                                        ButtonColor.add('group',{x:4+ButtonColor.bounds.width-8-1,y:4,width:1, height:ButtonColor.bounds.height-8});// draw rect
                                        ButtonColor.children[ButtonColor.children.length-1].graphics.backgroundColor = BackGroungColor;
                                        
                                        ButtonColor.add('group',{x:4,y:4+ButtonColor.bounds.height-8-1,width:ButtonColor.bounds.width-8, height:1});// draw rect
                                        ButtonColor.children[ButtonColor.children.length-1].graphics.backgroundColor = BackGroungColor;                                        
                                        
                                        ButtonColor.add('group',{x:4,y:4,width:1, height:ButtonColor.bounds.height-8});// draw rect
                                        ButtonColor.children[ButtonColor.children.length-1].graphics.backgroundColor = BackGroungColor;

                                        break;}
                                    default:  switch(ArraySwatches[ButtonColor.IndexInArraySwatches].color.spot.color.typename){
                                                        case 'RGBColor':{
                                                                    red = ArraySwatches[ButtonColor.IndexInArraySwatches].color.spot.color.red/256;
                                                                    green = ArraySwatches[ButtonColor.IndexInArraySwatches].color.spot.color.green/256;
                                                                    blue = ArraySwatches[ButtonColor.IndexInArraySwatches].color.spot.color.blue/256;
                                                                    TintOfColor = ArraySwatches[ButtonColor.IndexInArraySwatches].color.tint/100;
                                                                    ButtonColor.graphics.backgroundColor  =  ButtonColor.graphics.newBrush( ButtonColor.graphics.BrushType.SOLID_COLOR, [red, green, blue,TintOfColor] );
                                                                    break}//  RGBColor
                                                        case 'CMYKColor': { 
                                                                    cyan = ArraySwatches[ButtonColor.IndexInArraySwatches].color.spot.color.cyan/100;
                                                                    magenta = ArraySwatches[ButtonColor.IndexInArraySwatches].color.spot.color.magenta/100;
                                                                    yellow = ArraySwatches[ButtonColor.IndexInArraySwatches].color.spot.color.yellow/100;
                                                                    black = ArraySwatches[ButtonColor.IndexInArraySwatches].color.spot.color.black/100;
                                                                    red = 1 - (cyan*(1-black)+black);
                                                                    green = 1 - (magenta*(1-black)+black);
                                                                    blue = 1 - (yellow*(1-black)+black);
                                                                    TintOfColor = 1;
                                                                    ButtonColor.graphics.backgroundColor  =  ButtonColor.graphics.newBrush( ButtonColor.graphics.BrushType.SOLID_COLOR, [red, green, blue,TintOfColor] );
                                                                    break; } //  CMYKColor
                                                        case 'LabColor': {
                                                                    a = ArraySwatches[ButtonColor.IndexInArraySwatches].color.spot.color.a;
                                                                    b = ArraySwatches[ButtonColor.IndexInArraySwatches].color.spot.color.b;
                                                                    L = ArraySwatches[ButtonColor.IndexInArraySwatches].color.spot.color.l;
                                                                    var_Y = ( L + 16 ) / 116;
                                                                    var_X = a / 500 + var_Y;
                                                                    var_Z = var_Y - b / 200;
                                                                    if ( var_Y^3 > 0.008856 ) {var_Y = var_Y^3} else{var_Y = ( var_Y - 16 / 116 ) / 7.787}
                                                                    if ( var_X^3 > 0.008856 ) {var_X = var_X^3}else{var_X = ( var_X - 16 / 116 ) / 7.787}
                                                                    if ( var_Z^3 > 0.008856 ) {var_Z = var_Z^3}else{var_Z = ( var_Z - 16 / 116 ) / 7.787}
                                                                    X = ref_X * var_X; 
                                                                    Y = ref_Y * var_Y;
                                                                    Z = ref_Z * var_Z;
                                                                    var_X = X/100;        //X from 0 to  95.047      (Observer = 2°, Illuminant = D65)
                                                                    var_Y = Y/100;        //Y from 0 to 100.000
                                                                    var_Z = Z/100;        //Z from 0 to 108.883
                                                                    var_R = var_X *  3.2406 + var_Y * -1.5372 + var_Z * -0.4986;
                                                                    var_G = var_X * -0.9689 + var_Y *  1.8758 + var_Z *  0.0415;
                                                                    var_B = var_X *  0.0557 + var_Y * -0.2040 + var_Z *  1.0570;
                                                                    if ( var_R > 0.0031308 ) {var_R = 1.055 * ( var_R ^ ( 1 / 2.4 ) ) - 0.055}else{var_R = 12.92 * var_R}
                                                                    if ( var_G > 0.0031308 ) {var_G = 1.055 * ( var_G ^ ( 1 / 2.4 ) ) - 0.055}else{var_G = 12.92 * var_G}
                                                                    if ( var_B > 0.0031308 ) {var_B = 1.055 * ( var_B ^ ( 1 / 2.4 ) ) - 0.055}else{var_B = 12.92 * var_B}
                                                                    red = var_R;
                                                                    green = var_G;
                                                                    blue = var_B;
                                                                    TintOfColor = 1;
                                                                    ButtonColor.graphics.backgroundColor  =  ButtonColor.graphics.newBrush( ButtonColor.graphics.BrushType.SOLID_COLOR, [red, green, blue,TintOfColor] );
                                                                    break;} //  LabColor
                                                          default: {alert(ArraySwatches[ButtonColor.IndexInArraySwatches].color.spot.color.typename);break;}
                                                          } // switch
                                        break;}
                            break;}//  case  'SpotColor'
         case 'CMYKColor': {//$.writeln(' CMYKColor: '+ButtonColor.IndexInArraySwatches);
                            cyan = ArraySwatches[ButtonColor.IndexInArraySwatches].color.cyan/100;
                            magenta = ArraySwatches[ButtonColor.IndexInArraySwatches].color.magenta/100;
                            yellow = ArraySwatches[ButtonColor.IndexInArraySwatches].color.yellow/100;
                            black = ArraySwatches[ButtonColor.IndexInArraySwatches].color.black/100;
                            red = 1 - (cyan*(1-black)+black);
                            green = 1 - (magenta*(1-black)+black);
                            blue = 1 - (yellow*(1-black)+black);
                            TintOfColor = 1;
                            ButtonColor.graphics.backgroundColor  =  ButtonColor.graphics.newBrush( ButtonColor.graphics.BrushType.SOLID_COLOR, [red, green, blue,TintOfColor] );
             break}                                
         case 'GradientColor': {
                                              var ColorRGB = new Array();
                                               for (var i=0;i<ArraySwatches[ButtonColor.IndexInArraySwatches].color.gradient.gradientStops.length;i++)
                                                     {
                                                        ColorRGB[i] = new Object();
                                                        switch (ArraySwatches[ButtonColor.IndexInArraySwatches].color.gradient.gradientStops[i].color.typename){
                                                            case 'GrayColor':
                                                                    {ColorRGB[i].red =  ColorRGB[i].blue = ColorRGB[i].green =  (100-ArraySwatches[ButtonColor.IndexInArraySwatches].color.gradient.gradientStops[i].color.gray)/100;
                                                                     ColorRGB[i].rampPoint  = ArraySwatches[ButtonColor.IndexInArraySwatches].color.gradient.gradientStops[i].rampPoint;
                                                                     break;} 
                                                            case 'RGBColor':
                                                                    {ColorRGB[i].red = ArraySwatches[ButtonColor.IndexInArraySwatches].color.gradient.gradientStops[i].color.red/256;
                                                                    ColorRGB[i].blue = ArraySwatches[ButtonColor.IndexInArraySwatches].color.gradient.gradientStops[i].color.blue/256;
                                                                    ColorRGB[i].green =  ArraySwatches[ButtonColor.IndexInArraySwatches].color.gradient.gradientStops[i].color.green/256;
                                                                    ColorRGB[i].rampPoint  = ArraySwatches[ButtonColor.IndexInArraySwatches].color.gradient.gradientStops[i].rampPoint;
                                                                    break;}
                                                            case 'CMYKColor':
                                                                    {cyan = ArraySwatches[ButtonColor.IndexInArraySwatches].color.gradient.gradientStops[i].color.cyan/100;
                                                                      magenta = ArraySwatches[ButtonColor.IndexInArraySwatches].color.gradient.gradientStops[i].color.magenta/100;
                                                                      yellow = ArraySwatches[ButtonColor.IndexInArraySwatches].color.gradient.gradientStops[i].color.yellow/100;
                                                                      black = ArraySwatches[ButtonColor.IndexInArraySwatches].color.gradient.gradientStops[i].color.black/100;
                                                                      ColorRGB[i].red = 1 - (cyan*(1-black)+black);
                                                                      ColorRGB[i].green = 1 - (magenta*(1-black)+black);
                                                                      ColorRGB[i].blue = 1 - (yellow*(1-black)+black);
                                                                      ColorRGB[i].rampPoint  = ArraySwatches[ButtonColor.IndexInArraySwatches].color.gradient.gradientStops[i].rampPoint;
                                                                      break;}
                                                             default: {alert(ArraySwatches[ButtonColor.IndexInArraySwatches].color.gradient.gradientStops[i].color.typename);break;} 
                                                         } // switch
                                                 }// for
                                                 GradientToFill(ButtonColor,ColorRGB,ArraySwatches[ButtonColor.IndexInArraySwatches].color.gradient.type);
                                                 ColorRGB.delete;break}
         case 'GrayColor': {//$.writeln('GrayColor: '+ButtonColor.IndexInArraySwatches);
                red =  blue = green =  (100 - ArraySwatches[ButtonColor.IndexInArraySwatches].color.gray)/100;
                TintOfColor = 1;
                ButtonColor.graphics.backgroundColor  =  ButtonColor.graphics.newBrush( ButtonColor.graphics.BrushType.SOLID_COLOR, [red, green, blue,TintOfColor] );
             break}                                
         case 'LabColor': {
                         //alert('LabColor: '+ButtonColor.IndexInArraySwatches);
                         ButtonColor.graphics.backgroundColor  =  ButtonColor.graphics.newBrush(ButtonColor.graphics.BrushType.SOLID_COLOR, [1, 1, 1, 1] );
                          var x2 = ButtonColor.bounds.width-1; var y2 = 0; 
                          var x1 = 0; var y1 = ButtonColor.bounds.height-2;
                          var k = (y2-y1)/(x2-x1);
                          for (var x=x1;x<ButtonColor.bounds.width-1;x++){
                                 ButtonColor.add('group',{x:x,y:(k*(x-x1)+y1),width:2,height:2});
                                 ButtonColor.children[ButtonColor.children.length-1].graphics.backgroundColor =  ButtonColor.children[ButtonColor.children.length-1].graphics.newBrush(ButtonColor.children[ButtonColor.children.length-1].graphics.BrushType.SOLID_COLOR, [1,0,0,1]);
                                 }             
                          x2 = ButtonColor.bounds.width-1; y2 = ButtonColor.bounds.height-2; 
                          x1 = 0; y1 = 0;
                          k = (y2-y1)/(x2-x1);
                          for (x=x1;x<ButtonColor.bounds.width-1;x++){
                                 ButtonColor.add('group',{x:x,y:(k*(x-x1)+y1),width:2,height:2});
                                 ButtonColor.children[ButtonColor.children.length-1].graphics.backgroundColor =  ButtonColor.children[ButtonColor.children.length-1].graphics.newBrush(ButtonColor.children[ButtonColor.children.length-1].graphics.BrushType.SOLID_COLOR, [1,0,0,1]);
                                 }                         
                         break}                                
         case 'PatternColor': {
                         //alert('PatternColor: '+ButtonColor.IndexInArraySwatches);
                         ButtonColor.graphics.backgroundColor  =  ButtonColor.graphics.newBrush(ButtonColor.graphics.BrushType.SOLID_COLOR, [1, 1, 1, 1] );
                          var x2 = ButtonColor.bounds.width-1; var y2 = 0; 
                          var x1 = 0; var y1 = ButtonColor.bounds.height-2;
                          var k = (y2-y1)/(x2-x1);
                          for (var x=x1;x<ButtonColor.bounds.width-1;x++){
                                 ButtonColor.add('group',{x:x,y:(k*(x-x1)+y1),width:2,height:2});
                                 ButtonColor.children[ButtonColor.children.length-1].graphics.backgroundColor =  ButtonColor.children[ButtonColor.children.length-1].graphics.newBrush(ButtonColor.children[ButtonColor.children.length-1].graphics.BrushType.SOLID_COLOR, [1,0,0,1]);
                                 }             
                          x2 = ButtonColor.bounds.width-1; y2 = ButtonColor.bounds.height-2; 
                          x1 = 0; y1 = 0;
                          k = (y2-y1)/(x2-x1);
                          for (x=x1;x<ButtonColor.bounds.width-1;x++){
                                 ButtonColor.add('group',{x:x,y:(k*(x-x1)+y1),width:2,height:2});
                                 ButtonColor.children[ButtonColor.children.length-1].graphics.backgroundColor =  ButtonColor.children[ButtonColor.children.length-1].graphics.newBrush(ButtonColor.children[ButtonColor.children.length-1].graphics.BrushType.SOLID_COLOR, [1,0,0,1]);
                                 }
                break}  
         case 'RGBColor': {
                red = ArraySwatches[ButtonColor.IndexInArraySwatches].color.red/256;
                green = ArraySwatches[ButtonColor.IndexInArraySwatches].color.green/256;
                blue = ArraySwatches[ButtonColor.IndexInArraySwatches].color.blue/256;
                TintOfColor = 1;
                ButtonColor.graphics.backgroundColor  =  ButtonColor.graphics.newBrush( ButtonColor.graphics.BrushType.SOLID_COLOR, [red, green, blue,TintOfColor] );
             break}
        default:{break}
        }//////////////////////////////////////     end switch
//return
    }
//////////////////////////////////////////////////////////-------------  End Function to select color in button  ----------------------/////////////////////////////////////////


//////////////////////////////////////////////////////////-------------  Function to select contour in button  ----------------------/////////////////////////////////////////

function SelectContourButton(ButtonColor){
with (ButtonColor) {
     if (!(Contour)){
     add('group',{x:1,y:1,width:1,height:bounds.height-2});
     children[children.length-1].graphics.backgroundColor = children[children.length-1].graphics.newBrush(children[children.length-1].graphics.BrushType.SOLID_COLOR, [0, 0, 0,1]);
     add('group',{x:bounds.width-2,y:1,width:1,height:bounds.height-2});
     children[children.length-1].graphics.backgroundColor = children[children.length-1].graphics.newBrush(children[children.length-1].graphics.BrushType.SOLID_COLOR, [0, 0, 0,1]);
     add('group',{x:1,y:1,width:bounds.width-2,height:1});
     children[children.length-1].graphics.backgroundColor = children[children.length-1].graphics.newBrush(children[children.length-1].graphics.BrushType.SOLID_COLOR, [0, 0, 0,1]);
     add('group',{x:0,y:bounds.height-2,width:bounds.width-2,height:1});
     children[children.length-1].graphics.backgroundColor = children[children.length-1].graphics.newBrush(children[children.length-1].graphics.BrushType.SOLID_COLOR, [0, 0, 0,1]);
     add('group',{x:0,y:0,width:1,height:bounds.height});
     children[children.length-1].graphics.backgroundColor = children[children.length-1].graphics.newBrush(children[children.length-1].graphics.BrushType.SOLID_COLOR, [1, 1, 1,1]);
     add('group',{x:bounds.width-1,y:0,width:1,height:bounds.height});
     children[children.length-1].graphics.backgroundColor = children[children.length-1].graphics.newBrush(children[children.length-1].graphics.BrushType.SOLID_COLOR, [1, 1, 1,1]);
     add('group',{x:0,y:0,width:bounds.width,height:1});
     children[children.length-1].graphics.backgroundColor = children[children.length-1].graphics.newBrush(children[children.length-1].graphics.BrushType.SOLID_COLOR, [1, 1, 1,1]);
     add('group',{x:0,y:bounds.height-1,width:bounds.width,height:1});
     children[children.length-1].graphics.backgroundColor = children[children.length-1].graphics.newBrush(children[children.length-1].graphics.BrushType.SOLID_COLOR, [1, 1, 1,1]);
     }
 }
}
//////////////////////////////////////////////////////////-------------  End Function to select contour in button  ----------------------/////////////////////////////////////////

//////////////////////////////////////////////////////////-------------  Function to show/hide contour in button  ----------------------/////////////////////////////////////////
function ContourHideShow(ButtonColor) {
        if (!(ButtonColor.Contour)){return}
        for(var i=ButtonColor.children.length-8;i<ButtonColor.children.length;i++){
            ButtonColor.children[i].visible = !(ButtonColor.children[i].visible);
            }
    }
//////////////////////////////////////////////////////////-------------  End Function to show/hide contour in button  ----------------------/////////////////////////////////////////

//////////////////////////////////////////////////////////-------------  Function to replace in container of  FIND/REPLACE ----------------------/////////////////////////////////////////
function SelectContainerFromButtonColorInFindReplace(ButtonColor,TypeGroup) {
    var i;
    switch (TypeGroup) {
        case 'FIND': {
                    CopyGroups(ButtonColor,ButtonSwatchesFind);
                    ButtonSwatchesFind.IndexInArraySwatches = ButtonColor.IndexInArraySwatches;
                    StaticTextNameOfColorFind.text = ButtonColor.helpTip;            
                    break;}
        case 'REPLACE':{
                    CopyGroups(ButtonColor,ButtonSwatchesReplace);
                    ButtonSwatchesReplace.IndexInArraySwatches = ButtonColor.IndexInArraySwatches;
                    StaticTextNameOfColorReplace.text = ButtonColor.helpTip;  
                    break;}
        default:{break};
        }return;
    }
//////////////////////////////////////////////////////////-------------  End Function to replace in container of  FIND/REPLACE ----------------------/////////////////////////////////////////

//////////////////////////////////////////////////////////-------------   Function to copy of group to group  ----------------------/////////////////////////////////////////

function CopyGroups(GroupIn,GroupOut){
    GroupOut.graphics.backgroundColor =  GroupIn.graphics.backgroundColor;
        if (GroupOut.children.length > 0){while (GroupOut.children.length>0){GroupOut.remove(GroupOut.children.length-1)}};
        if (GroupIn.children.length > 0) {
            for (var i=0;i<GroupIn.children.length;i++){
                GroupOut.add(GroupIn.children[i].type,{x:GroupIn.children[i].bounds.x,y:GroupIn.children[i].bounds.y, width:GroupIn.children[i].bounds.width,height:GroupIn.children[i].bounds.height},i);
                GroupOut.children[i].graphics.backgroundColor = GroupIn.children[i].graphics.backgroundColor;
        }
      }return
 }
    
//////////////////////////////////////////////////////////-------------   End  Function to copy of group to group  ----------------------/////////////////////////////////////////

//////////////////////////////////////////////////////////-------------   Function to create background button of gradient  ----------------------/////////////////////////////////////////

function GradientToFill(GroupConteiner,colorRGB,GradientTypeFill)
{
  switch(GradientTypeFill){
   case  GradientType.RADIAL:{
    if(($.os.indexOf('Macintosh',0)>-1)||($.os.indexOf('Windows',0)>-1)){
    var PointsInGroup = new Array();
    if (colorRGB[0].rampPoint < 100){
            PointsInGroup[0] = new Object(); 
            PointsInGroup[0].x0 = Math.round(GroupConteiner.bounds.width/2)-1;
            PointsInGroup[0].y0 = Math.round(GroupConteiner.bounds.height/2)-1;
            PointsInGroup[0].red = colorRGB[0].red;  PointsInGroup[0].green = colorRGB[0].green;  PointsInGroup[0].blue = colorRGB[0].blue;
            PointsInGroup[1] = new Object(); 
            PointsInGroup[1].x0 =  Math.round(PointsInGroup[0].x0-PointsInGroup[0].x0*colorRGB[0].rampPoint/100);
            PointsInGroup[1].y0 =  Math.round(PointsInGroup[0].y0-PointsInGroup[0].y0*colorRGB[0].rampPoint/100);
            PointsInGroup[1].red = colorRGB[0].red;  PointsInGroup[1].green = colorRGB[0].green;  PointsInGroup[1].blue = colorRGB[0].blue;
            
     }else{
            PointsInGroup[0] = new Object(); PointsInGroup[0].x0 =Math.round(GroupConteiner.bounds.width/2)-1;PointsInGroup[0].y0 = Math.round(GroupConteiner.bounds.height/2)-1;
            PointsInGroup[0].red = colorRGB[0].red;  PointsInGroup[0].green = colorRGB[0].green;  PointsInGroup[0].blue = colorRGB[0].blue;
     }
    
    for (var i=1;i<colorRGB.length-1;i++){
            PointsInGroup[PointsInGroup.length] = new Object();
            PointsInGroup[PointsInGroup.length-1].x0 =  Math.round(PointsInGroup[0].x0-PointsInGroup[0].x0*colorRGB[i].rampPoint/100);
            PointsInGroup[PointsInGroup.length-1].y0 =  Math.round(PointsInGroup[0].y0-PointsInGroup[0].y0*colorRGB[i].rampPoint/100);
            PointsInGroup[PointsInGroup.length-1].red = colorRGB[i].red;
            PointsInGroup[PointsInGroup.length-1].blue = colorRGB[i].blue;
            PointsInGroup[PointsInGroup.length-1].green = colorRGB[i].green;
        }
    if(colorRGB[colorRGB.length-1].rampPoint > 0){
            PointsInGroup[PointsInGroup.length] = new Object();
            PointsInGroup[PointsInGroup.length-1].x0 =  Math.round(PointsInGroup[0].x0-PointsInGroup[0].x0*colorRGB[colorRGB.length-1].rampPoint/100);
            PointsInGroup[PointsInGroup.length-1].y0 =  Math.round(PointsInGroup[0].y0-PointsInGroup[0].y0*colorRGB[colorRGB.length-1].rampPoint/100);
            PointsInGroup[PointsInGroup.length-1].red = colorRGB[colorRGB.length-1].red;
            PointsInGroup[PointsInGroup.length-1].blue = colorRGB[colorRGB.length-1].blue;
            PointsInGroup[PointsInGroup.length-1].green = colorRGB[colorRGB.length-1].green;
            PointsInGroup[PointsInGroup.length] = new Object();
            PointsInGroup[PointsInGroup.length-1].x0 =  0;
            PointsInGroup[PointsInGroup.length-1].y0 =  0;
            PointsInGroup[PointsInGroup.length-1].red = colorRGB[colorRGB.length-1].red;
            PointsInGroup[PointsInGroup.length-1].blue = colorRGB[colorRGB.length-1].blue;
            PointsInGroup[PointsInGroup.length-1].green = colorRGB[colorRGB.length-1].green;            
        }else{
            PointsInGroup[PointsInGroup.length] = new Object();
            PointsInGroup[PointsInGroup.length-1].x0 =  0;
            PointsInGroup[PointsInGroup.length-1].y0 =  0;
            PointsInGroup[PointsInGroup.length-1].red = colorRGB[colorRGB.length-1].red;
            PointsInGroup[PointsInGroup.length-1].blue = colorRGB[colorRGB.length-1].blue;
            PointsInGroup[PointsInGroup.length-1].green = colorRGB[colorRGB.length-1].green;
        }
        var xwidth = 1;
        var yheight = 1;    

        for (i=PointsInGroup.length-2;i>-1;i--)
        {
            if ((PointsInGroup[i+1].red-PointsInGroup[i].red)+(PointsInGroup[i+1].blue-PointsInGroup[i].blue)+(PointsInGroup[i+1].green-PointsInGroup[i].green) == 0)
                {GroupConteiner.add('group',{x:PointsInGroup[i+1].x0,y:PointsInGroup[i+1].y0,width:(GroupConteiner.bounds.width - PointsInGroup[i+1].x0*2),height:(GroupConteiner.bounds.height - PointsInGroup[i+1].y0*2)});
                 GroupConteiner.children[GroupConteiner.children.length-1].graphics.backgroundColor = GroupConteiner.children[GroupConteiner.children.length-1].graphics.newBrush(GroupConteiner.children[GroupConteiner.children.length-1].graphics.BrushType.SOLID_COLOR, [PointsInGroup[i].red,PointsInGroup[i].green,PointsInGroup[i].blue]);
                 GroupConteiner.children[GroupConteiner.children.length-1].helpTip = GroupConteiner.helpTip;
                  }else{
                                var redstep = (PointsInGroup[i+1].red-PointsInGroup[i].red)/(PointsInGroup[i+1].x0-PointsInGroup[i].x0);
                                var bluestep = (PointsInGroup[i+1].blue-PointsInGroup[i].blue)/(PointsInGroup[i+1].x0-PointsInGroup[i].x0);
                                var greenstep = (PointsInGroup[i+1].green-PointsInGroup[i].green)/(PointsInGroup[i+1].x0-PointsInGroup[i].x0);
                                var red = PointsInGroup[i+1].red;
                                var blue = PointsInGroup[i+1].blue;
                                var green = PointsInGroup[i+1].green;
                                var x0 = PointsInGroup[i+1].x0;
                                var y0 = PointsInGroup[i+1].y0;
                                while ((x0<PointsInGroup[i].x0)&&(y0<PointsInGroup[i].y0))
                                {
                                            GroupConteiner.add('group',{x:x0,y:y0,width:(GroupConteiner.children[GroupConteiner.children.length-1].bounds.width-xwidth*2),height:(GroupConteiner.children[GroupConteiner.children.length-1].bounds.height-yheight*2)});
                                            GroupConteiner.children[GroupConteiner.children.length-1].graphics.backgroundColor = GroupConteiner.children[GroupConteiner.children.length-1].graphics.newBrush(GroupConteiner.children[GroupConteiner.children.length-1].graphics.BrushType.SOLID_COLOR,[red,green,blue]);
                                            GroupConteiner.children[GroupConteiner.children.length-1].helpTip = GroupConteiner.helpTip;
                                            red = red + redstep;
                                            blue = blue + bluestep;
                                            green = green + greenstep;
                                            x0 = x0 + xwidth;
                                            y0 = y0 + yheight;
                                }
                           }
         }
   PointsInGroup.splice(-1);break;
  }
  }// case

   case  GradientType.LINEAR:{
    var PointsInGroup = new Array();
    if (colorRGB[0].rampPoint >0 ){
            PointsInGroup[0] = new Object(); 
            PointsInGroup[0].x0 = 0;
            PointsInGroup[0].y0 = 0;
            PointsInGroup[0].red = colorRGB[0].red;  PointsInGroup[0].green = colorRGB[0].green;  PointsInGroup[0].blue = colorRGB[0].blue;
            PointsInGroup[1] = new Object(); 
            PointsInGroup[1].x0 =  Math.round(GroupConteiner.bounds.width*colorRGB[0].rampPoint/100);
            PointsInGroup[1].y0 =  0;
            PointsInGroup[1].red = colorRGB[0].red;  PointsInGroup[1].green = colorRGB[0].green;  PointsInGroup[1].blue = colorRGB[0].blue;
            
     }else{
            PointsInGroup[0] = new Object(); PointsInGroup[0].x0 =0;PointsInGroup[0].y0 = 0;
            PointsInGroup[0].red = colorRGB[0].red;  PointsInGroup[0].green = colorRGB[0].green;  PointsInGroup[0].blue = colorRGB[0].blue;
     }
    
    for (var i=1;i<colorRGB.length-1;i++){
            PointsInGroup[PointsInGroup.length] = new Object();
            PointsInGroup[PointsInGroup.length-1].x0 =  Math.round(GroupConteiner.bounds.width*colorRGB[i].rampPoint/100);
            PointsInGroup[PointsInGroup.length-1].y0 =  0;
            PointsInGroup[PointsInGroup.length-1].red = colorRGB[i].red;
            PointsInGroup[PointsInGroup.length-1].blue = colorRGB[i].blue;
            PointsInGroup[PointsInGroup.length-1].green = colorRGB[i].green;
        }
    if(colorRGB[colorRGB.length-1].rampPoint < 100){
            PointsInGroup[PointsInGroup.length] = new Object();
            PointsInGroup[PointsInGroup.length-1].x0 =  Math.round(GroupConteiner.bounds.width*colorRGB[colorRGB.length-1].rampPoint/100);
            PointsInGroup[PointsInGroup.length-1].y0 =  0;
            PointsInGroup[PointsInGroup.length-1].red = colorRGB[colorRGB.length-1].red;
            PointsInGroup[PointsInGroup.length-1].blue = colorRGB[colorRGB.length-1].blue;
            PointsInGroup[PointsInGroup.length-1].green = colorRGB[colorRGB.length-1].green;
            PointsInGroup[PointsInGroup.length] = new Object();
            PointsInGroup[PointsInGroup.length-1].x0 =  GroupConteiner.bounds.width-1;
            PointsInGroup[PointsInGroup.length-1].y0 =  0;
            PointsInGroup[PointsInGroup.length-1].red = colorRGB[colorRGB.length-1].red;
            PointsInGroup[PointsInGroup.length-1].blue = colorRGB[colorRGB.length-1].blue;
            PointsInGroup[PointsInGroup.length-1].green = colorRGB[colorRGB.length-1].green;            
        }else{
            PointsInGroup[PointsInGroup.length] = new Object();
            PointsInGroup[PointsInGroup.length-1].x0 =  GroupConteiner.bounds.width-1;
            PointsInGroup[PointsInGroup.length-1].y0 =  0;
            PointsInGroup[PointsInGroup.length-1].red = colorRGB[colorRGB.length-1].red;
            PointsInGroup[PointsInGroup.length-1].blue = colorRGB[colorRGB.length-1].blue;
            PointsInGroup[PointsInGroup.length-1].green = colorRGB[colorRGB.length-1].green;
        }
        var xwidth = 1;
        var yheight = 1;  
        for (i=0;i<PointsInGroup.length-1;i++)
        {
            if ((PointsInGroup[i+1].red-PointsInGroup[i].red)+(PointsInGroup[i+1].blue-PointsInGroup[i].blue)+(PointsInGroup[i+1].green-PointsInGroup[i].green) == 0)
                {GroupConteiner.add('group',{x:PointsInGroup[i].x0,y:0,width:(PointsInGroup[i+1].x0 - PointsInGroup[i].x0),height:GroupConteiner.bounds.height});
                  GroupConteiner.children[GroupConteiner.children.length-1].graphics.backgroundColor = GroupConteiner.children[GroupConteiner.children.length-1].graphics.newBrush(GroupConteiner.children[GroupConteiner.children.length-1].graphics.BrushType.SOLID_COLOR, [PointsInGroup[i].red,PointsInGroup[i].green,PointsInGroup[i].blue]);
                  GroupConteiner.children[GroupConteiner.children.length-1].helpTip = GroupConteiner.helpTip;
                  }else{
                                var redstep = (PointsInGroup[i+1].red-PointsInGroup[i].red)/(PointsInGroup[i+1].x0-PointsInGroup[i].x0);
                                var bluestep = (PointsInGroup[i+1].blue-PointsInGroup[i].blue)/(PointsInGroup[i+1].x0-PointsInGroup[i].x0);
                                var greenstep = (PointsInGroup[i+1].green-PointsInGroup[i].green)/(PointsInGroup[i+1].x0-PointsInGroup[i].x0);
                                var red = PointsInGroup[i].red;
                                var blue = PointsInGroup[i].blue;
                                var green = PointsInGroup[i].green;
                                var x0 = PointsInGroup[i].x0;
                                var y0 = PointsInGroup[i].y0;
                                while (x0<PointsInGroup[i+1].x0)
                                {
                                            GroupConteiner.add('group',{x:x0,y:0,width:xwidth,height:GroupConteiner.bounds.height});
                                            GroupConteiner.children[GroupConteiner.children.length-1].graphics.backgroundColor = GroupConteiner.children[GroupConteiner.children.length-1].graphics.newBrush(GroupConteiner.children[GroupConteiner.children.length-1].graphics.BrushType.SOLID_COLOR,[red,green,blue]);
                                            GroupConteiner.children[GroupConteiner.children.length-1].helpTip = GroupConteiner.helpTip;                                            
                                            red = red + redstep;
                                            blue = blue + bluestep;
                                            green = green + greenstep;
                                            x0 = x0 + xwidth;
                                            y0 = y0 + yheight;
                                }
                           }
         }
       PointsInGroup.splice(-1);
       break;
       }
   }
 }
 //////////////////////////////////////////////////////////-------------   End of Function to create background button of gradient  ----------------------/////////////////////////////////////////
 




////////////////////////////////////////////////// Main Programm  //////////////////////////////////////////////////////////////////////
   
    if (app.documents.length  != 0) { //------------fill ListBox of SwatchesGroup
        ActDoc = app.activeDocument;//---- active document
        switch (ActDoc.documentColorSpace) {
            case DocumentColorSpace.CMYK:{SliderFindTolerance.maxvalue = 100;break}
            case DocumentColorSpace.RGB:{SliderFindTolerance.maxvalue = 255;break}
            default:{SliderFindTolerance.maxvalue = 100;break}
            }
        if (ActDoc.swatchGroups.length > 0) {//
                for (i=0;i<ActDoc.swatchGroups.length;i++)  {// to fill ListBoxGroupSwatchesFind and ListBoxGroupSwatchesReplace
                    if((ActDoc.swatchGroups[i].getAllSwatches()).length > 0) {// Null SwatcheGroup
                        if((ActDoc.swatchGroups[i].name).length == 0) {
                            ListBoxGroupSwatchesFind.add('item','No group name');
                            ListBoxGroupSwatchesReplace.add('item','No group name');
                            }
                        if((ActDoc.swatchGroups[i].name).length > 0) {
                            ListBoxGroupSwatchesFind.add('item',ActDoc.swatchGroups[i].name);
                            ListBoxGroupSwatchesReplace.add('item',ActDoc.swatchGroups[i].name)
                            }
                        SwatchesPanelFind.add('group',{x:0,y:0,width:SwatchesPanelFind.bounds.width,height:SwatchesPanelFind.bounds.height});
                        SwatchesPanelFind.children[i].visible = false;
                        SwatchesPanelFind.children[i].ArraySwatchesColors = ActDoc.swatchGroups[i].getAllSwatches();
                        SwatchesPanelDraw(SwatchesPanelFind.children[i].ArraySwatchesColors, SwatchesPanelFind.children[i],SizeThumbnailOfButtonInPanelDlg,SizeListOfButtonInPanelDlg);
                        SwatchesPanelReplace.add('group',{x:0,y:0,width:SwatchesPanelReplace.bounds.width,height:SwatchesPanelReplace.bounds.height});
                        SwatchesPanelReplace.children[i].visible = false;
                        SwatchesPanelReplace.children[i].ArraySwatchesColors = ActDoc.swatchGroups[i].getAllSwatches();
                        SwatchesPanelDraw(SwatchesPanelReplace.children[i].ArraySwatchesColors, SwatchesPanelReplace.children[i],SizeThumbnailOfButtonInPanelDlg,SizeListOfButtonInPanelDlg);                    
                }// (i=0;i<ActDoc.swatchGroups.length;i++)
              }//if((ActDoc.swatchGroups[i].getAllSwatches()).length > 0)
            }// if (ActDoc.swatchGroups.length > 0)
        
        SwatchesPanelFind.children[0].visible = true;
        SwatchesPanelReplace.children[0].visible = true;
        ListBoxGroupSwatchesFind.selection = 0;
        ListBoxGroupSwatchesReplace.selection = 0;
        ListBoxGroupSwatchesFind.addEventListener( 'change', ChangeListSwatches);
        ListBoxGroupSwatchesReplace.addEventListener( 'change', ChangeListSwatches);
        SelectContainerFromButtonColorInFindReplace(SwatchesPanelFind.children[0].children[1].children[0],'FIND');
        SelectContainerFromButtonColorInFindReplace(SwatchesPanelReplace.children[0].children[1].children[0],'REPLACE');
       
       dlg.show(); // ------------------------------ to show window  --------------------------
      }//  if (app.documents.length  != 0)
      else {alert ('Not open Document');}

////////////////////////////////////////////////// end Main Programm  //////////////////////////////////////////////////////////////////////
