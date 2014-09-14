/**
 * Implement basic input to output signal routing
 */
angular.module('AutoGraph').controller('BaseComponentController', ['$scope', function($scope) {

    $scope.generateTick = function(input) {

        $scope.$broadcast('tick');
        
    };

}]);
