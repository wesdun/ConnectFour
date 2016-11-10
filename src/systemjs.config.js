(function(global) {

  // map tells the System loader where to look for things
  var map = {
    'app': 'app',
    'main': 'main.js',
    'rxjs': 'lib/rxjs',
    '@angular/core': 'lib/@angular/core/bundles/core.umd.js',
    '@angular/common': 'lib/@angular/common/bundles/common.umd.js',
    '@angular/compiler': 'lib/@angular/compiler/bundles/compiler.umd.js',
    '@angular/platform-browser': 'lib/@angular/platform-browser/bundles/platform-browser.umd.js',
    '@angular/platform-browser-dynamic': 'lib/@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js',
    '@angular/http': 'lib/@angular/http/bundles/http.umd.js',
    '@angular/forms': 'lib/@angular/forms/bundles/forms.umd.js',
    'lodash': 'lib/lodash/lodash.js'
  };

  var config = {
    map: map,
    defaultJSExtensions: true
  };

  // filterSystemConfig - index.html's chance to modify config before we register it.
  if (global.filterSystemConfig) { global.filterSystemConfig(config); }

  System.config(config);

})(this);