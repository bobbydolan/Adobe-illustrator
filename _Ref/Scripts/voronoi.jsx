#target "illustrator"
#include "lib/rhill-voronoi-core.js"
// This script requires 'rhill-voronoi-core.js' (by gorhill)
// https://github.com/gorhill/Javascript-Voronoi
// The directive on the second line assumes "rhill-voronoi-core.js" is
// placed under "lib" folder under "Scripts" folder of Adobe Illlustrator.
// ----

// This script draws a Voronoi diagram based on the central coordinate of
// each object in current selection.
// The object which has the largest size (width or height) in the selection
// is used for the bounds for drawing.
// (Therefore, make sure to include the object becoming the bounds (=frame)
// in the selection.  This object is excluded from the targets for the
// Voronoi calculation.)
// The objects located outside of this bounds are ignored.
// The lines drawn are put into a group.  And the filled paths are put into
// another group.

// test env: Adobe Illustrator CS3, CC2015
// (CS3 needs a minor modification to include directive.
//  See inside "lib" folder for details)

// Copyright(c) 2016 Hiroyuki Sato
// https://github.com/shspage
// This script is distributed under the MIT License.
// See the LICENSE.txt file for details.
// ----
//
// This script is a modification of following script.
// voronoi_from_selection.jsx
// Copyright (c)  2012 Fabian "fabiantheblind" Moron Zirfas
// Licensed under The MIT License
// https://github.com/fabiantheblind/Illustrator-Javascript-Voronoi

// This script requires 'rhill-voronoi-core.js'
// Copyright (c) 2010-2013 Raymond Hill
// Licensed under The MIT License
// https://github.com/gorhill/Javascript-Voronoi

(function(){
    // configurations --------
    // drawPolygons:  true or false. true to create filled paths
    // drawLines:     true or false. true to create stroked paths
    // strokeWidth:   stroke width in point
    var _conf = {
        drawPolygons : true,  // cells
        drawLines : true,     // edges
        strokeWidth : 1
    }

    // strings to localize
    var ERROR_NO_DOCUMENT  = "ERROR\nPlease open a document\nand add some objects";
    var ERROR_LESS_SELECTION = "ERROR\nPlease select at least 3 objects";
    var ERROR_LESS_OBJECTS_INSIDE = "ERROR\nIt requires at least 2 object inside the frame";
    var ERROR_ACTIVE_LAYER_LOCKED = "ERROR\nPlease unlock the active layer";
    var DIALOG_TITLE = "Voronoi";
    var DIALOG_CHECKBOX_FILLED_PATHS = "create filled paths";
    var DIALOG_BUTTON_OK = "OK";
    var DIALOG_BUTTON_CANCEL = "Cancel";

    // main function (dialog)
    function main(){
        if(isBadCondition()) return;

        // show a dialog
        var win = new Window("dialog", DIALOG_TITLE);
        win.alignChildren = "fill";
        
        // checkbox
        win.chkGroup = win.add("group");
        win.chkGroup.alignment = "center";
        win.chkGroup.polygonChk = win.chkGroup.add("checkbox", undefined, DIALOG_CHECKBOX_FILLED_PATHS);

        // ok/cancel button
        win.btnGroup = win.add("group", undefined );
        win.btnGroup.alignment = "center";
        win.btnGroup.okBtn = win.btnGroup.add("button", undefined, DIALOG_BUTTON_OK);
        win.btnGroup.cancelBtn = win.btnGroup.add("button", undefined, DIALOG_BUTTON_CANCEL);

        // sets initial values
        win.chkGroup.polygonChk.value = _conf.drawPolygons;
      
        // gets values from UI 
        var getValues = function(){
            _conf.drawPolygons = win.chkGroup.polygonChk.value;
        }
        
        win.btnGroup.okBtn.onClick = function(){
            getValues();
            voronoiMain();
            win.close();
        }
        
        win.btnGroup.cancelBtn.onClick = function(){
            win.close();
        }
        win.show();
    }

    /**
     * @param  {PageItem} p
     * @return {Object}  the central coordinate {x, y} of "p"
     */
    var getCenter = function(p){
        var gb = p.geometricBounds;  // left, top, right, bottom
        return { x:(gb[0] + gb[2]) / 2, y:(gb[1] + gb[3]) / 2 };
    }

    /**
     * @param  {PageItem} p
     * @return {float}  the large side of width or height of "p"
     */
    var getMaxSize = function(p){
        var gb = p.geometricBounds;  // left, top, right, bottom
        var width = gb[2] - gb[0];
        var height = gb[1] - gb[3];
        return Math.max(width, height);
    }
    
    /**
     * @param  {float} grayValue  (0-100, 100=black)
     * @return {GrayColor}  a GrayColor instance
     */
    var getGray = function(grayValue){
        var col = new GrayColor();
        col.gray = grayValue;
        return col;
    }

    /**
     * creates a PathItem for lines
     * @return {PathItem}  a PathItem with 2 pathPoints
     */
    var createAPath = function(){
        var p = app.activeDocument.activeLayer.pathItems.add();
        p.setEntirePath([[0,0], [0,0]]);
        p.closed = false;
        p.filled = false;
        p.stroked = true;
        p.strokeWidth = _conf.strokeWidth;
        p.strokeCap == StrokeCap.ROUNDENDCAP;
        p.strokeColor = getGray(100);
        return p;
    }

    /**
     * creates a PathItem for filled paths
     * @return {PathItem}  a PathItem with no PathPoint
     */
    var createAFilledPath = function(){
        var p = app.activeDocument.activeLayer.pathItems.add();
        p.closed = true;
        p.filled = true;
        p.stroked = false;
        p.fillColor = getGray(0);
        return p;
    }

    /**
     * sets the location of pathPoints["idx"] of pathItem "line"
     * to the value of Voronoi.vertex "vtx"
     * @param {PathItem} line
     * @param {Integer} idx  index of the target pathPoint
     * @param {Voronoi.vertex} vtx
     */
    var setAnchor = function(line, idx, vtx){
        var pt = line.pathPoints[idx];
        pt.anchor = [vtx.x, vtx.y];
        pt.rightDirection = pt.anchor;
        pt.leftDirection = pt.anchor;
    }

    /**
     * check if there is a bad condition for execution
     * @return {Boolean}  true if something is bad
     */
    function isBadCondition(){
        if(app.documents.length < 1){
            alert(ERROR_NO_DOCUMENT);
            return true;
        }
        var adoc = app.activeDocument;
        if(adoc.selection.length < 3){
            // Note that a grouped object is recognized as one object.  
            // You can release groups before you run this script.  But if the script force
            // releasing groups, you can do nothing, even if you don't want to release them.
            // So this script doesn't extract objects from groups at all.
            // Please be careful about the construction of groups in the selection.
            // I set a rule that the execution requires at least 3 objects,
            // in case selected objects are actually put into a group.
            alert(ERROR_LESS_SELECTION);
            return true;
        }
        if(adoc.activeLayer.locked){
            alert(ERROR_ACTIVE_LAYER_LOCKED);
           return true;
        }
        return false;
    }

    /**
     * finds the largest object in "sel", and sets the bounds to "rect".
     * @param  {[PageItem]} sel  an array of PageItem
     * @param  {Object} rect  {left, top, right, bottom}
     * @return {[PageItem]}  an array of PageItem in "sel" inside the largest object
     */
    var excludeLargestObjectFromSelection = function(sel, rect){
        var sites = [];
        var maxSize = getMaxSize(sel[0]);
        var idx = 0;

        // finds a pageItem that is the largest in size (width or height)
        for(var i = 1, iEnd = sel.length; i < iEnd; i++){
            var size = getMaxSize(sel[i]);
            if(size > maxSize){
                idx = i;   
                maxSize = size;
            }
        }
      
        var gb = sel[idx].geometricBounds;  // left, top, right, bottom
        rect.left = gb[0];
        rect.top = gb[1];
        rect.right = gb[2];
        rect.bottom = gb[3];

        // adds only pageItems inside the rect to "sites"
        for(var i = 0, iEnd = sel.length; i < iEnd; i++){
            if(i != idx){
                var center = getCenter(sel[i]);  // { x, y }
              
                if(center.x >= rect.right || center.x <= rect.left
                   || center.y >= rect.top || center.y <= rect.bottom){
                  continue;
                }
              
                sites.push(center);
            }
        }
        return sites;
    }

    /**
     * creates filled paths and puts them into a group.
     * the group is placed behind the backmost object in the selection
     * @param  {Voronoi.diagram} diagram 
     * @param  {PageItem} backmost  the backmost object in the selection
     * @param  {Object} bbox  bbox argument passed to Voronoi.compute
     */
    var drawFilledPaths = function(diagram, backmost, bbox){
        if(diagram.cells.length < 1) return;
      
        var grf = app.activeDocument.activeLayer.groupItems.add();
        grf.move(backmost, ElementPlacement.PLACEAFTER);
        var pf = createAFilledPath();
        pf.move(grf, ElementPlacement.PLACEATEND);

        for(var i = 0, iEnd = diagram.cells.length; i < iEnd; i++){
            var cell = diagram.cells[i];
            
            var points = [];
            for(var hi = 0, hiEnd = cell.halfedges.length; hi < hiEnd; hi++){
                var v = cell.halfedges[hi].getStartpoint();
                points.push([v.x, v.y]);
            }
            
            var polygon = pf.duplicate();
            polygon.setEntirePath(points);
        }

        pf.remove();
    }

    /**
     * creates lines and puts them into a group.
     * @param  {Voronoi.diagram} diagram
     */
    var drawLines = function(diagram){
        if(diagram.edges.length < 1) return;
      
        var gr = app.activeDocument.activeLayer.groupItems.add();
        var p = createAPath();
        p.move(gr, ElementPlacement.PLACEATEND);
        
        for(var i = 0, iEnd = diagram.edges.length; i < iEnd; i++){
            var line = p.duplicate();
            var edge = diagram.edges[i];
            setAnchor(line, 0, edge.va);
            setAnchor(line, 1, edge.vb);
        }
        
        p.remove();
    }
    
    /**
     * main process for the Voronoi diagram creation
     */
    var voronoiMain = function(){
        var sel = app.activeDocument.selection;
        
        var voronoi = new Voronoi();
    
        // gets the backmost object at here.
        // though it includes the objects outside of the frame
        if(_conf.drawPolygons){
            var backmost = sel[ sel.length - 1 ];
        }

        // The object which has the largest area is used for the bounds (=frame) for drawing.
        var rect = {left:0, top:0, right:0, bottom:0};
      
        // this is the basic example by gorhill
        // var sites = [{x:300,y:300}, {x:100,y:100}, {x:200,y:500}, {x:250,y:450}, {x:500,y:150}];
        var sites = excludeLargestObjectFromSelection(sel, rect);
        if(sites.length < 2){
            alert(ERROR_LESS_OBJECTS_INSIDE);
            return;
        }
      
        // xl, xr means x left, x right
        // yt, yb means y top, y bottom
        var bbox = {xl:rect.left, yt:rect.bottom, xr:rect.right, yb:rect.top};

        var diagram = voronoi.compute(sites, bbox);
        
        // draws on the artboard
        // filled paths
        if(_conf.drawPolygons) drawFilledPaths(diagram, backmost, bbox);
        
        // stroked paths
        if(_conf.drawLines) drawLines(diagram);
    }
    
    main();
})();

