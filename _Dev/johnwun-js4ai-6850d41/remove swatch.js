function unusedSwatch(){
    actionString = [
        '/version 3',
        '/name [ 8',
        '756e757365647377',
        ']',
        '/isOpen 1',
        '/actionCount 1',
        '/action-1 {',
        '/name [ 8',
        '737774636864656c',
        ']',
        '/keyIndex 0',
        '/colorIndex 0',
        '/isOpen 0',
        '/eventCount 2',
        '/event-1 {',
        '/useRulersIn1stQuadrant 0',
        '/internalName (ai_plugin_swatches)',
        '/localizedName [ 8',
        '5377617463686573',
        ']',
        '/isOpen 0',
        '/isOn 1',
        '/hasDialog 0',
        '/parameterCount 1',
        '/parameter-1 {',
        '/key 1835363957',
        '/showInPalette 4294967295',
        '/type (enumerated)',
        '/name [ 17',
        '    53656c65637420416c6c20556e75736564',
        ']',
        '/value 11',
        '}',
        '}',
        '/event-2 {',
        '/useRulersIn1stQuadrant 0',
        '/internalName (ai_plugin_swatches)',
        '/localizedName [ 8',
        '5377617463686573',
        ']',
        '/isOpen 0',
        '/isOn 1',
        '/hasDialog 1',
        '/showDialog 0',
        '/parameterCount 1',
        '/parameter-1 {',
        '/key 1835363957',
        '/showInPalette 4294967295',
        '/type (enumerated)',
        '/name [ 13',
        '    44656c65746520537761746368',
        ']',
        '/value 3',
        '}',
        '}',
        '}'
   ].join('\n')
        $.writeln('hit')
        var f = new File(Folder.desktop + "/unusedsw.aia");
        f.open('w')
        f.write(actionString)
        f.close()
        app.loadAction(f)
        app.doScript('swtchdel','unusedsw')
        app.unloadAction('unusedsw', '');
        f.remove();
}

unusedSwatch();