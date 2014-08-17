angular.module('AutoGraph').controller('AutographController', ['$scope', '$rootScope', 'rfc4122', 'cursorModeService', 'AutographSerializer', 'TerminalIndex',
    function($scope, $rootScope, rfc4122, cursorService, serializer, TerminalIndex) {


        $rootScope.$on('COMPONENT_LIBRARY_LOADED', function(){
            var loaded = serializer.loadAutograph();
            var componentCount = Object.keys(loaded.components).length;
            var wireCount = Object.keys(loaded.wires).length;
            console.log('serializer loaded '+componentCount+' components and '+wireCount+' wires');
            $scope.placed = {
                components: loaded.components
            };
//            $scope.$apply();
            $scope.placed.wires = loaded.wires;
        });

        $scope.mouseUp = function(e) {
            switch (cursorService.mode) {

                case 'component':
                    $scope.placeNewComponent(cursorService.object, e.clientX, e.clientY);
                    cursorService.mode = null;
                    break;

                case 'wire':
                    console.log('cancel wire');
                    $scope.placed.wires[$scope.newWire.uuid] = null;
                    cursorService.mode = null;
                    break;

            }

            serializer.saveAutograph($scope.placed);
        };

        $scope.componentFromTemplate = function(componentTemplate) {
            var object = JSON.parse(JSON.stringify(componentTemplate));
            object.uuid = rfc4122.newUuid();

            if (object.inputs)
                for (var i= 0, l=object.inputs.length; i<l; i++) {
                    object.inputs[i].uuid = rfc4122.newUuid();
                    TerminalIndex.addTerminalElement(object.inputs[i]);
                }

            if (object.outputs)
                for (var i= 0, l=object.outputs.length; i<l; i++) {
                    object.outputs[i].uuid = rfc4122.newUuid();
                    TerminalIndex.addTerminalElement(object.outputs[i]);
                }

            return object;
        };

        $scope.placeNewComponent = function(componentTemplate, x, y) {

            var newComponentModel = $scope.componentFromTemplate(componentTemplate);

            newComponentModel.x = x;
            newComponentModel.y = y;

            $scope.placed.components[newComponentModel.uuid] = newComponentModel;
        };

        $scope.initiateWire = function(originTerminal) {
console.log('initiate wire with term '+JSON.stringify(originTerminal));

            var origin = TerminalIndex.terminalElementForUUID(originTerminal.uuid);

            $scope.tempTerminal = {
                uuid: rfc4122.newUuid(),
                getCenter: function() {
                    return this.center;
                },
                center: origin.getCenter()
            };

            TerminalIndex.addTerminalElement($scope.tempTerminal);

            $scope.newWire = {
                uuid: rfc4122.newUuid(),
                origin: originTerminal.uuid,
                destination: $scope.tempTerminal.uuid
            };

            $scope.placed.wires[$scope.newWire.uuid] = $scope.newWire;

            cursorService.mode = "wire";
        };
        $scope.completeWire = function(destinationTerminal) {
console.log('complete wire');
            $scope.newWire.destination = destinationTerminal.uuid;

            cursorService.mode = null;
        };
        $scope.mouseMove = function(e) {
            if (cursorService.mode == "wire") {
                
                var originTerminal = TerminalIndex.terminalElementForUUID($scope.newWire.origin);
                var originCenter = originTerminal.getCenter();
                
console.log("moving temp terminal from "+originCenter.x+", "+originCenter.y+" to "+e.clientX+", "+e.clientY);
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
