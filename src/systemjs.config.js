(function(global) {

  // map tells the System loader where to look for things
  var map = {
    'main': 'main.js',
    'rxjs': 'lib/rxjs',
    '@angular': 'lib/@angular',
    'lodash': 'lib/lodash'
  };

  var packages = {};

  var packageNames = [
    '@angular/common',
    '@angular/compiler',
    '@angular/core',
    '@angular/http',
    '@angular/platform-browser',
    '@angular/platform-browser-dynamic',
    'lodash',
    'rxjs',
    'app',
    'app/shared'
  ];

  // add package entries for angular packages in the form '@angular/common': { main: 'index.js', defaultExtension: 'js' }
  packageNames.forEach(function(pkgName) {
    packages[pkgName] = { main: 'index.js', defaultExtension: 'js' };
  });

  var config = {
    map: map,
    packages: packages
  };

  // filterSystemConfig - index.html's chance to modify config before we register it.
  if (global.filterSystemConfig) { global.filterSystemConfig(config); }

  System.config(config);

})(this);