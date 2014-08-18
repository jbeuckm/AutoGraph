angular.module('AutoGraph').service('TerminalIndex', function(){
    
    var index = {};
    
    return {
        
        addTerminalElement: function(uuid, terminalElement) {
            index[uuid] = terminalElement;
        },
        
        terminalElementForUUID: function(uuid) {
            return index[uuid];
        }
        
    };
    
});
