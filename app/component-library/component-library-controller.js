angular.module('AutoGraph').controller('ComponentLibraryController', ['$scope', '$rootScope', 'componentLibraryService', 'cursorModeService',
    function($scope, $rootScope, componentLibraryService, cursorModeService) {

    componentLibraryService.loadComponentLibrary('../components/').then(function(data){

        $scope.components = data;

        $rootScope.$emit('COMPONENT_LIBRARY_LOADED');

    });

    $scope.setCursorMode = function(mode, object) {
        cursorModeService.setCursorMode(mode, object);
    };

}]);
