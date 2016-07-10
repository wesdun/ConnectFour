module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',
    plugins: ['karma-systemjs', 'karma-jasmine', 'karma-chrome-launcher'],

    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['systemjs', 'jasmine'],

    // list of files / patterns to load in the browser
    files: [
      'spec-js/*.js'
    ],

    // list of files to exclude
    exclude: [
    ],

    proxies: {
      '/base/': '/base/dist/app/',
      '/app/': '/base/dist/app/'
    },

    systemjs: {
      configFile: 'dist/systemjs.config.js',
      serveFiles: [
        'dist/**/*.js',
        'dist/**/*.html',
        'dist/**/*.json',
        'dist/**/*.css'
      ],
      includeFiles: [
        'dist/lib/reflect-metadata/Reflect.js',
        'dist/lib/zone.js/dist/zone.js',
        'dist/lib/lodash/lodash.js',
        'node_modules/zone.js/dist/fake-async-test.js'
      ],
      config: {
        transpiler: null,
        defaultJSExtensions: true,
        map:
        {
          'app':      'dist/app',
          'rxjs':     'dist/lib/rxjs',
          '@angular': 'dist/lib/@angular',
          'systemjs': 'dist/lib/systemjs/dist/system.js',
          'lodash': 'dist/lib/lodash'
        }
      }
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