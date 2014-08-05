angular.module('AutoGraph').factory('componentLibraryService', function($rootScope, $document, $http, $q) {

    function loadDirective(url){
        var d = $q.defer();
        function onScriptLoad(e) {
            // Load client in the browser
            $rootScope.$apply(function() { d.resolve(e); });
        }
        // Create a script tag with d3 as the source
        // and call our onScriptLoad callback when it
        // has been loaded
        var scriptTag = $document[0].createElement('script');
        scriptTag.type = 'text/javascript';
        scriptTag.async = true;
        scriptTag.src = url;
        scriptTag.onreadystatechange = function () {
            if (this.readyState == 'complete') onScriptLoad();
        };
        scriptTag.onload = onScriptLoad;

        var s = $document[0].getElementsByTagName('body')[0];
        s.appendChild(scriptTag);

        return {
            directive: function() { return d.promise; }
        };
    }


    return {

        loadComponentLibrary: function(path) {

            return $http.get(path + 'components.json')
                .then(function(result) {

                    var promises = [];

                    for (var i in result.data) {
                        promises.push($http.get(path + result.data[i] + '/model.json'));
                        loadDirective(path + result.data[i] + '/directive.js');
                    }

                    return $q.all(promises).then(function(){
                        return arguments[0].map(function(d){ return d.data; });
                    });

                });
        }

    };

});
