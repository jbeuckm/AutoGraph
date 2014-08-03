'use strict';

describe('wire-directive', function(){

    var scope;

    beforeEach(angular.mock.module('AutoGraph'));

    beforeEach(angular.mock.inject(function($rootScope, $controller){
        scope = $rootScope.$new();
        $controller('AutographController', {$scope: scope});
    }));

    it('should place and clear wires', function(){

        scope.placeNewComponent({}, 10, 10);
        scope.placeNewComponent({}, 250, 10);
        expect(scope.placed.components).not.toEqual({});


    });

});
