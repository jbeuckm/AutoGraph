angular.module('AutoGraph').controller('ComponentLibraryController', ['$scope', '$rootScope', 'ComponentLibrary', 'CursorMode',
    function($scope, $rootScope, ComponentLibrary, CursorMode) {

    ComponentLibrary.loadComponentLibrary('../components/').then(function(data){

        $scope.components = data;

        $rootScope.$emit('COMPONENT_LIBRARY_LOADED');

    });

    $scope.setCursorMode = function(mode, object) {
        CursorMode.setCursorMode(mode, object);
    };

}]);
