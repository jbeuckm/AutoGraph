angular.module('AutoGraph').controller('ComponentLibraryController', ['$scope', 'componentLibraryService', function($scope, componentLibraryService) {

    componentLibraryService.loadComponentLibrary('../components/').then(function(data){

        console.log(data);
        $scope.components = data;

    });

}]);
