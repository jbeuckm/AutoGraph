angular.module('AutoGraph').controller('AutographController', ['$scope', 'rfc4122', 'cursorModeService', 'AutographSerializerService',
    function($scope, rfc4122, cursorModeService, AutographSerializerService) {

        $scope.placed = AutographSerializerService.loadAutograph();

        $scope.mouseUp = function(e) {
            switch (cursorModeService.mode) {
                case 'component':
                    $scope.placeNewComponent(cursorModeService.object, e.x, e.y);
                    cursorModeService.mode = null;
                    break;
            }

            AutographSerializerService.saveAutograph($scope.placed);
        };

        $scope.componentFromTemplate = function(componentTemplate) {
            return JSON.parse(JSON.stringify(componentTemplate));
        };

        $scope.placeNewComponent = function(componentTemplate, x, y) {

            var newComponentModel = $scope.componentFromTemplate(componentTemplate);

            newComponentModel.x = x;
            newComponentModel.y = y;

            $scope.placed.components[rfc4122.newUuid()] = newComponentModel;
        };

        $scope.clearComponents = function() {
            $scope.placed.components = {};
            $scope.placed.wires = {};
            AutographSerializerService.saveAutograph($scope.placed);
        }

    }
]);
