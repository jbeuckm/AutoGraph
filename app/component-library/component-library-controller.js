angular.module('AutoGraph').controller('ComponentLibraryController', ['$scope', 'componentLibraryService', function($scope, componentLibraryService, cursorModeService) {

    componentLibraryService.loadComponentLibrary('../components/').then(function(data){

        console.log(data);
        $scope.components = data;

    });

}]);
