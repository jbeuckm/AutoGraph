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
            for (var i in index) {
                var destinationList = index[i];
                for (var dest in destinationList) {
                    var wire = destinationList[dest];
                    if (wire.uuid == uuid) {
                        delete destinationList[dest];
                        console.log('deleted wire '+JSON.stringify(wire));
                    }
                }
            }
        }
        
    };
    
});
