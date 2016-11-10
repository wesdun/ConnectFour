// /*global jasmine, __karma__, window*/
Error.stackTraceLimit = Infinity;
jasmine.DEFAULT_TIMEOUT_INTERVAL = 1000;

__karma__.loaded = function () {
};

function isJsFile(path) {
  return path.slice(-3) == '.js';
}

function isSpecFile(path) {
  return /\.spec\.js$/.test(path);
}

function isBuiltFile(path) {
  var builtPath = '/base/spec-js/';
  return isJsFile(path) && (path.substr(0, builtPath.length) == builtPath);
}

var allSpecFiles = Object.keys(window.__karma__.files)
    .filter(isSpecFile)
    .filter(isBuiltFile);

System.config({
  baseURL: '/base/dist',
  map: {
    '@angular/core/testing': 'lib/@angular/core/bundles/core-testing.umd.js',
    '@angular/common/testing': 'lib/@angular/common/bundles/common-testing.umd.js',
    '@angular/compiler/testing': 'lib/@angular/compiler/bundles/compiler-testing.umd.js',
    '@angular/platform-browser/testing': 'lib/@angular/platform-browser/bundles/platform-browser-testing.umd.js',
    '@angular/platform-browser-dynamic/testing': 'lib/@angular/platform-browser-dynamic/bundles/platform-browser-dynamic-testing.umd.js',
    '@angular/http/testing': 'lib/@angular/http/bundles/http-testing.umd.js',
    '@angular/router/testing': 'lib/@angular/router/bundles/router-testing.umd.js',
    '@angular/forms/testing': 'lib/@angular/forms/bundles/forms-testing.umd.js',
  }
});

System.import('systemjs.config.js')
    .then(function () {
      return Promise.all([
        System.import('@angular/core/testing'),
        System.import('@angular/platform-browser-dynamic/testing')
      ])
    })
    .then(function (providers) {
      var coreTesting = providers[0];
      var browserTesting = providers[1];

      coreTesting.TestBed.initTestEnvironment(
          browserTesting.BrowserDynamicTestingModule,
          browserTesting.platformBrowserDynamicTesting());
    })
    .then(function() {
      // Finally, load all spec files.
      // This will run the tests directly.
      return Promise.all(
          allSpecFiles.map(function (moduleName) {
            return System.import(moduleName);
          }));
    })
    .then(__karma__.start, __karma__.error);