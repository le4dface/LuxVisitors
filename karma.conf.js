// Karma configuration

var webpackConfig = require('./webpack.make.js');

module.exports = (config) => {
    config.set({

        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: '',

        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: ['jasmine'],

        // list of files / patterns to load in the browser
        files: [
            'node_modules/angular/angular.js',
            'node_modules/angular-mocks/angular-mocks.js',
            // Grab all files in tests/ that contain .spec
            'tests.webpack.js'
        ],

        // list of filesnpm i to exclude
        exclude: [
        ],

        // preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: {
            'src/scripts/*.js': ['coverage'],
            'src/i18n/**/*.json': 'ng-json2js',
            'src/config/**/*.json': 'ng-json2js',
            // Reference: http://webpack.github.io/docs/testing.html
            // Reference: https://github.com/webpack/karma-webpack
            // Convert files with webpack and load sourcemaps
            'tests.webpack.js': ['webpack', 'sourcemap']
        },


        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: ['spec', 'progress', 'coverage'],

        // Configure code coverage reporter
        coverageReporter: {
            // Set coverage threshold colors
            // The first number is the threshold between Red and Yellow.
            // The second number is the threshold between Yellow and Green.
            watermarks: {
                statements: [ 75, 90 ],
                functions: [ 75, 90 ],
                branches: [ 75, 90 ],
                lines: [ 75, 90 ]
            },
            dir: 'coverage/',
            reporters: [
                {type: 'text-summary'},
                {type: 'html'}
            ]
        },

        webpack: webpackConfig({
            BUILD: false,
            TEST: true
        }),

        webpackMiddleware: {
            // webpack-dev-middleware configuration
            // Displays only warnings and errors
            noInfo: true,
        },

        ngJson2JsPreprocessor: {
            stripPrefix: 'src/i18n/',
            prependPrefix: 'language/'
        },

        // web server port
        port: 9876,

        // enable / disable colors in the output (reporters and logs)
        colors: true,

        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_ERROR,

        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: false,

        // start these browsers
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        browsers: ['PhantomJS'],
        browserDisconnectTimeout : 10000,
        browserDisconnectTolerance : 1,
        browserNoActivityTimeout : 60000,

        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: true,

        // Concurrency level
        // how many browser should be started simultaneous
        concurrency: Infinity,

        webpackMiddleware: {
            // webpack-dev-middleware configuration
            // silence webpack
            noInfo: true,
            stats: {
                colors: true,
                hash: false,
                version: false,
                timings: false,
                assets: false,
                chunks: false,
                modules: false,
                reasons: false,
                children: false,
                source: false,
                errors: true,
                errorDetails: false,
                warnings: false,
                publicPath: false
            }
        },

        captureTimeout: 60000,

        client: {
            captureConsole: true
        }

    })
};
