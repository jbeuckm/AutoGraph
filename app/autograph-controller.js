angular.module('AutoGraph').controller('AutographController', ['$scope', 'rfc4122', 'cursorModeService', function($scope, rfc4122, cursorModeService) {

    $scope.placedComponents = {};

    $scope.placedComponents[rfc4122.newUuid()] = {
        label: "first",
        x: 100,
        y: 50,
        inputs: [
            'in1'
        ],
        outputs: [
            'out1'
        ]
    };

    $scope.placedComponents[rfc4122.newUuid()] =  {
        label: "second",
        x: 300,
        y: 50,
        inputs: [
            'in1',
            'in2'
        ],
        outputs: [
            'out1',
            'out2',
            'out3'
        ]
    };

    $scope.mouseUp = function(e) {
        console.log(e);
        console.log(cursorModeService);
        switch (cursorModeService.mode) {
            case 'component':
                $scope.placeNewComponent(cursorModeService.object, e.x, e.y);
                break;
        }
    };

    $scope.placeNewComponent = function(modelTemplate, x, y) {
console.log('placeNewComponent', modelTemplate, x, y);
        var newComponentModel = JSON.parse(JSON.stringify(modelTemplate));

        newComponentModel.x = x;
        newComponentModel.y = y;

        $scope.placedComponents[rfc4122.newUuid()] = newComponentModel;
    };

}]);
