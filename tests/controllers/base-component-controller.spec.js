describe('BaseComponentController', function(){

    beforeEach(module('AutoGraph'));

    it('should create basic component', inject(function($controller) {
        var scope = { component: {} },
            ctrl = $controller('BaseComponentController', {$scope:scope});

        expect(scope.generateTick).not.toBeNull();
    }));

});
