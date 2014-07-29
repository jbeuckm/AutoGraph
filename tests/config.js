
if (process.env.TRAVIS) {

    exports.config = {
        sauceUser: process.env.SAUCE_USERNAME,
        sauceKey: process.env.SAUCE_ACCESS_KEY,
        capabilities: {
            'tunnel-identifier': process.env.TRAVIS_JOB_NUMBER,
            'build': process.env.TRAVIS_BUILD_NUMBER
        }
    };

} else {

    exports.config = {
        seleniumAddress: 'http://localhost:4444/wd/hub',
        specs: ['spec.js']
    };

}

