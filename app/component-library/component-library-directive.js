angular.module('AutoGraph').directive('componentLibrary', function(){

    return {
        restrict: 'E',
        replace: true,
        templateUrl: 'component-library/component-library-template.xml',
        link: function(scope, element, attributes) {
        }
    };

});
