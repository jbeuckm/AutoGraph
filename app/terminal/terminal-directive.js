angular.module('AutoGraph').directive('terminal', ['TerminalIndex', function (TerminalIndex) {
    
    var terminalWidth = 16;
    var terminalHeight = 4;

    return {
        type: 'svg',
        restrict: 'E',
        replace: true,
        templateUrl: 'terminal/terminal-template.svg',
        controller: 'TerminalController',

        link: function (scope, element, attributes) {
console.log('terminal link()');           
            scope.updateCenter = function() {
                var trans = element[0].getTransformToElement(scope.svg);
                element[0].center = {
                    x: trans.e + terminalWidth/2,
                    y: trans.f + ((scope.direction == 'input')? -terminalHeight/2 : terminalHeight/2)
                };
            };

            scope.$on('COMPONENT_MOVED', function(a, b){
                scope.updateCenter();
            });
            scope.updateCenter();

            TerminalIndex.addTerminalElement(scope.terminal.uuid, element[0]);

            scope.direction = attributes['type'];

            if (scope.direction == 'input') {
                scope.dy = -terminalHeight;
                scope.labelDy = -16;
            } else {
                scope.dy = 0;
                scope.labelDy = 32;

                scope.$on('tick', scope.sendTick);
            }

            scope.height = terminalHeight;
            scope.mouseOver = function(e) {
                scope.height = terminalHeight * 2;
                if (scope.direction == 'input') {
                    scope.dy = -2 * terminalHeight;
                }
                element.find('text').css('visibility', 'visible');
            };
            scope.mouseOut = function(e) {
                scope.height = terminalHeight;
                if (scope.direction == 'input') {
                    scope.dy = -terminalHeight;
                }
                element.find('text').css('visibility', 'hidden');
            };

            scope.mouseDown = function(event) {
                scope.updateCenter();
                scope.initiateWire(scope.terminal);
                event.stopPropagation();
            };
            scope.mouseUp = function(event) {
                scope.completeWire(scope.terminal);
                event.stopPropagation();
            };

        }
    };

}]);
