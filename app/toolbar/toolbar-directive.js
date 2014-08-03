angular.module('AutoGraph').directive('toolbar', function($window){

    return {
        restrict: 'E',
        replace: true,
        templateUrl: 'toolbar/toolbar-template.xml',
        link: function(scope, element, attributes) {

            scope.clearAutograph = function() {
                if (confirm("Clear all components?")) {

                }
            };

        }
    };

});
