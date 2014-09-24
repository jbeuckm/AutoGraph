/**
 * Implement basic input to output signal routing
 */
angular.module('AutoGraph').controller('BaseComponentController', ['$scope', function($scope) {
    
    $scope.generateTick = function(input) {
        console.log('controller generateTick()');
        $scope.$broadcast('tick');
    };

    $scope.processCallback = function(err, outputs) {
        $scope.generateTick();
    };
    
    $scope.receiveTick = function(source) {

        console.log('tick');
        console.log(angular.element(source));

        var tickSource = null;
        var inputs = {};

        if ($scope.processFunction) {
            $scope.processFunction(tickSource, inputs, $scope.processCallback);
        } else {
            $scope.processCallback(inputs);
        }
    };

}]);
