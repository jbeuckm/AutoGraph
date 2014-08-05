angular.module('AutoGraph').directive('counterDirective', function(){

    return {
        type: 'svg',
        restrict: 'E',
        replace: true,
        transclude: true,

        link: function (scope, element, attributes, ctrl, transclude) {
            alert("counter linked!");
        }
    };

});
