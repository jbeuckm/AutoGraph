angular.module('AutoGraph').directive('component', ['$rootScope', '$document', '$compile', '$timeout', 
                                                    function($rootScope, $document, $compile, $timeout){

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
                scope.startX = event.pageX - scope.component.x;
                scope.startY = event.pageY - scope.component.y;
                $document.on('mousemove', mousemove);
                $document.on('mouseup', mouseup);
            });

            function mousemove(event) {
                scope.component.y = event.pageY - scope.startY;
                scope.component.x = event.pageX - scope.startX;
                scope.$broadcast('COMPONENT_MOVED', { component:scope.component });
                scope.$apply();
            }

            function mouseup() {
                $document.off('mousemove', mousemove);
                $document.off('mouseup', mouseup);
                scope.$broadcast('COMPONENT_MOVED', { component:scope.component });
                scope.$emit('COMPONENT_MOVE_SETTLED', { component:scope.component });
                scope.$apply();
            }

            
            element[0].addEventListener('contextmenu', function(e) {
                e.preventDefault();
                if (confirm('Delete this component?')) {
                    $rootScope.deleteComponent(scope.component.uuid);
                }
            });

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
