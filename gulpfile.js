/*
 * gulpfile for bu styles & scripts
 */
var _          = require('lodash');
var path       = require('path');
var console    = require('better-console');

var gulp       = require('gulp');
var connect    = require('gulp-connect');
var rm         = require('gulp-rm');
var preprocess = require('gulp-preprocess');
var minifycss  = require('gulp-minify-css');
var compass    = require('gulp-compass');
var jshint     = require('gulp-jshint');

function compass_scss(src, css, sass) {
  var sequence = gulp.src(src)
    .pipe(compass({
      css        : 'build/temp/css', /* temporary compilation output */
      sass       : sass,
      config_file: 'config/compass.rb'
    }))
    .on('error', function(error) {
      console.error(error);
      this.emit('end');
    });

  if (!_.isArray(css)) css = [ css ];
  _.forEach(css, function(dst) {
    sequence = sequence.pipe(gulp.dest(dst));
  });

  return sequence.pipe(connect.reload());
}

/* clean */
gulp.task('clean:debug', function() {
  return gulp.src('build/**/*', { read: false }).pipe(rm());
});

gulp.task('styles:debug', [ 'clean:debug' ], function() {
  return compass_scss(
    'src/styles/bu.scss',
    'build/static/css/bu.css',
    'src/styles'
  );
});
