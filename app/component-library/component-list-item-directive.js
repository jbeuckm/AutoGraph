angular.module('AutoGraph').directive('componentListItem', function(){

    return {
        restrict: 'E',
        replace: true,
        templateUrl: 'component-library/component-list-item-template.xml',
        link: function() {

        }
    };

});
