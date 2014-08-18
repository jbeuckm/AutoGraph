'use strict';

describe('AutographController', function(){

    var scope;

    beforeEach(angular.mock.module('AutoGraph'));

    beforeEach(angular.mock.inject(function($rootScope, $controller){
        scope = $rootScope.$new();
        $controller('AutographController', {$scope: scope});
    }));

    xit('should generate a component instance from a template', function(){
        expect(scope.componentFromTemplate).not.toEqual(null);
    });

    it('should place and clear components', function(){

        scope.clearComponents();

        expect(scope.placed.components).not.toEqual(null);
        scope.placeNewComponent({slug:"counter"}, 1, 2);
        expect(scope.placed.components).not.toEqual({});
        scope.clearComponents();
        expect(scope.placed.components).toEqual({});
    });

});
