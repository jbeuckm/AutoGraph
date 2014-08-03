angular.module('AutoGraph').directive('terminal', function () {

    return {
        type: 'svg',
        restrict: 'E',
        replace: true,
        templateUrl: 'terminal/terminal-template.svg',
        link: function (scope, element, attributes) {

            if (attributes['type'] == 'input') {
                scope.dy = -4;
                scope.labelDy = -16;
            } else {
                scope.dy = 0;
                scope.labelDy = 32;
            }

        }
    };

});
