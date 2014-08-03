angular.module('AutoGraph').controller('AutographController', ['$scope', 'rfc4122', 'cursorModeService', 'AutographSerializerService',
    function($scope, rfc4122, cursorModeService, AutographSerializerService) {

        $scope.placed = AutographSerializerService.loadAutograph();

        $scope.mouseUp = function(e) {
            switch (cursorModeService.mode) {
                case 'component':
                    $scope.placeNewComponent(cursorModeService.object, e.x, e.y);
                    break;
            }

            AutographSerializerService.saveAutograph($scope.placed);
        };

        $scope.placeNewComponent = function(modelTemplate, x, y) {

            var newComponentModel = JSON.parse(JSON.stringify(modelTemplate));

            newComponentModel.x = x;
            newComponentModel.y = y;

            $scope.placed.components[rfc4122.newUuid()] = newComponentModel;
        };

        $scope.clearComponents = function() {
            $scope.placed.components = {};
            $scope.wires.components = {};
            AutographSerializerService.saveAutograph($scope.placed);
        }

    }
]);
