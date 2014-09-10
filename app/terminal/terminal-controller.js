angular.module('AutoGraph').controller('TerminalController', ['$scope', function($scope) {

    $scope.sendTick = function() {
        console.log($scope.terminalElementIndex[$scope.terminal.uuid]);
    };

}]);
