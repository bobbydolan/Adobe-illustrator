// Adjust Dashes (offset)

// adjusts dashed lines in the selection
// in order to the center of the first dash comes at
// each anchor points.

// For its purpose, when adjacent segments of an anchor of
// the target path have a difference in length,
// this script splits the path at this anchor, applies
// a suitable dash setting for each splitted path,
// then put them into a group.
// This is a lockstep trick caused by an Illustrator
// path can have only one simple rule for dashes and gaps.
// This process also CLEARS FILL COLORS, if it needs,
// and if the pash has BUTT end cap, change it to PROJECTION end cap.


// test env: Adobe Illustrator CS3, CS6 (Windows)

// Copyright(c) 2009 Hiroyuki Sato
// https://github.com/shspage
// This script is distributed under the MIT License.
// See the LICENSE file for details.

// 2018.07.20, modified to ignore locked/hidden objects in a selected group

main();
function main(){
  var paths = [];
  getPathItemsInSelection(1, paths);
  if(paths.length < 1) return;

  var sd, dashLen, rest, incr, dashes_count;
  var strokeLen, prevLen;
  var j, p, k, m, n, q;
  var dup, dp, dsd, idx, gr;

  for(var i = paths.length - 1; i >= 0; i--){
    prevLen = null;
    sd = paths[i].strokeDashes;
    if(sd.length < 1) continue;

    dashLen = 0;
    for(j in sd) dashLen += sd[j];
    if(dashLen == 0) continue;

    p = paths[i].pathPoints;
    if(p.length > 2){
      gr = paths[i].layer.groupItems.add();
      gr.move(paths[i], ElementPlacement.PLACEBEFORE);
    } else {
      gr = null;
    }
    
    for(m = 0; m < p.length; m++){
      n = parseIdx(p, m + 1);
      if(n < 0) break;
      strokeLen = getLength([p[m].anchor, p[m].rightDirection,
                             p[n].leftDirection, p[n].anchor]);
      
      // duplicates a segment
      if(prevLen == null || Math.abs(strokeLen - prevLen) > 0.1){
        prevLen = strokeLen;
        dup = paths[i].duplicate();
        with(dup){
          closed = false;
          filled = false;
          setEntirePath([p[m].anchor, p[n].anchor]);
          pathPoints[0].rightDirection = p[m].rightDirection;
          pathPoints[1].leftDirection  = p[n].leftDirection;
        }
        // adjusts dashes
        if(sd[0] > 0 && strokeLen <= sd[0]){
          dup.strokeDashes = [];
          dup.strokeDashOffset = 0;
        } else {
          dashes_count = Math.round(strokeLen / dashLen) || 1;
          if(sd.length == 1 && dashes_count % 2 == 1) dashes_count++;
          dsd = sd.slice(0);
          incr = strokeLen / (dashes_count * dashLen);
          for(j in dsd) dsd[j] = fixedTo(dsd[j] * incr, 4) - 0;
          dup.strokeDashes = dsd;
          dup.strokeDashOffset = dsd[0] / 2;
        }
        // appends to the group
        if(gr) dup.move(gr, ElementPlacement.PLACEATEND);
        
      } else {
        // appends a segment to the duplicated path
        with(dup){
          pathPoints.add();
          idx = pathPoints.length - 1;
          pathPoints[idx].anchor = p[n].anchor;
          pathPoints[idx - 1].rightDirection = p[m].rightDirection;
          pathPoints[idx].leftDirection      = p[n].leftDirection;
        }
      }
    }

    // releases a duplicated path from the group
    // if there's only 1 path in the group
    if(gr && gr.pathItems.length > 0){
      if(gr.pathItems.length == 1){
        with(gr.pathItems[0]){
          move(gr, ElementPlacement.PLACEBEFORE);
          idx = pathPoints.length - 1;
          // closes the path if the original is closed
          if(paths[i].closed && idx > 0){
            pathPoints[0].leftDirection = pathPoints[idx].leftDirection;
            pathPoints[idx].remove();
            closed = true;
          }
        }
        gr.remove();
      } else if(gr.pathItems[0].strokeCap == StrokeCap.BUTTENDCAP){
        for(q = 0; q < gr.pathItems.length; q++){
          gr.pathItems[q].strokeCap = StrokeCap.PROJECTINGENDCAP;
        }
      }
    }
    
    // removes the original path
    paths[i].remove();
  }
}

// ----------------------------------------------
// It seems that the function "toFixed" is not available in AI10
function fixedTo(n, k){
  var arr = ((n - 0) + "").split('.');
  if(arr.length < 2 || k <= 0) return arr[0];
  if(arr[1].length > k){
//    arr[1] = ((arr[1].substr(0,k)-0)+(arr[1].charAt(k)>'4' ? 1 : 0))+"";
    arr[1] = arr[1].substr(0, k);
    if(arr[1].length > k){
      arr[0] = (arr[0] - 0 + 1) + "";
      arr[1] = arr[1].substr(1);
    }
  }
  arr[1] = arr[1].replace(/0+$/,'');
  return arr[1]=='' ? arr[0] : arr.join('.');
}

// ------------------------------------------------
// return the length of the bezier curve segment.
// q = [Q0[x,y],Q1,Q2,Q3]
function getLength(q){
  h = 1 / 128;
  var hh = h * 2;
  var m = [q[3][0] - q[0][0] + 3 * (q[1][0] - q[2][0]),
           q[0][0] - 2 * q[1][0] + q[2][0],
           q[1][0] - q[0][0]];
  var n = [q[3][1] - q[0][1] + 3 * (q[1][1] - q[2][1]),
           q[0][1] - 2 * q[1][1] + q[2][1],
           q[1][1] - q[0][1]];
  var k = [ m[0] * m[0] + n[0] * n[0],
            4 * (m[0] * m[1] + n[0] * n[1]),
            2 * ((m[0] * m[2] + n[0] * n[2]) + 2 * (m[1] * m[1] + n[1] * n[1])),
            4 * (m[1] * m[2] + n[1] * n[2]), m[2] * m[2] + n[2] * n[2] ];
  var fc = function(t, k){
    return Math.sqrt(t * (t * (t * (t * k[0] + k[1]) + k[2]) + k[3]) + k[4]) || 0 };
  var sm = (fc(0, k) - fc(1, k)) / 2;
  for(var t = h; t < 1; t += hh) sm += 2 * fc(t, k) + fc(t + h, k);
  return sm * hh;
}

// -----------------------------------------------
function parseIdx(p, n){ // PathPoints, number for index
  var len = p.length;
  if(p.parent.closed){
    return n >= 0 ? n % len : len - Math.abs(n % len);
  } else {
    return (n < 0 || n > len-1) ? -1 : n;
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
