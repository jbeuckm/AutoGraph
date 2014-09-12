describe('base-component-directive', function(){

    var element, scope;

    beforeEach(angular.module('AutoGraph'));

    beforeEach(inject(function($rootScope, $compile){
        scope = $rootScope.$new();
    }));

    function compileDirective(tpl) {
        if (!tpl) {
            tpl = '<component></component>';
        }

        inject(function($compile){
            element = $compile(tpl)(scope);
        });

        scope.$digest();
    }

    describe('initialization', function(){

        beforeEach(function(){
            compileDirective();
        });
        /*
         it('should produce a rect and a label', function(){
         console.log(element);
         //            expect(element.find('rect').length).toBeGreaterThan(0);
         });
         */
    });

});
