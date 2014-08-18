angular.module('AutoGraph').directive('wire', ['TerminalIndex', function (TerminalIndex) {

        /**
         * @method
         */
        var render = function (scope) {
            console.log('render');

            scope.originTerminal = TerminalIndex.terminalElementForUUID(scope.wire.origin);
            scope.destinationTerminal = TerminalIndex.terminalElementForUUID(scope.wire.destination);

            console.log('origin:');
            console.log(scope.originTerminal);
            console.log('destination:');
            console.log(scope.destinationTerminal);

            var originCenter = scope.originTerminal.getCenter();
            var destinationCenter = scope.destinationTerminal.getCenter();

            scope.lineData = "M "+originCenter.x+" "+originCenter.y+" L "+destinationCenter.x+" "+destinationCenter.y;

            return;
            
            
            var m = this.model;

            if (m.get("originTerminalId")) {

                var origin = m.getOriginModel();
                var destination = m.getDestinationModel();

                var dx = destination.get("anchorX") - origin.get("anchorX");
                var dy = destination.get("anchorY") - origin.get("anchorY");
                var distance = Math.sqrt(dx * dx + dy * dy);

                if (distance > 100) {

                    this.lineData = [
                        { x: origin.get("anchorX"), y: origin.get("anchorY") },
                        { x: origin.get("controlPointX"), y: origin.get("controlPointY") },
                        { x: destination.get("controlPointX"), y: destination.get("controlPointY") },
                        { x: destination.get("anchorX"), y: destination.get("anchorY") }
                    ];
                }
                else {
                    this.lineData = [
                        { x: origin.get("anchorX"), y: origin.get("anchorY") },
                        { x: destination.get("anchorX"), y: destination.get("anchorY") }
                    ];
                }

            this.lineGraph.attr("d", this.lineFunction(this.lineData));
            this.lineGraphTarget.attr("d", this.lineFunction(this.lineData));
            }

        };


    return {
        type: 'svg',
        restrict: 'E',
        replace: true,
        templateUrl: 'wire/wire-template.svg',
        link: function (scope, element, attributes) {

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
            
            scope.render = render;
            scope.render(scope);

            scope.originTerminal = TerminalIndex.terminalElementForUUID(scope.wire.origin);
            scope.destinationTerminal = TerminalIndex.terminalElementForUUID(scope.wire.destination);

            scope.$watch('wire.destination', function(){
                console.log('dest change');
            });
            scope.$watch('wire.origin', function(){
                console.log('origin change');
            });
            
            scope.$watch('originTerminal.center', function(){
console.log('origin terminal watched');
                scope.render(scope);
            });
            scope.$watch('destinationTerminal.center', function(){
console.log('dest terminal watched');
                scope.render(scope);
            });
            
            scope.$on('move', function(){
                console.log('move');
            });

        },
    };

}]);
