angular.module('AutoGraph').compileProvider.directive('buttonComponent', function(){

    return {
        type: 'svg',
        restrict: 'E',
        replace: true,
        templateUrl: '../components/button/template.svg',

        link: function (scope, element, attributes, ctrl, transclude) {

        }
    };

});
