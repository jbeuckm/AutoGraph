angular.module('AutoGraph').directive('terminal', function () {

    return {
        type: 'svg',
        restrict: 'E',
        replace: true,
        templateUrl: 'terminal/terminal-template.svg',
        controller: 'TerminalController',

        link: function (scope, element, attributes) {

            scope.direction = attributes['type'];

            if (scope.direction == 'input') {
                scope.dy = -4;
                scope.labelDy = -16;
            } else {
                scope.dy = 0;
                scope.labelDy = 32;

                scope.$on('tick', scope.sendTick);
            }

            scope.height = 4;
            scope.mouseOver = function(e) {
                scope.height = 8;
                if (scope.direction == 'input') {
                    scope.dy = -8;
                }
                element.find('text').css('visibility', 'visible');
            };
            scope.mouseOut = function(e) {
                scope.height = 4;
                if (scope.direction == 'input') {
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
