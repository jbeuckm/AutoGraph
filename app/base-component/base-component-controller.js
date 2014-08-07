/**
 * Implement basic input to output signal routing
 */
angular.module('AutoGraph').controller('BaseComponentController', ['$scope', 'rfc4122', function($scope) {

    $scope.receiveTick = function(input) {
console.log('receiveTick');
    };

}]);
