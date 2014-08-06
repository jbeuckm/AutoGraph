angular.module('AutoGraph').directive('componentLibrary', function(){

    return {
        restrict: 'E',
        replace: true,
        templateUrl: 'component-library/component-library-template.xml',
        controller: 'ComponentLibraryController',

        link: function(scope, element, attributes) {
        }
    };

});
