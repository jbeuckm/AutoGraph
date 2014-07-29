angular.module('AutoGraph').directive('component', function(){

    return {
        restrict: 'E',
        replace: true,
        transclude: true,
        templateUrl: 'base-component/base-component-template.svg',

        link: function (scope, elem, attrs) {
            // Extract the child text element to replace the SVG element.
            var child = angular.element(elem[0].firstElementChild);

            // Copy properties over.
            for (attrName in attrs) {
                if(typeof attrs[attrName] === "string") {
                    child.attr(attrName, attrs[attrName]);
                }
            }

            elem.replaceWith(child);

            scope.rectWidth = 100;
            scope.rectHeight = 30;
        }

    };

});
