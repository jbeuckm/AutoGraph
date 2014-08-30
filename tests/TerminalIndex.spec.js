'use strict';

describe('Terminal Index', function(){

    var terminalIndex;

    beforeEach(function(){

        angular.mock.module('AutoGraph');

        inject(function($injector){
            terminalIndex = $injector.get('TerminalIndex');
        });
    });


    it('should save and load configuration', function(){

        terminalIndex.addTerminalElement('test', {test:1});
        var terminal = terminalIndex.terminalElementForUUID('test');
        
        expect(terminal.test).toEqual(1);
        
    });

});
