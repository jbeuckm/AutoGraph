/**
 * Implement basic input to output signal routing
 */
angular.module('AutoGraph').controller('BaseComponentController', ['$scope', function($scope) {

    $scope.receiveTick = function(input) {
console.log('receiveTick');

        $scope.$broadcast('tick');
    };

}]);
