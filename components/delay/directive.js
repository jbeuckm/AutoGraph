angular.module('AutoGraph').compileProvider.directive('delayComponent', function(){

    return {
        type: 'svg',
        restrict: 'E',
        replace: true,

        link: function (scope, element, attributes, ctrl, transclude) {

        }
    };

});
