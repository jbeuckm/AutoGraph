angular.module('AutoGraph').directive('component', function($document){


    return {
        restrict: 'E',
        replace: true,
        transclude: true,
        templateUrl: 'base-component/base-component-template.svg',

        link: function (scope, element, attributes) {

            element.on('mousedown', function(event) {
                // Prevent default dragging of selected content
                event.preventDefault();
                startX = event.pageX - scope.x;
                startY = event.pageY - scope.y;
                $document.on('mousemove', mousemove);
                $document.on('mouseup', mouseup);
            });

            console.log(scope);
            function mousemove(event) {
                scope.y = event.pageY - startY;
                scope.x = event.pageX - startX;
/*
                element.css({
                    top: y + 'px',
                    left:  x + 'px'
                });
*/
            }

            function mouseup() {
                $document.off('mousemove', mousemove);
                $document.off('mouseup', mouseup);
            }

            scope.rectWidth = 100;
            scope.rectHeight = 30;
return;
            // Extract the child text element to replace the SVG element.
            var child = angular.element(element[0].firstElementChild);
/*
            // Copy properties over.
            for (key in attributes) {
                console.log(key+" => "+attributes[key]);
                if(typeof attributes[key] === "string") {
                    child.attr(key, attributes[key]);
                }
            }
*/
            element.replaceWith(child);
        }

    };

});
