angular.module('AutoGraph').service('TerminalIndex', function(){
    
    var index = {};
    
    return {
        
        addTerminalElement: function(terminalElement) {
            index[terminalElement.uuid] = terminalElement;
        },
        
        terminalElementForUUID: function(uuid) {
            return index[uuid];
        }
        
    };
    
});
