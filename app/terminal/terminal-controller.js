angular.module('AutoGraph').controller('TerminalController', ['$scope', function($scope) {

     $scope.$on('tick', function() {
        
        console.log("terminal "+$scope.terminal.uuid+" hears tick");
        
    });

}]);
