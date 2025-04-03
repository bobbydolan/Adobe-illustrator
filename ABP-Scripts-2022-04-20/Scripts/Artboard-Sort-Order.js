#target illustrator

// var script.name = reArrangeArtboardsCS4only.jsx;

// var script.description = reArranges the Artboards indexes;

// var script.required = an open document with at least 2 artboards, CS4 only, not tested in CS5;

// var script.tip = click on the Artboard tool, before running, to see the AB Indexes

// var script.parent = CarlosCanto; // 3/31/11

// var script.elegant = false;

var idoc = app.activeDocument;

var abs = idoc.artboards;

var abcount = abs.length; // save the artboard count

j=1; // new AB order number, used for buttons labels

var btn = []; // left buttons to show AB count

var btn2 = []; // right buttons to set the new order

var win = new Window("dialog","ReArrange Artboards ");

var panelOgOrder = win.add("panel");

var panelNewOrder = win.add("panel");

win.orientation = "row"; // default is column, change to row

win.onClose = onCloseFunction;

for (i = 1 ; i<=abcount; i++) // add as many buttons as ABs

     {

          btn = panelOgOrder.add("button",undefined,"AB " + i, {name: i}); // named to know wich button was pressed

          btn2 = panelNewOrder.add("button",undefined, "Set Order", {name: i-1}); // -1, to use on 0 based Artboards

          btn.helpTip = "click for help";

          btn2.onClick = onClickButton; // add event listener

          btn.onClick = onClickButton1test;

     }

win.show();

function onClickButton() // add AB and set button label from 1 to AB count

    {

          

          this.text = j; // change button label from "Set Order" to 1,2, to AB count

          this.enabled = false; // disable to prevent clicking twice

          idoc.artboards.add(abs[this.properties.name].artboardRect); // duplicate AB, which one? 3rd button pressed, 3rd AB

          app.redraw();

          j = j+1; // add to the counter

          

          if (j>abcount) // after duplicating the AB, delete the originals

          {

               win.close();

                

               for (k=abcount-1; k>=0; k--)  // loop thru original ABs

                    {

                         idoc.artboards.remove(k); // and delete

                         //app.redraw();

                    }

          }

    }

function onClickButton1test()

     {

          //alert(this.properties.name);

          var msg = "Click the buttons on the right in the order \r"; 

          msg = msg + "you want the Artboards to be Re-Arranged. \r";

          msg = msg + "You are required to click all the buttons";

          alert(msg);

     }

function onCloseFunction()

     {

          if (j>1 && j<=abcount)

          {          

               var msg2 = "You shouldn't close the window. \r"; 

               msg2 = msg2 + "You should finish clicking all the buttons, \r";

               msg2 = msg2 + "other wise you'll end up with extra Artboards. \r";

               msg2 = msg2 + "If you must close, undo to get rid of extra Artboards. \r \r";

               msg2 = msg2 + "Are you sure you want to close this window?";

               

               close = confirm(msg2);

               if (close == false)

                    return false;

          }

     }