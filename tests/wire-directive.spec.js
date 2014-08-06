'use strict';

describe('wire-directive', function(){

    var scope, rootScope;

    beforeEach(angular.mock.module('AutoGraph'));

    beforeEach(angular.mock.inject(function($rootScope, $controller){
        rootScope = $rootScope;
        scope = $rootScope.$new();
        $controller('AutographController', { $scope: scope });

        var scope2 = $rootScope.$new();
        $controller('ComponentLibraryController', { $scope: scope2 });

    }));

    beforeEach(function(ready){
        rootScope.$on('COMPONENT_LIBRARY_LOADED', function(){
            console.log('COMPONENT_LIBRARY_LOADED');
            ready();
        });
    });

    beforeEach(function(ready){
        function testScope(){
            if (scope.placed) {
                console.log('scope.placed <> null');
                ready();
            } else {
                setTimeout(testScope, 10);
            }
        }
        setTimeout(testScope, 10);
    });

    it('should place and clear wires', function(){

        scope.clearComponents();
        scope.placeNewComponent({uuid:1}, 10, 10);
        scope.placeNewComponent({uuid:2}, 250, 10);
        expect(scope.placed.components).not.toEqual({});

    });

});
