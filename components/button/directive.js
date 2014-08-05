angular.module('AutoGraph').directive('buttonComponent', function(){

    return {
        type: 'svg',
        restrict: 'E',
        replace: true,
        tempalteUrl: 'tempalte.svg',

        link: function (scope, element, attributes, ctrl, transclude) {
            alert("button linked!");
        }
    };

});
