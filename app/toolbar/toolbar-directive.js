angular.module('AutoGraph').directive('toolbar', function($rootScope){

    return {
        restrict: 'E',
        replace: true,
        templateUrl: 'toolbar/toolbar-template.xml',
        link: function(scope, element, attributes) {

            scope.clearAutograph = function() {
                if (confirm("Clear all components?")) {
                    $rootScope.$emit('CLEAR_AUTOGRAPH');
                }
            };

        }
    };

});
