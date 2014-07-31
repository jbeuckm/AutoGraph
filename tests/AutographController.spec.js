'use strict';

describe('AutographController', function(){
    var scope;//we'll use this scope in our tests

    //mock Application to allow us to inject our own dependencies
    beforeEach(angular.mock.module('AutoGraph'));

    //mock the controller for the same reason and include $rootScope and $controller
    beforeEach(angular.mock.inject(function($rootScope, $controller){
        //create an empty scope
        scope = $rootScope.$new();
        //declare the controller and inject our empty scope
        $controller('AutographController', {$scope: scope});
    }));

    it('should expose a hash of placed components', function(){
        expect(scope.placedComponents).not.toBe(null);
    });

});
