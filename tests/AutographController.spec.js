'use strict';

describe('AutographController', function(){

    var scope;

    beforeEach(angular.mock.module('AutoGraph'));

    beforeEach(angular.mock.inject(function($rootScope, $controller){
        scope = $rootScope.$new();
        $controller('AutographController', {$scope: scope});
    }));

    it('should place and clear components', function(){
        expect(scope.placed.components).not.toEqual(null);
        scope.placeNewComponent({}, 1, 2);
        expect(scope.placed.components).not.toEqual({});
        scope.clearComponents();
        expect(scope.placed.components).toEqual({});
    });

});
