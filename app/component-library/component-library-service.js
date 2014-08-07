angular.module('AutoGraph').factory('componentLibraryService', function ($rootScope, $document, $http, $q) {

    /**
     * Load the model template and create the directive for given component
     * @param slug
     */
    function loadComponent(path, slug) {

        var d = $q.defer();

        var componentPath = path + slug + '/';

        var files = {
            model: forceLoadResolve(componentPath + 'model.json'),
            template: forceLoadResolve(componentPath + 'template.svg'),
            brain: forceLoadResolve(componentPath + 'brain.js')
        };

        $q.all(files).then(function(results) {
                console.log('component files attempted');
console.log(results);

            var templateUrl = "base-component/default-template.svg";
            if (results.template) {
                templateUrl = componentPath + 'template.svg';
            }

            var brain = null;
            if (results.brain) {
                brain = new (eval(results.brain))();
            }

            angular.module('AutoGraph').compileProvider.directive(slug + "ComponentType", function () {
                return {
                    type: 'svg',
                    restrict: 'E',
                    replace: true,
                    templateUrl: templateUrl,
                    link: (brain)? brain.link : null,
                    controller: (brain)? brain.controller : null
                };
            });

            d.resolve(results.model);
        })
        .catch(function(err){
            d.reject(err);
        });

        return d.promise;
    }

    /**
     * Force a resolution (null if error) so that Q.all([]) can attempt to load all files.
     * @param path
     * @return {*}
     */
    function forceLoadResolve(path) {

        var d = $q.defer();

        $http.get(path)
            .then(function(result){
                d.resolve(result.data);
            })
            .catch(function(err){
                d.resolve(null);
            });

        return d.promise;

    }


    return {

        loadComponentLibrary: function (path) {

            return $http.get(path + 'components.json')
                .then(function (result) {

                    var promises = [];

                    for (var i in result.data) {
                        promises.push(loadComponent(path, result.data[i]));
                    }

                    return $q.all(promises).then(function (models) {
                        return models;
                    });

                });

        }

    };

});
