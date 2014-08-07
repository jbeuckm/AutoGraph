angular.module('AutoGraph').controller('TerminalController', ['$scope', 'rfc4122', function($scope, rfc4122) {

    function sendTick() {
        console.log($scope.terminalIndex);
    }

    $scope.$on('tick', sendTick);

}]);
