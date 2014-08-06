angular.module('AutoGraph').controller('AutographController', ['$scope', '$rootScope', 'rfc4122', 'cursorModeService', 'AutographSerializerService',
    function($scope, $rootScope, rfc4122, cursorService, serializer) {

        $rootScope.$on('COMPONENT_LIBRARY_LOADED', function(){
            $scope.placed = serializer.loadAutograph();
        });
        $scope.terminalIndex = {};

        $scope.mouseUp = function(e) {
            switch (cursorService.mode) {

                case 'component':
                    $scope.placeNewComponent(cursorService.object, e.x, e.y);
                    cursorService.mode = null;
                    break;

            }

            serializer.saveAutograph($scope.placed);
        };

        $scope.componentFromTemplate = function(componentTemplate) {
            var object = JSON.parse(JSON.stringify(componentTemplate));
            object.uuid = rfc4122.newUuid();

            return object;
        };

        $scope.placeNewComponent = function(componentTemplate, x, y) {

            var newComponentModel = $scope.componentFromTemplate(componentTemplate);

            newComponentModel.x = x;
            newComponentModel.y = y;

            $scope.placed.components[newComponentModel.uuid] = newComponentModel;
        };

        $scope.initiateWire = function(originTerminal) {

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
