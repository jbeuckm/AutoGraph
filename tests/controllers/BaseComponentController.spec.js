describe('BaseComponentController', function(){

    beforeEach(module('AutoGraph'));

    it('should create "phones" model with 3 phones', inject(function($controller) {
        var scope = {},
            ctrl = $controller('BaseComponentController', {$scope:scope});

        expect(scope.generateTick).not.toBeNull();
    }));

});
