/**
 * Implement basic input to output signal routing
 */
angular.module('AutoGraph').controller('BaseComponentController', ['$scope', 'rfc4122', function($scope, rfc4122) {

    $scope.receiveTick = function(input) {
console.log('receiveTick');
    };

}]);
