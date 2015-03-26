/*
 * gulpfile for bu styles & scripts
 */
var _          = require('lodash');
var path       = require('path');
var console    = require('better-console');

var gulp       = require('gulp');
var connect    = require('gulp-connect');
var rm         = require('gulp-rm');
var concat     = require('gulp-concat');
var preprocess = require('gulp-preprocess');
var minifycss  = require('gulp-minify-css');
var compass    = require('gulp-compass');
var jshint     = require('gulp-jshint');
var uglify     = require('gulp-uglify');

function compass_scss(src, css, sass) {
  return gulp.src(src)
    .pipe(compass({
      css        : 'build/temp', /* temporary compilation output */
      sass       : sass,
      config_file: 'config/compass.rb'
    }))
    .on('error', function(error) {
      console.error(error);
      this.emit('end');
    })
    .pipe(gulp.dest(css))
    .pipe(connect.reload());
}

function minify_css(src, dst, name, plate) {
  var sequence = gulp.src(src)
    .pipe(concat(name))
    .pipe(minifycss());

  if (plate) {
    sequence = sequence.pipe(header(plate));
  }
  return sequence.pipe(gulp.dest(dst));
}

function compile_js(src, dst, name, context, plate) {
  var sequence = gulp.src(src)
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter('default'))
    .pipe(preprocess({ context: context }))
    .pipe(concat(name))
    .pipe(uglify());

  if (plate) {
    sequence = sequence.pipe(header(plate));
  }
  return sequence.pipe(gulp.dest(dst)).pipe(connect.reload());
}

function compile_html(src, dst, context) {
  return gulp.src(src)
    .pipe(preprocess({ context: context }))
    .pipe(gulp.dest(dst))
    .pipe(connect.reload());
}

/* clean */
gulp.task('clean:debug', function() {
  return gulp.src('build/**/*', { read: false }).pipe(rm());
});
gulp.task('clean:release', [ 'clean:debug' ], function() {
  return gulp.src('release/**/*', { read: false }).pipe(rm());
});

/* styles */
gulp.task('styles:debug', function() {
  return compass_scss(
    'src/styles/bu.scss',
    'build/static/css',
    'src/styles'
  );
});

gulp.task('styles:release', [ 'styles:debug' ], function() {
  return minify_css(
    'build/static/css/bu.css',
    'release',
    'bu.min.css'
  );
});

/* scripts */
gulp.task('scripts:debug', function() {
  return compile_js('src/scripts/*.js', 'build/static/scripts', 'bu.min.js', {
    build: 'debug'
  });
});

gulp.task('scripts:release', function() {
  return compile_js('src/scripts/**/*.js', 'release', 'bu.min.js', {
    build: 'release'
  });
});

/* html */
gulp.task('html:debug', function() {
  return compile_html('src/index.html', 'build', {
    build: 'debug'
  });
});

gulp.task('html:release', function() {
  return compile_html('src/index.html', 'build', {
    build: 'release'
  });
});

/* server */
gulp.task('server', function() {
  connect.server({
    port      : 8800,
    root      : ['build', '.'],
    fallback  : 'build/index.html',
    livereload: true
  });
});

/* watch */
gulp.task('watch', function() {
  gulp.watch('src/styles/**/*.scss', [ 'styles:debug' ]);
  gulp.watch('src/scripts/*.js', [ 'scripts:debug' ]);
  gulp.watch('src/**/*.html', [ 'html:debug' ]);
});

/* develop */
gulp.task('develop', [
  'clean:release', 'styles:debug', 'scripts:debug', 'html:debug', 'watch', 'server'
]);
