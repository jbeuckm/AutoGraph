angular.module('AutoGraph').directive('component', function($document, $q){

    return {
        type: 'svg',
        restrict: 'E',
        replace: true,
        transclude: true,
        templateUrl: 'base-component/base-component-template.svg',

        link: function (scope, element, attributes, ctrl, transclude) {

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
        },


        loadComponentDirective: function(componentPath, slug){
            var d = $q.defer();
            function onScriptLoad() {
                // Load client in the browser
                $rootScope.$apply(function() { d.resolve(window.d3); });
            }
            // Create a script tag with d3 as the source
            // and call our onScriptLoad callback when it
            // has been loaded
            var scriptTag = $document[0].createElement('script');
            scriptTag.type = 'text/javascript';
            scriptTag.async = true;
            scriptTag.src = componentPath+'/'+slug+'/directive.js';
            scriptTag.onreadystatechange = function () {
                if (this.readyState == 'complete') onScriptLoad();
            }
            scriptTag.onload = onScriptLoad;

            var s = $document[0].getElementsByTagName('body')[0];
            s.appendChild(scriptTag);

            return {
                directive: function() { return d.promise; }
            };
        }

    };

});
