angular.module('AutoGraph').controller('AutographController', ['$scope', function($scope) {

    $scope.placedComponents = [
        {
            x: 100,
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
        }
    ];

}]);
