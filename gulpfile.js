const gulp = require('gulp');
const gulpif = require('gulp-if');
const del = require('del');
const typescript = require('gulp-typescript');
const sourcemaps = require('gulp-sourcemaps');
const tscConfig = require('./tsconfig.json');
const tslint = require('gulp-tslint');
const browserSync = require('browser-sync');
const reload = browserSync.reload;
const Server = require('karma').Server;
const argv = require('yargs').argv;

// clean the contents of the distribution directory
gulp.task('clean', function () {
  if(argv.dev) {
    return del(['dist/**/*', 'spec-js/**/*', '!dist/lib/**']);
  }
  return del(['dist/**/*', 'spec-js/**/*']);
});

var isSpec = function(file) {
  return file.path.includes(".spec.");
};

var flattenSpecPath = function(file) {
  var fileName = file.path.substr(file.path.lastIndexOf("\\"));
  file.path = file.base.replace("/", "\\") + fileName;
  return 'spec-js';
};

gulp.task('compile', ['clean'], function () {
  var tsProject = typescript.createProject('tsconfig.json', {
    typescript: require('typescript')
  });
  return gulp
      .src(tscConfig.filesGlob)
      .pipe(sourcemaps.init())
      .pipe(typescript(tsProject))
      .pipe(sourcemaps.write('.'))
      .pipe(gulpif(isSpec, gulp.dest(flattenSpecPath), gulp.dest('dist')));
});

gulp.task('copy:libs', ['clean'], function() {
  return gulp.src([
    'node_modules/@angular/**/*.js',
    'node_modules/systemjs/dist/system.js',
    'node_modules/rxjs/**/*.js',
    'node_modules/zone.js/dist/zone.js',
    'node_modules/reflect-metadata/Reflect.js',
    'node_modules/lodash/**/*.*',
    'node_modules/core-js/client/shim.min.js'
  ], {base: './node_modules/'})
      .pipe(gulpif(!argv.dev, gulp.dest('./dist/lib')))
});

gulp.task('tslint', function() {
  return gulp.src('src/app/**/*.ts')
      .pipe(tslint({
        formatter: "verbose"
      }))
      .pipe(tslint.report());
});

gulp.task('copy:assets', ['clean'], function() {
  return gulp.src(['src/**/*', '!src/**/*.ts'], { base : './src' })
      .pipe(gulp.dest('dist'))
});

gulp.task('serve', ['build'], function() {
  browserSync({
    server: {
      baseDir: 'dist'
    }
  });

  gulp.watch(['src/**/*'], ['buildAndReload']);
});

gulp.task('test', ['build'], function (done) {
  new Server({
    configFile: __dirname + '/karma.conf.js',
    singleRun: true
  }, done).start();
});

gulp.task('build', ['tslint', 'compile', 'copy:libs', 'copy:assets']);
gulp.task('buildAndReload', ['build'], reload);
gulp.task('default', ['test']);