'use strict';

describe('Serializer Service', function(){

    var serializerService;

    beforeEach(function(){

        angular.mock.module('AutoGraph');

        inject(function($injector){
            serializerService = $injector.get('AutographSerializer');
        });
    });


    it('should save and load configuration', function(){

        var loaded = serializerService.loadAutograph();
        expect(loaded.wires).toEqual({});

        var placed = {
            wires: [0,1,2],
            components: [0,1,2]
        };
        serializerService.saveAutograph(placed);

        loaded = serializerService.loadAutograph();
        expect(loaded.wires.length).toEqual(3);

        serializerService.clearSaved();
        loaded = serializerService.loadAutograph();
        expect(loaded.wires).toEqual({});
    });

});
