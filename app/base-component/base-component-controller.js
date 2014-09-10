/**
 * Implement basic input to output signal routing
 */
angular.module('AutoGraph').controller('BaseComponentController', ['$scope', function($scope) {

    console.log('$scope.component');
    for (var i in $scope.component.inputs) {
        console.log($scope.component.inputs[i]);

        $scope.component.inputs[i].component = this;
    }
    for (var i in $scope.component.outputs) {
        console.log($scope.component.outputs[i]);
    }

    $scope.generateTick = function(input) {
console.log('generateTick');

        for (var i in $scope.component.outputs) {
            console.log($scope.component.outputs[i].sendTick());
        }
    };

}]);
