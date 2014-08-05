angular.module('AutoGraph').directive('counterComponent', function(){

    return {
        type: 'svg',
        restrict: 'E',
        replace: true,

        link: function (scope, element, attributes, ctrl, transclude) {
            alert("counter linked!");
        }
    };

});
