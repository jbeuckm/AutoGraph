angular.module('AutoGraph').controller('ComponentLibraryController', ['$scope', 'componentLibraryService', 'cursorModeService', function($scope, componentLibraryService, cursorModeService) {

    componentLibraryService.loadComponentLibrary('../components/').then(function(data){

        $scope.components = data;

    });

    $scope.setCursorMode = cursorModeService.setCursorMode;

}]);
