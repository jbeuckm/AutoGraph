angular.module('AutoGraph').directive('component', function($document, $compile){

    return {
        type: 'svg',
        restrict: 'E',
        replace: true,
        transclude: true,
        templateUrl: 'base-component/base-component-template.svg',

        link: function (scope, element, attributes, ctrl, transclude) {

            var component = angular.element(document.createElement(attributes['type']+'-component'));
            var el = $compile( component )( scope );

            //where do you want to place the new element?
            element.append(el);


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

            scope.rectWidth = 100;
            scope.rectHeight = 28;
        }


    };

});
