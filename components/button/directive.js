angular.module('AutoGraph').directive('button', function(){

    return {
        type: 'svg',
        restrict: 'E',
        replace: true,
        transclude: true,
        templateUrl: 'base-component/base-component-template.svg',

        link: function (scope, element, attributes, ctrl, transclude) {
        }
    };

});
