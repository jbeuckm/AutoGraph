angular.module('AutoGraph').directive('wire', function () {

    return {
        type: 'svg',
        restrict: 'E',
        replace: true,
        templateUrl: 'wire/wire-template.svg',
        link: function (scope, element, attributes) {
            scope.lineData = "M150 0 L75 200 L225 200 Z";

            scope.$watch(scope.wire, function(){
                if (scope.wire) {
                    var origin = scope.terminalElementIndex[scope.wire.origin];
                    var destination = scope.terminalElementIndex[scope.wire.destination];
                    console.log('origin:');
                    console.log(origin);


                    var svg = scope.svg;
                    var trans = origin.getTransformToElement(svg);
console.log(trans);
                    scope.lineData = "M0 0 L"+trans.e+" "+trans.f;

//                    var bb = this.getBoundingBoxInArbitrarySpace(origin, trans);


                /**
                 * @method
                 * @param element
                 * @param mat
                 * @return {Object}
                 */
                function getBoundingBoxInArbitrarySpace (element, mat) {
                    var svgRoot = element.ownerSVGElement;
                    var bbox = element.getBBox();

                    var cPt1 = svgRoot.createSVGPoint();
                    cPt1.x = bbox.x;
                    cPt1.y = bbox.y;
                    cPt1 = cPt1.matrixTransform(mat);

                    // repeat for other corner points and the new bbox is
                    // simply the minX/minY  to maxX/maxY of the four points.
                    var cPt2 = svgRoot.createSVGPoint();
                    cPt2.x = bbox.x + bbox.width;
                    cPt2.y = bbox.y;
                    cPt2 = cPt2.matrixTransform(mat);

                    var cPt3 = svgRoot.createSVGPoint();
                    cPt3.x = bbox.x;
                    cPt3.y = bbox.y + bbox.height;
                    cPt3 = cPt3.matrixTransform(mat);

                    var cPt4 = svgRoot.createSVGPoint();
                    cPt4.x = bbox.x + bbox.width;
                    cPt4.y = bbox.y + bbox.height;
                    cPt4 = cPt4.matrixTransform(mat);

                    var points = [cPt1, cPt2, cPt3, cPt4];

                    //find minX,minY,maxX,maxY
                    var minX = Number.MAX_VALUE;
                    var minY = Number.MAX_VALUE;
                    var maxX = 0;
                    var maxY = 0;
                    for (i = 0; i < points.length; i++) {
                        if (points[i].x < minX) {
                            minX = points[i].x;
                        }
                        if (points[i].y < minY) {
                            minY = points[i].y;
                        }
                        if (points[i].x > maxX) {
                            maxX = points[i].x;
                        }
                        if (points[i].y > maxY) {
                            maxY = points[i].y;
                        }
                    }

                    //instantiate new object that is like an SVGRect
                    var newBBox = {"x": minX, "y": minY, "width": maxX - minX, "height": maxY - minY};
                    return newBBox;
                }

                console.log(bb);
                    scope.lineData = "M0 0 L"+bb.x+" "+bb.y;

                    console.log('destination:');
                    console.log(destination);
                }
            });

        },


        /**
         * @method
         */
        initialize: function () {
            this.d3 = d3.select(this.el);
            var m = this.model;

            this.lineFunction = d3.svg.line()
                .x(function (d) {
                    return d.x;
                })
                .y(function (d) {
                    return d.y;
                })
                .interpolate("bundle");
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

        },

        /**
         * @method
         */
        render: function () {

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

//            this.lineGraph.attr("d", this.lineFunction(this.lineData));
//            this.lineGraphTarget.attr("d", this.lineFunction(this.lineData));
            }

        }

    };


});
