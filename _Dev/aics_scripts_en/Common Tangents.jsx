// Common Tangents

// draws common tangents to the selected curved lines, if they are detected.


// test env: Adobe Illustrator CS3, CS6 (Windows)

// Copyright(c) 2004 Hiroyuki Sato
// https://github.com/shspage
// This script is distributed under the MIT License.
// See the LICENSE file for details.

// 2018.07.20, modified to ignore locked/hidden objects in a selected group

var ver10 = (version.indexOf('10') == 0);

//main();
// ------------------------------------------------
function main(){
  var paths = [];
  getPathItemsInSelection(1, paths);
  if(paths.length < 1) return;
  
  activateEditableLayer(paths[0]);
  
  var sw, scol;
  var i, j, k, p;
  var tgt = [];
  
  for(i = 0; i < paths.length; i++){
    if(! sw && paths[i].stroked){
      sw   = paths[i].strokeWidth;
      scol = paths[i].strokeColor;
    }
    
    p = paths[i].pathPoints;

    for(j = 0; j < p.length; j++){
      k = parseIdx(p, j + 1);
      if(k < 0) break;
      
      if(sideSelection(p, j, k) && isNotStraightSide(p, j, k)){
        tgt.push( new Bezier(p, j, k) );
      }
    }
  }
  
  if (tgt.length < 2) {
    alert("Please select at least 2 curved lines.");
    return;
  }
  
  var tarr = []; // array of parameter t
  commonTangent(tgt, tarr);

  if(! sw){
    sw = 1;
    scol = col_Gray();
  }

  var paths2 = [];

  if(tarr.length > 0){
    for(var i = 0; i < tarr.length; i++){
      paths2.push( drawLine(tarr[i][0], tarr[i][1], sw, scol) );
    }
    activeDocument.selection = paths2;
    
  } else {
    alert("It seems that there's no common tangent.");
  }
}

// ------------------------------------------------
function commonTangent(tgt, tarr){
  var conf = {};
  // settings ==============================================
  conf.y_intercept_trl = 0.00001; // y-intercept torelance
  conf.t_trl = 0.0001;  // bezier curve parameter torelance
  // =======================================================
  var b1, b2, len;
  var i;
  
  for(i = 0; i < tgt.length - 1; i++){
    for(j = i + 1; j < tgt.length; j++){
      b1 = tgt[i];
      b2 = tgt[j];
      len = tarr.length + 2;
      if(b1.p.parent == b2.p.parent) continue;

      explore(b1, b2, 0, 0, conf, tarr);
      
      if(len > tarr.length) explore(b1, b2, 3, 3, conf, tarr);
      if(len > tarr.length) explore(b1, b2, 0, 3, conf, tarr);
      if(len > tarr.length) explore(b1, b2, 3, 0, conf, tarr);
    }
  }
}
// ------------------------------------------------
// search a tangent
function explore(b1, b2, idx1, idx2, conf, tarr) {
  var p1 = b1.q[idx1].slice(0);
  var p2 = b2.q[idx2].slice(0);
  var s, t1, t2;
  var rotFlg = 1;

  for(var i = 0; i < 8; i++){ // set retry times
    s = slope(p1, p2);

    if (s == null || Math.abs(s) > 10000){
      // if the line is almost vertical, reverse x and y, then retry.
      b1.xyRot();        b2.xyRot();
      p1.reverse();      p2.reverse();
      rotFlg *= -1;
      continue;
    }

    t1 = tBySlope(b1, s, idx1, conf.t_trl); if(t1 < 0) break;
    t2 = tBySlope(b2, s, idx2, conf.t_trl); if(t2 < 0) break;
    
    p1 = b1.pnt(t1);
    p2 = b2.pnt(t2);

    if (Math.abs(getDc(p1, b1, t1) - getDc(p2, b2, t2)) < conf.y_intercept_trl){
      if(t1 < 0)      p1 = b1.pnt(0);
      else if(t1 > 1) p1 = b1.pnt(1);
      
      if(t2 < 0)      p2 = b2.pnt(0);
      else if(t2 > 1) p2 = b2.pnt(1);
      
      if(rotFlg < 0){
        b1.xyRot();    b2.xyRot();
        p1.reverse();  p2.reverse();
        rotFlg = 1;
      }

      if (overlapChk([p1, p2], tarr)) tarr.push([p1, p2]);
      return;
    }
  }

  if(rotFlg < 0){
    b1.xyRot();
    b2.xyRot();
  }
}
// ------------------------------------------------
// eliminates overlap
function overlapChk(ar, tarr){
  if(cmpDiff(ar[0], ar[1])) return false;
  
  for(var i = 0; i < tarr.length; i++){
    if((cmpDiff(tarr[i][0], ar[0]) && cmpDiff(tarr[i][1], ar[1]))
       || (cmpDiff(tarr[i][0], ar[1]) && cmpDiff(tarr[i][1], ar[0]))){
      return false;
    }
  }
  
  return true;
}
// ------------------------------------------------
function cmpDiff(p1, p2){
  var v = 0.01;
  return (Math.abs(p1[0] - p2[0]) < v
          && Math.abs(p1[1] - p2[1]) < v);
}
// ------------------------------------------------
function slope(p1, p2){
  var x = p1[0] - p2[0];
  return x == 0 ? null : (p1[1] - p2[1]) / x;
}
// ------------------------------------------------
// get the value for discrimination
function getDc(p, b, t){
  var dx = t * (3 * b.x[0] * t + 2 * b.x[1]) + b.x[2];
  var dy = t * (3 * b.y[0] * t + 2 * b.y[1]) + b.y[2];
  return dx != 0 ? p[1] - p[0] * dy / dx : dy;
}
// ------------------------------------------------
// return the parameter "t" when the slope of the tangent is "k"
function tBySlope(b, k, idx, t_trl){
  var t = equation2(3 * (b.y[0] - k * b.x[0]),
                   2 * (b.y[1] - k * b.x[1]),
                   b.y[2] - k * b.x[2]);
  
  if(t.length < 1) return -1;
  
  var min_t = 0 - t_trl;
  var max_t = 1 + t_trl;
  
  var t0_invalid = (t[0] < min_t || t[0] > max_t);
  
  if(t.length > 1){
    var t1_invalid = (t[1] < min_t || t[1] > max_t);
    
    if (t0_invalid && t1_invalid) return -1;
    else if (t0_invalid) return t[1];
    else if (t1_invalid) return t[0];
    else return idx == 0 ? Math.min(t[0], t[1]) : Math.max(t[0], t[1]);
  }
  
  return t0_invalid ? -1 : t[0];
}
// ------------------------------------------------
// draw a line from p1=[x,y] to p2
// return the line ( pathitem object )
function drawLine(p1, p2, sw, scol){
  var p = activeDocument.activeLayer.pathItems.add();
  with(p){
    setEntirePath([p1, p2]);
    filled = false;
    stroked = true;
    strokeWidth = sw;
    strokeColor = scol;
  }
  return p;
}
// ------------------------------------------------
// return black color object
function col_Gray(){
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
// solve a quadratic equation ( ax^2+bx+c=0 )
function equation2(a, b, c) {
  if(a == 0) return b == 0 ? [] : [-c / b];
  a *= 2;

  var d = b * b - 2 * a * c;

  if(d < 0) return [];

  var rd = Math.sqrt(d);
  
  if(d>0) return [(-b + rd) / a, (-b - rd) / a];
  else return [-b / a];
}
// ------------------------------------------------
// check selection of the anchors at the both ends of the bezier curve segment.
function sideSelection(p,i,j) { // p:pathPoint, i,j:index
  return (p[i].selected != PathPointSelection.NOSELECTION
      && p[i].selected != PathPointSelection.LEFTDIRECTION
      && p[j].selected != PathPointSelection.NOSELECTION
      && p[j].selected != PathPointSelection.RIGHTDIRECTION);
}
// ------------------------------------------------
// easy check whether the segment is straight line or not.
function isNotStraightSide(p,i,j){
  return (p[i].anchor[0] != p[i].rightDirection[0]
      || p[i].anchor[1] != p[i].rightDirection[1]
      || p[j].anchor[0] != p[j].leftDirection[0]
      || p[j].anchor[1] != p[j].leftDirection[1]);
}
// -----------------------------------------------
// return pathpoint's index. when the argument is out of bounds,
// fixes it if the path is closed (ex. next of last index is 0),
// or return -1 if the path is not closed.
function parseIdx(p, n){ // PathPoints, number for index
  var len = p.length;
  if(p.parent.closed){
    return n >= 0 ? n % len : len - Math.abs(n % len);
  } else {
    return (n < 0 || n > len - 1) ? -1 : n;
  }
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


// Bezier ================================
var Bezier = function(pp, idx1, idx2){
  this.p  = pp;
  this.p0 = pp[idx1];
  this.p1 = pp[idx2];
  
  this.q = [pp[idx1].anchor, pp[idx1].rightDirection,
            pp[idx2].leftDirection, pp[idx2].anchor];
  this.a0 = this.q[0];
  this.r = this.q[1];
  this.l = this.q[2];
  this.a1 = this.q[3];
  
  this.x = defBezierCoefficients(this.q, 0);
  this.y = defBezierCoefficients(this.q, 1);
}
Bezier.prototype = {
  pnt : function(t){
    return [ t * (t * (this.x[0] * t + this.x[1]) + this.x[2]) + this.x[3],
             t * (t * (this.y[0] * t + this.y[1]) + this.y[2]) + this.y[3] ];
  },
  xyRot : function(){
    for(var i = 0; i < 4; i++) this.q[i].reverse();
    var tmp = this.y;
    this.y = this.x;
    this.x = tmp;
  }
}
// ------------------------------------------------
function bezierEq(q, t) {
  var u = 1-t;
  return [u*u*u * q[0][0] + 3*u*t*(u* q[1][0] + t* q[2][0]) + t*t*t * q[3][0],
          u*u*u * q[0][1] + 3*u*t*(u* q[1][1] + t* q[2][1]) + t*t*t * q[3][1]];
}
// ------------------------------------------------
function defBezierCoefficients(q, n){
  return [-q[0][n] + 3 * (q[1][n] - q[2][n]) + q[3][n],
          3*(q[0][n] - 2 * q[1][n] + q[2][n]),
          3*(q[1][n] - q[0][n]),
          q[0][n]];
}
// --------------------------------------
main();
