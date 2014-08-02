angular.module('AutoGraph').directive('autograph', function($window){

    return {
        type: 'svg',
        restrict: 'E',
        replace: true,
        templateUrl: 'autograph-template.xml',
        link: function(scope, element, attributes) {

            scope.initializeWindowSize = function() {
                scope.windowHeight = $window.innerHeight;
                scope.windowWidth = $window.innerWidth;
            };
            angular.element($window).bind('resize', function() {
                scope.initializeWindowSize();
            });
            scope.initializeWindowSize();
        }
    };

});
