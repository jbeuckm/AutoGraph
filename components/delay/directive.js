angular.module('AutoGraph').directive('delayComponent', function(){

    return {
        type: 'svg',
        restrict: 'E',
        replace: true,

        link: function (scope, element, attributes, ctrl, transclude) {
            alert("delay linked!");
        }
    };

});
