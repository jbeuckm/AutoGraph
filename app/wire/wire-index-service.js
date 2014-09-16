angular.module('AutoGraph').service('WireIndex', function(){
    
    var index = {};
    
    return {
        
        addWire: function(wire) {
            
            console.log(wire);
            
            if (!index[wire.origin]) {
                index[wire.origin] = {};
            }
            var destinationList = index[wire.origin];
            
            destinationList[wire.destination] = wire;
        },
        
        destinationListForOriginTerminalUUID: function(uuid) {
            var destinationList = index[uuid];
            return destinationList;
        },
        
        deleteWire: function(uuid) {
        }
        
    };
    
});
