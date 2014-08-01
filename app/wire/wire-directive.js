angular.module('AutoGraph').directive('wire', function($window){

    return {
        restrict: 'E',
        replace: true,
        templateUrl: 'wire-template.xml',
        link: function(scope, element, attributes) {

        }
    };

});
