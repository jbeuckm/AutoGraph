angular.module('AutoGraph').directive('wire', ['$rootScope', 'TerminalIndex', function ($rootScope, TerminalIndex) {

    /**
     * @method
     */
    var render = function (scope) {

        if (!scope.originTerminal) {
            console.log("deferring render: no origin");
            return;
        }
        if (!scope.destinationTerminal) {
            console.log("deferring render: no destination");
            return;
        }

        var originCenter = scope.originTerminal.center;
        var destinationCenter = scope.destinationTerminal.center;

        scope.linePoints = [
            { x: originCenter.x, y: originCenter.y },
            { x: destinationCenter.x, y: destinationCenter.y }
        ];

        scope.lineData = scope.lineFunction(scope.linePoints);

        return;

    };


    return {
        type: 'svg',
        restrict: 'E',
        replace: true,
        templateUrl: 'wire/wire-template.svg',
        link: function (scope, element, attributes) {
console.log('wire link()');
            if (!scope.wire) {
                throw('no wire model found');
            }
            
            scope.lineFunction = d3.svg.line()
                .x(function (d) {
                    return d.x;
                })
                .y(function (d) {
                    return d.y;
                })
                .interpolate("bundle");

            scope.originTerminal = TerminalIndex.terminalElementForUUID(scope.wire.origin);
            scope.destinationTerminal = TerminalIndex.terminalElementForUUID(scope.wire.destination);
            
            scope.render = render;
            scope.render(scope);

            scope.$on('$destroy', function(){
                console.log('destroy'); 
            });
            scope.$watch('wire.origin', function(){
                scope.originTerminal = TerminalIndex.terminalElementForUUID(scope.wire.origin);
            });
            scope.$watch('wire.destination', function(a, b){
                scope.destinationTerminal = TerminalIndex.terminalElementForUUID(scope.wire.destination);
            });
            
            scope.$watch('originTerminal.center', function(){
                scope.render(scope);
            });
            scope.$watch('destinationTerminal.center', function(){
                scope.render(scope);
            });
            
            element[0].addEventListener('contextmenu', function(e) {
                e.preventDefault();
                if (confirm('Delete this wire?')) {
                    $rootScope.deleteWire(scope.wire.uuid);
                }
            });
            element[0].addEventListener('mouseover', function(e) {
                element.addClass('hilighted');
            });
            element[0].addEventListener('mouseout', function(e) {
                element.removeClass('hilighted');
            });
            
            scope.$on('move', function(){
                console.log('move');
            });

        },
    };

}]);
