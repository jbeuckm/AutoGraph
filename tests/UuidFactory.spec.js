'use strict';

describe('UuidFactory', function(){

    var MyFactory;

    beforeEach(function(){

        angular.mock.module('AutoGraph');

        inject(function($injector){
            MyFactory = $injector.get('rfc4122');
        });
    });


    it('should place and clear components', function(){
        var uuid = MyFactory.newUuid();
        console.log(uuid);
        expect(uuid).toMatch(/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/);
    });

});
