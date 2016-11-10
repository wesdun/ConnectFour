module.exports = function(config) {
  var appBase = 'dist/app/';
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',
    plugins: ['karma-systemjs', 'karma-jasmine', 'karma-chrome-launcher'],

    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],

    // list of files / patterns to load in the browser
    files: [
      'dist/lib/systemjs/dist/system.js',
      'node_modules/core-js/client/shim.js',
      'dist/lib/reflect-metadata/Reflect.js',
      'dist/lib/zone.js/dist/zone.js',
      'node_modules/zone.js/dist/long-stack-trace-zone.js',
      'node_modules/zone.js/dist/proxy.js',
      'node_modules/zone.js/dist/sync-test.js',
      'node_modules/zone.js/dist/jasmine-patch.js',
      'dist/lib/lodash/lodash.js',
      'node_modules/zone.js/dist/fake-async-test.js',
      'node_modules/zone.js/dist/async-test.js',

      { pattern: 'dist/lib/**/*.js', included: false, watched: false },
      { pattern: 'dist/lib/**/*.js.map', included: false, watched: false },

      {pattern: 'dist/systemjs.config.js', included: false, watched: false},
      'karma-test-shim.js',

      {pattern: appBase + '**/*.js', included: false, watched: true},
      {pattern: 'dist/*.js', included: false, watched: true},

      {pattern: appBase + '**/*.html', included: false, watched: true},
      {pattern: appBase + '**/*.css', included: false, watched: true},
      {pattern: appBase + '**/*.json', included: false, watched: true},

      {pattern: 'src/**/*.ts', included: false, watched: true},
      {pattern: appBase + '**/*.js.map', included: false, watched: false},

      {pattern: 'spec-js/*.js', included: false, watched: true}
    ],

    // list of files to exclude
    exclude: [
    ],

    proxies: {
      '/app/': '/base/dist/app/'
    },


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
    },

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress'],

    // web server port
    port: 9876,

    // enable / disable colors in the output (reporters and logs)
    colors: true,

    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,

    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: false,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'],

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: true,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  })
}