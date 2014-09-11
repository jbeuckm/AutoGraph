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
        expect(scope.placed.components).toEqual({});

        var component1template = {
            uuid: 1,
            outputs: [
                {
                    label: "output"
                }
            ]
        };
        var component2template = {
            uuid: 2,
            inputs: [
                {
                    label: "input"
                }
            ]
        };
        var component1 = scope.placeNewComponent(component1template, 10, 10);
        var component2 = scope.placeNewComponent(component2template, 250, 10);
        expect(scope.placed.components).not.toEqual({});

        scope.initiateWire(component1.outputs[0]);
        var wire = scope.completeWire(component2.inputs[0]);
        expect(scope.placed.wires).not.toEqual({});

        scope.deleteWire(wire.uuid);
        expect(scope.placed.wires).toEqual({});
    });

});
