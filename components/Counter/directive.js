angular.module('AutoGraph').compileProvider.directive('counterComponent', function(){

    return {
        type: 'svg',
        restrict: 'E',
        replace: true,

        link: function (scope, element, attributes, ctrl, transclude) {

        }
    };

});
