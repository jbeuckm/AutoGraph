'use strict';

describe('ComponentLibrary Service', function(){

    var componentLibraryService;

    beforeEach(function(){

        angular.mock.module('AutoGraph');

        inject(function($injector){
            componentLibraryService = $injector.get('ComponentLibrary');
        });
    });


    it('should generate a component instance from a template', function(){

        var newComponent = componentLibraryService.componentFromTemplate({});

        expect(newComponent.uuid).not.toBeNull();

    });

});
