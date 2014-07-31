angular.module('AutoGraph').controller('AutographController', ['$scope', 'rfc4122', 'cursorModeService', 'AutographSerializerService',
    function($scope, rfc4122, cursorModeService, AutographSerializerService) {

        $scope.placedComponents = AutographSerializerService.loadAutograph();

        $scope.mouseUp = function(e) {
            switch (cursorModeService.mode) {
                case 'component':
                    $scope.placeNewComponent(cursorModeService.object, e.x, e.y);
                    break;
            }

            AutographSerializerService.saveAutograph($scope.placedComponents);
        };

        $scope.placeNewComponent = function(modelTemplate, x, y) {

            var newComponentModel = JSON.parse(JSON.stringify(modelTemplate));

            newComponentModel.x = x;
            newComponentModel.y = y;

            $scope.placedComponents[rfc4122.newUuid()] = newComponentModel;
        };

        $scope.clearComponents = function() {
            $scope.placedComponents = {};
            AutographSerializerService.saveAutograph($scope.placedComponents);
        }

    }
]);
