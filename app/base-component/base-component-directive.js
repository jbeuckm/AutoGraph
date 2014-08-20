angular.module('AutoGraph').directive('component', ['$document', '$compile', '$timeout', function($document, $compile, $timeout){

    return {
        type: 'svg',
        restrict: 'E',
        replace: true,
        templateUrl: 'base-component/base-component-template.svg',
        controller: 'BaseComponentController',

        link: function (scope, element, attributes, ctrl, transclude) {

            var padding = 4;

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
                scope.$broadcast('COMPONENT_MOVED', {component:scope.component});
                scope.$apply();
            }

            function mouseup() {
                $document.off('mousemove', mousemove);
                $document.off('mouseup', mouseup);
                scope.$broadcast('COMPONENT_MOVED', {component:scope.component});
                scope.$apply();
            }


            var elementId = scope.component.slug+'-'+scope.component.uuid;

            element.on("DOMSubtreeModified", function(e){

                var el = document.getElementById(elementId);
                if (!el) {
                    return;
                }
                var bb  = el.getBoundingClientRect();

                scope.rectWidth = 2 * padding + bb.width;
                scope.rectHeight = 2 * padding + bb.height;
            });


            var componentDirective = angular.element(document.createElement(attributes['type']+'-component-type'));
            componentDirective.attr('id', elementId);
            componentDirective.attr('transform', 'translate('+padding+','+padding+')');
            $compile( componentDirective )( scope );
            element.append(componentDirective);

            $timeout(function(){
            $timeout(function(){
                scope.$broadcast('COMPONENT_MOVED', {component:scope.component});
            });
            });
        }


    };

}]);
