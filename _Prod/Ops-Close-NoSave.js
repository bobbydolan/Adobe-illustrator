// // turn edited flag off
// activeDocument.saved = true;
// app.executeMenuCommand('close');



// (function () {
//     var docs = app.documents;
//     for (var i = 0, len = docs.length; i < len; i++) {
//       docs[i].activate();
//       activeDocument.saved = true;
//       app.executeMenuCommand("close");
//     }
//   })();

while (app.documents.length) {
//   generateText();
  app.activeDocument.close();
}