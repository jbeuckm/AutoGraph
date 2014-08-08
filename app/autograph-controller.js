angular.module('AutoGraph').controller('AutographController', ['$scope', '$rootScope', 'rfc4122', 'cursorModeService', 'AutographSerializerService',
    function($scope, $rootScope, rfc4122, cursorService, serializer) {

        $rootScope.$on('COMPONENT_LIBRARY_LOADED', function(){
            $scope.placed = serializer.loadAutograph();
        });
        $scope.terminalElementIndex = {};

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
                    $scope.terminalElementIndex[object.inputs[i].uuid] = object.inputs[i];
                }

            if (object.outputs)
                for (var i= 0, l=object.outputs.length; i<l; i++) {
                    object.outputs[i].uuid = rfc4122.newUuid();
                    $scope.terminalElementIndex[object.outputs[i].uuid] = object.outputs[i];
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
console.log('initiate wire');
            $scope.tempTerminal = {
                uuid: rfc4122.newUuid()
            };

            $scope.terminalElementIndex[$scope.tempTerminal.uuid] = $scope.tempTerminal;

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
            if (cursorService.mode == "terminal") {
                $scope.tempTerminal.x = e.clientX;
                $scope.tempTerminal.y = e.clientY;
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
