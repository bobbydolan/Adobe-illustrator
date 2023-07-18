// Merge the Overlapped Anchors

// merges nearly overlapped anchor points.
// also reports how many anchor points had been reduced.

// USAGE: Select the path(s) and run this script.


// test env: Adobe Illustrator CS3, CS6 (Windows)

// Copyright(c) 2005 Hiroyuki Sato
// https://github.com/shspage
// This script is distributed under the MIT License.
// See the LICENSE file for details.

// 2018.07.20, modified to ignore locked/hidden objects in a selected group


// Setting ===========================

// merge the anchors when the distance between 2 points is
// within this value (in point)
var minDist = 0.05;

// report how many anchors had been reduced for
// this number of paths in the selection. (counting from foreground)
var repo_max = 10;

// ===================================
minDist *= minDist;

var result = {};
result.before = 0;
result.after  = 0;

var paths = [];
getPathItemsInSelection(2, paths);

if(paths.length > 0){
  var p, len;
  var msgs = [];
  
  for(var j = paths.length - 1; j >= 0; j--){
    p = paths[j].pathPoints;
    
    readjustAnchors(p, minDist, result);
    
    if(j < repo_max){
      if(result.after == 0){
        msgs.unshift( "removed\n" );
        
      } else if(result.after < result.before){
        msgs.unshift( result.before + " => " + result.after + "\n" );
        
      } else {
        msgs.unshift( " -\n" );
      }
      msgs.unshift( "PathItem # " + (j + 1) + " : ");
    }
  }

  if(paths.length > repo_max){
    msgs.push( "\n(a log for first " + repo_max + " paths)" );
  }
  
  alert("# the number of anchors\n      before => after\n------------------------\n" + msgs.join(""));
}

// ------------------------------------------------
function readjustAnchors(p, minDist, result){
  result.before = p.length;
  var i;
  
  if(p.parent.closed){
    for(i = p.length - 1; i >= 1; i--){
      if(dist2(p[0].anchor, p[i].anchor) < minDist){
        p[0].leftDirection = p[i].leftDirection;
        p[i].remove();
      } else {
        break;
      }
    }
  }
  
  for(i = p.length - 1; i >= 1; i--){
    if(dist2(p[i].anchor, p[i - 1].anchor) < minDist){
      p[i - 1].rightDirection = p[i].rightDirection;
      p[i].remove();
    }
  }
  
  if(p.length < 2){
    p.parent.remove();
    result.after = 0;
  } else {
    result.after = p.length;
  }
}

// ------------------------------------------------
// return the squared distance between p1=[x,y] and p2=[x,y]
function dist2(p1, p2) {
  return Math.pow(p1[0] - p2[0], 2)
       + Math.pow(p1[1] - p2[1], 2);
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
      if(pp_length_limit
         && s[i].pathPoints.length <= pp_length_limit){
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
