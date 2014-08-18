angular.module('AutoGraph').directive('wire', ['TerminalIndex', function (TerminalIndex) {

        /**
         * @method
         */
        var initialize = function () {
            this.d3 = d3.select(this.el);
            var m = this.model;


            /*
             var lineGraphTarget = this.d3.append("path")
             .attr("stroke", "transparent")
             .attr("stroke-width", 10)
             .attr("fill", "none")
             .style("cursor", "pointer");

             var lineGraph = this.d3.append("path")
             .attr("class", "wire")
             .attr("fill", "none")
             .style("pointer-events", "none");
             */

            this.listenTo(lineGraphTarget, "mouseover", function () {
                lineGraphTarget.attr("stroke", "#333");
            });
            this.listenTo(lineGraphTarget, "mouseout", function () {
                lineGraphTarget.attr("stroke", "transparent");
            });
            this.listenTo(lineGraphTarget, "contextmenu", function (data, index) {

                d3.event.preventDefault();

                if (confirm('Delete this wire?')) {
                    m.destroy();
                }
            });

            this.lineGraphTarget = lineGraphTarget;
            this.lineGraph = lineGraph;

            var origin = m.getOriginModel();
            var destination = m.getDestinationModel();

            this.listenTo(origin, "change", this.render, this);
            this.listenTo(destination, "change", this.render, this);

            var self = this;

            this.listenTo(m, "destroy", function () {
                self.d3.remove();
            });

        };

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
console.log(scope.wire);
            if (!scope.wire) throw('no wire model found');

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
            
            scope.$watch('originTerminal', function(){
console.log('origin terminal watched');
                scope.render(scope);
            });
            scope.$watch('destinationTerminal', function(){
console.log('dest terminal watched');
                scope.render(scope);
            });
            
            scope.$on('move', function(){
                console.log('move');
            });

        },
    };

}]);
