angular.module('AutoGraph').controller('AutographController', ['$scope', '$rootScope', 'rfc4122', 'CursorMode', 'AutographSerializer', 'TerminalIndex', 'ComponentLibrary', '$timeout', 
    function($scope, $rootScope, rfc4122, CursorMode, serializer, TerminalIndex, ComponentLibrary, $timeout) {


        $rootScope.$on('COMPONENT_LIBRARY_LOADED', function(){
            
            var loaded = serializer.loadAutograph();
            
            var componentCount = Object.keys(loaded.components).length;
            var wireCount = Object.keys(loaded.wires).length;
            console.log('serializer loaded '+componentCount+' components and '+wireCount+' wires');

            $scope.placed = {
                components: loaded.components
            };
            
            $timeout(function() {
                $scope.placed.wires = loaded.wires;
            });
            
        });

        $scope.mouseUp = function(e) {
            switch (CursorMode.mode) {

                case 'component':
                    $scope.placeNewComponent(CursorMode.object, e.clientX, e.clientY);
                    CursorMode.mode = null;
                    break;

                case 'wire':
                    console.log('cancel wire');
                    delete $scope.placed.wires[$scope.newWire.uuid];
                    CursorMode.mode = null;
                    break;

            }

            serializer.saveAutograph($scope.placed);
        };


        $scope.placeNewComponent = function(componentTemplate, x, y) {

            var newComponentModel = ComponentLibrary.componentFromTemplate(componentTemplate);

            newComponentModel.x = x;
            newComponentModel.y = y;

            $scope.placed.components[newComponentModel.uuid] = newComponentModel;
        };

        $scope.initiateWire = function(originTerminal) {
console.log('initiate wire with term '+JSON.stringify(originTerminal));

            var origin = TerminalIndex.terminalElementForUUID(originTerminal.uuid);

            $scope.tempTerminal = {
                uuid: rfc4122.newUuid(),
                center: origin.center
            };

            TerminalIndex.addTerminalElement($scope.tempTerminal.uuid, $scope.tempTerminal);

            $scope.newWire = {
                uuid: rfc4122.newUuid(),
                origin: originTerminal.uuid,
                destination: $scope.tempTerminal.uuid
            };

            $scope.placed.wires[$scope.newWire.uuid] = $scope.newWire;

            CursorMode.mode = "wire";
        };
        $scope.completeWire = function(destinationTerminal) {
console.log('complete wire');
            $scope.newWire.destination = destinationTerminal.uuid;

            CursorMode.mode = null;
        };
        $scope.mouseMove = function(e) {
            if (CursorMode.mode == "wire") {
                
                var originTerminal = TerminalIndex.terminalElementForUUID($scope.newWire.origin);
                var originCenter = originTerminal.center;
                
                $scope.tempTerminal.center = {
                    x: e.clientX,
                    y: e.clientY
                };
            }
        };

        $scope.clearComponents = function() {
            $scope.placed = {
                components: {},
                wires: {}
            };
            serializer.saveAutograph($scope.placed);
        };

        $rootScope.$on('CLEAR_AUTOGRAPH', $scope.clearComponents);

    }
]);
