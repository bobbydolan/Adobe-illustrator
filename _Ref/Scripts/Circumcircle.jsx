// Circumcircle

// draws circumcircles for each selcted path

// Method:
// The major reason why I wrote this script is to draw a "circumcircle"
// for a star.
// So the method to find the center and the radius for the circumcircle
// is rather incertitude.
// 1. find out a perpendicular bisector for the line connecting
//    1st anchor and 2nd anchor
// 2. do the same for 1st anchor and 3rd anchor
//    (if the path is a triangle, 2nd anchor and 3rd anchor)
// 3. find out intersection point of 1 and 2.
//    for the center of the circumcircle to draw
// 4. find out the length of the line connecting the center and 1st
//    anchor, then do the same for the center and 2nd anchor.
//    define longer one as the radius of the circumcircle to draw.


// test env: Adobe Illustrator CS3, CS6 (Windows)

// Copyright(c) 2005 Hiroyuki Sato
// https://github.com/shspage
// This script is distributed under the MIT License.
// See the LICENSE file for details.

// 2018.07.20, modified to ignore locked/hidden objects in a selected group

var ver10 = (version.indexOf('10') == 0);

main();
function main(){
  var sp = [];
  getPathItemsInSelection(2, sp);
  if(sp.length < 1) return;
  
  activateEditableLayer(sp[0]);

  var col = getGray(); // strokeColor
  
  var p, arr1, arr2, mp, o, j, r, r1, rIdx, pi;
  var err_fail_to_find_center = 0;
  var err_radius_is_larget_than_artboard = 0;
  
  for(var i = 0; i < sp.length; i++){
    p = sp[i].pathPoints;

    // find out the center of the circle to draw
    arr1 = perpendicularBisector(p[0].anchor, p[2].anchor);
    
    if(p.length==3){ // in case triangle
      arr2 = perpendicularBisector(p[1].anchor, p[2].anchor);
    } else {
      arr2 = perpendicularBisector(p[1].anchor, p[3].anchor);
    }
    
    o = intersection(arr1, arr2);
    if(o.length < 1){
      err_fail_to_find_center = 1;
      continue;
    }

    // find out the radius of the circle to draw
    r = dist(p[0].anchor, o);
    r1 = dist(p[1].anchor, o);
    if(r >= r1){
      rIdx = 0;
    } else {
      rIdx = 1;
      r = r1;
    }
    
    // do not draw if the radius is larger than the artboard
    with(activeDocument){
      if(r==0 || r>Math.max(width, height)){
        err_radius_is_larget_than_artboard = 1;
        continue;
      }
    }

    // draw a circle
    pi = activeDocument.activeLayer.pathItems.ellipse(o[1] + r, o[0] - r, r * 2, r * 2);
    with(pi){
      filled = false;
      stroked = true;
      strokeColor = sp[i].stroked ? sp[i].strokeColor : col;
      strokeWidth = sp[i].strokeWidth || 1;
    }
  }

  if(err_fail_to_find_center == 1)
    alert("Some circles hadn't been drawn because of fails in calculation.");
  
  if(err_radius_is_larget_than_artboard == 1)
    alert("Some circles hadn't been drawn because of too large diameters.");
}

// ------------------------------------------------
function perpendicularBisector(p1, p2){
  var mp = getMidPnt(p1, p2);
  var arr = defline([ mp[0] - (p1[1] - mp[1]), mp[1] + (p1[0] - mp[0]) ],
                    [ mp[0] - (p2[1] - mp[1]), mp[1] + (p2[0] - mp[0]) ]);
  return arr;
}

// ------------------------------------------------
function getMidPnt(p1, p2){
  return [ (p1[0] + p2[0]) / 2, (p1[1] + p2[1]) / 2 ];
}

// ------------------------------------------------
function dist(arr1, arr2) {
  return Math.sqrt(Math.pow(arr1[0] - arr2[0], 2)
                   + Math.pow(arr1[1] - arr2[1], 2));
}

// -----------------------------------------------
function defline(p1, p2){
  var a = p1[1] - p2[1];
  var b = p1[0] - p2[0];
  return [a, -b, b * p1[1] - a * p1[0]];
}

// -----------------------------------------------
function intersection(p, q){
  var d = p[0] * q[1] - p[1] * q[0];
  if(d == 0) return [];
  return [ (q[2] * p[1] - p[2] * q[1]) / d,
           (p[2] * q[0] - q[2] * p[0]) / d ];
}

// -----------------------------------------------
function getGray(){
  var col = new GrayColor();
  col.gray = 100;
  if(ver10){
    var col2 = new Color();
    col2.gray = col;
    return col2;
  }
  return col;
}
// ------------------------------------------------
// extract PathItems from the selection which length of PathPoints
// is greater than "n"
function getPathItemsInSelection(n, paths){
  if(documents.length < 1) return;
  
  var s = activeDocument.selection;
  
  if (!(s instanceof Array) || s.length < 1) return;

  extractPaths(s, n, paths);
}

// --------------------------------------
// extract PathItems from "s" (Array of PageItems -- ex. selection),
// and put them into an Array "paths".  If "pp_length_limit" is specified,
// this function extracts PathItems which PathPoints length is greater
// than this number.
function extractPaths(s, pp_length_limit, paths){
  for(var i = 0; i < s.length; i++){
    if(s[i].locked || s[i].hidden){
      continue;
    } else if(s[i].typename == "PathItem"){
      if((pp_length_limit && s[i].pathPoints.length <= pp_length_limit)
        || s[i].guides || s[i].clipping){
        continue;
      }
      paths.push(s[i]);
      
    } else if(s[i].typename == "GroupItem"){
      // search for PathItems in GroupItem, recursively
      extractPaths(s[i].pageItems, pp_length_limit, paths);
      
    } else if(s[i].typename == "CompoundPathItem"){
      // searches for pathitems in CompoundPathItem, recursively
      // ( ### Grouped PathItems in CompoundPathItem are ignored ### )
      extractPaths(s[i].pathItems, pp_length_limit , paths);
    }
  }
}

// ----------------------------------------------
function activateEditableLayer(pi){
  var lay = activeDocument.activeLayer;
  if(lay.locked || !lay.visible) activeDocument.activeLayer = pi.layer;
}
