angular.module('AutoGraph').controller('ComponentLibraryController', ['$scope', 'componentLibraryService', function($scope, componentLibraryService) {

    componentLibraryService.loadComponentLibrary('../components/components.json').then(function(data){
console.log(data);
        $scope.components = data;
    });

}]);
