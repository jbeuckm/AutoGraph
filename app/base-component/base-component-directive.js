angular.module('AutoGraph').directive('component', ['$document', '$compile', '$timeout', function($document, $compile, $timeout){

    return {
        type: 'svg',
        restrict: 'E',
        replace: true,
        transclude: true,
        templateUrl: 'base-component/base-component-template.svg',

        link: function (scope, element, attributes, ctrl, transclude) {

            var padding = 4;

            var componentDirective = angular.element(document.createElement(attributes['type']+'-component'));
            componentDirective.attr('id', scope.component.uuid);
            componentDirective.attr('transform', 'translate('+padding+','+padding+')');
            $compile( componentDirective )( scope );
            element.append(componentDirective);

            $timeout(function(){
                $timeout(function(){
                    var el = document.getElementById(scope.component.uuid);

                    var bb  = el.getBoundingClientRect();

                    scope.rectWidth = 2 * padding + bb.width;
                    scope.rectHeight = 2 * padding + bb.height;
                }, 0);
            }, 0);

            element.on('mousedown', function(event) {
                // Prevent default dragging of selected content
                event.preventDefault();
                startX = event.pageX - scope.component.x;
                startY = event.pageY - scope.component.y;
                $document.on('mousemove', mousemove);
                $document.on('mouseup', mouseup);
            });

            function mousemove(event) {
                scope.component.y = event.pageY - startY;
                scope.component.x = event.pageX - startX;
                scope.$apply();
            }

            function mouseup() {
                $document.off('mousemove', mousemove);
                $document.off('mouseup', mouseup);
            }

        }


    };

}]);
