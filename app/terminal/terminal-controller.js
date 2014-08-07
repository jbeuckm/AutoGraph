angular.module('AutoGraph').controller('TerminalController', ['$scope', 'rfc4122', function($scope, rfc4122) {

    $scope.terminal.uuid = rfc4122.newUuid();

    $scope.terminalIndex[$scope.terminal.uuid] = this;

}]);
