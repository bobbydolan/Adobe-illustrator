/***************************
 NOT MAINTAINED! from ~2014
****************************/

// cs4+ script for resizing objects proportionally to fit inside artboard
// based on: https://forums.adobe.com/message/4164590
// usage: create a new document with desired artboard size, paste object, select it, run this script
// bugs: centering does not work after changing artboard size

var activeDoc = app.activeDocument
var selection = activeDoc.selection

// check if anything is selected
if (selection.length > 0) {
  for (var i = 0; i < selection.length; i++) {
    var item = selection[i].duplicate()

    var abActive =
      activeDoc.artboards[activeDoc.artboards.getActiveArtboardIndex()]

    var abProps = getArtboardBounds(abActive)
    var boundsDiff = itemBoundsDiff(selection[i])

    fitItem(item, abProps, boundsDiff) // scale object to fit artboard
  }
} else {
  alert('Select an object before running this script')
}

function getArtboardBounds(artboard) {
  var bounds = artboard.artboardRect

  var left = bounds[0]
  var top = bounds[1]
  var right = bounds[2]
  var bottom = bounds[3]

  var width = right - left
  var height = top - bottom

  var props = { left: left, top: top, width: width, height: height }

  return props
}

function itemBoundsDiff(item) {
  var itemVB = item.visibleBounds

  var itemVW = itemVB[2] - itemVB[0] // right - left
  var itemVH = itemVB[1] - itemVB[3] // top - bottom

  var itemGB = item.geometricBounds

  var itemGW = itemGB[2] - itemGB[0] // right - left
  var itemGH = itemGB[1] - itemGB[3] // top - bottom

  var deltaX = itemVW - itemGW
  var deltaY = itemVH - itemGH

  var diff = { deltaX: deltaX, deltaY: deltaY }

  return diff
}

function fitItem(item, props, diff) {
  var oldWidth = item.width
  var oldHeight = item.height

  if (item.width > item.height) {
    // landscape, scale height using ratio from width
    item.width = props.width - diff.deltaX
    var ratioW = item.width / oldWidth
    item.height = oldHeight * ratioW
  } else {
    // portrait, scale width using ratio from height
    item.height = props.height - diff.deltaY
    var ratioH = item.height / oldHeight
    item.width = oldWidth * ratioH
  }

  // center
  item.top = 0 - (props.height / 2 - item.height / 2)
  item.left = props.width / 2 - item.width / 2

  // deselect
  item.selected = false
}
