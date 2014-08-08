angular.module('AutoGraph').directive('terminal', function () {

    return {
        type: 'svg',
        restrict: 'E',
        replace: true,
        templateUrl: 'terminal/terminal-template.svg',
        controller: 'TerminalController',

        link: function (scope, element, attributes) {

            element[0].getCenter = function() {
                var trans = this.getTransformToElement(scope.svg);
                return {
                    x: trans.e + 7,
                    y: trans.f + ((scope.direction == 'input')? -2 : 2)
                };
            };

            scope.terminalElementIndex[scope.terminal.uuid] = element[0];

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
                scope.initiateWire(scope.terminal);
                event.stopPropagation();
            };
            scope.mouseUp = function(event) {
                scope.completeWire(scope.terminal);
                event.stopPropagation();
            };

        }
    };

});
