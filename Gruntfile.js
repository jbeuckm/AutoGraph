module.exports = function (grunt) {

    grunt.initConfig({

        jsdoc: {
            dist: {
                src: ['app/*.js', 'app/base-component', 'app/component-library', 'components'],
                options: {
                    destination: 'doc',
                    configure: 'jsdoc.conf.json'
                }
            }
        },

        jslint: { // configure the task
            client: {
                src: [
                    'app/**/*.js'
                ],
                exclude: [

                ],
                directives: {
                    browser: true,
                    predef: [
                        'jQuery', 'angular', 'confirm', 'define', 'd3'
                    ]
                }
            }
        },

        jshint: {
            options: {
                curly: true,
                eqeqeq: true,
                eqnull: true,
                browser: true,
                globals: {
                    jQuery: true
                },
                ignores: []
            },
            uses_defaults: ['app/**/*.js']
        },

        open : {
            index : {
                path: 'http://localhost:9000/app/index.html'
            }
        },

        command : {
            build: {
                cmd: []
            },
            proxy: {
                cmd: ['screen -S proxy -d -m node proxy-server.js']
            },
            server: {
                cmd: ['screen -S server -d -m python -m SimpleHTTPServer 9000']
            },
            karma: {
                cmd: ['karma start']
            },
            kill: {
                cmd: ['screen -X -S server quit', 'screen -X -S proxy quit']
            }
        }

    });

    grunt.loadNpmTasks('grunt-jsdoc');
    grunt.loadNpmTasks('grunt-jslint');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-commands');
    grunt.loadNpmTasks('grunt-open');

    // open a proxy and server and open the app in your preferred browser
    grunt.registerTask('build', ['command:build']);
    grunt.registerTask('launch', ['command:proxy', 'command:server', 'open']);
    grunt.registerTask('kill', ['command:kill']);

    // this is as in-progress way to test with a local proxy and server so HTTP client can make requests.
    grunt.registerTask('test', ['command:proxy', 'command:test']);
};
