/*
 * Title Caps
 * Ported to Illustrator By Carlos Canto - 6/30/12 
 * Ported to JavaScript By John Resig - http://ejohn.org/ - 21 May 2008
 * Original by John Gruber - http://daringfireball.net/ - 10 May 2008
 * License: http://www.opensource.org/licenses/mit-license.php
 */

// UPDATE 7/12/12, increased the exclusion list of prepositions, articles and conjuntions. 
//                                 - added an option to run the script on a selection of text, along with a selection of single or multiple text frames.

#target Illustrator

function titleCase(str){
	//var small = "(a|an|and|as|at|but|by|en|for|if|in|of|on|or|the|to|v[.]?|via|vs[.]?)";
	var small = "(a|abaft|aboard|about|above|absent|across|afore|after|against|along| alonside|amid|amidst|among|amongst|an|and|apopos|around|as|aside|astri de|at|athwart|atop|barring|before|behind|below|beneath|beside|besides| between|betwixt|beyond|but|by|circa|concerning|despite|down|during|exc ept|excluding|failing|following|for|from|given|in|including|inside|int o|lest|like|mid|midst|minus|modula|near|next|nor|notwithstanding|of|of f|on|onto|oppostie|or|out|outside|over|pace|per|plus|pro|qua|regarding |round|sans|save|than|that|the|through|throughout|till|times|to|toward |towards|under|underneath|unlike|until|unto|up|upon|versus|via|vice|wi th|within|without|worth|v[.]?|via|vs[.]?)";
	var punct = "([!\"#$%&'()*+,./:;<=>?@[\\\\\\]^_`{|}~-]*)";

	var casedChanged = titleCaps (str);
	
	function titleCaps (title){
		var parts = [], split = /[:.;?!] |(?: |^)["Ò]/g, index = 0;
		
		while (true) {
			var m = split.exec(title);

			parts.push( title.substring(index, m ? m.index : title.length)
				.replace(/\b([A-Za-z][a-z.'Õ]*)\b/g, function(all){
					return /[A-Za-z]\.[A-Za-z]/.test(all) ? all : upper(all);
				})
				.replace(RegExp("\\b" + small + "\\b", "ig"), lower)
				.replace(RegExp("^" + punct + small + "\\b", "ig"), function(all, punct, word){
					return punct + upper(word);
				})
				.replace(RegExp("\\b" + small + punct + "$", "ig"), upper));
			
			index = split.lastIndex;
			
			if ( m ) parts.push( m[0] );
			else break;
		}
		
		return parts.join("").replace(/ V(s?)\. /ig, " v$1. ")
			.replace(/(['Õ])S\b/ig, "$1s")
			.replace(/\b(AT&T|Q&A)\b/ig, function(all){
				return all.toUpperCase();
			});
	};
    
	function lower(word){
		return word.toLowerCase();
	}
    
	function upper(word){
	  return word.substr(0,1).toUpperCase() + word.substr(1);
	}

	return casedChanged;
};

var idoc = app.activeDocument;
var sel = idoc.selection;

if (sel.typename == "TextRange") {
    sel.changeCaseTo(CaseChangeType.TITLECASE);
    sel.contents = titleCase(sel.contents);
}

else if (sel.length>0) {
	for (i=0; i<sel.length; i++) {
		if(sel[i].typename == "TextFrame") {
			var itext = sel[i];
			itext.textRange.changeCaseTo(CaseChangeType.TITLECASE);
			itext.contents = titleCase(itext.contents);
		}
	}
}