angular.module('AutoGraph').directive('terminal', function () {

    return {
        type: 'svg',
        restrict: 'E',
        replace: true,
        templateUrl: 'terminal/terminal-template.svg',
        controller: 'TerminalController',

        link: function (scope, element, attributes) {

            if (attributes['type'] == 'input') {
                scope.dy = -4;
                scope.labelDy = -16;
            } else {
                scope.dy = 0;
                scope.labelDy = 32;
            }

            scope.height = 4;
            scope.mouseOver = function(e) {
                scope.height = 8;
                if (attributes['type'] == 'input') {
                    scope.dy = -8;
                }
                element.find('text').css('visibility', 'visible');
            };
            scope.mouseOut = function(e) {
                scope.height = 4;
                if (attributes['type'] == 'input') {
                    scope.dy = -4;
                }
                element.find('text').css('visibility', 'hidden');
            };

            scope.mouseDown = function(event) {

                scope.initiateWire(this);
                event.stopPropagation();

            };


        }
    };

});
