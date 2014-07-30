angular.module('AutoGraph').directive('component', function(){

    return {
        restrict: 'E',
        replace: true,
        transclude: true,
        templateUrl: 'base-component/base-component-template.svg',

        link: function (scope, element, attributes) {
return;
            // Extract the child text element to replace the SVG element.
            var child = angular.element(element[0].firstElementChild);

            scope.rectWidth = 100;
            scope.rectHeight = 30;
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
