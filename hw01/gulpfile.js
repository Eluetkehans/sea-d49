'use strict';

var gulp = require('gulp');
var jshint = require('gulp-jshint');
var gulpMocha = require('gulp-mocha');
var trackedFiles = ['greet_holder.js', 'greet.js', 'gulpfile.js',
                    'test/**/*test.js'];
var watcher = gulp.watch(trackedFiles, ['jshint', 'test']);

gulp.task('jshint', function() {
  return gulp.src(trackedFiles)
   .pipe(jshint())
   .pipe(jshint.reporter('default')); 
});

gulp.task('test', function() {
  return gulp.src('test/**/*test.js')
    .pipe(gulpMocha());
});

watcher.on('change', function(){
  gulp.task('default', ['jshint', 'test']);
});
gulp.task('default', ['jshint', 'test']);