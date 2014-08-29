'use strict';

describe('ComponentLibrary Service', function(){

    var componentLibraryService;

    beforeEach(function(){

        angular.mock.module('AutoGraph');

        inject(function($injector){
            componentLibraryService = $injector.get('ComponentLibrary');
        });
    });


    it('should save and load configuration', function(){

        var newComponent = componentLibraryService.componentFromTemplate({});

        expect(newComponent.uuid).not.toBeNull();

    });

});
