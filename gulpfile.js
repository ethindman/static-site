'use strict';

var $	 	 		= require('gulp-load-plugins')();
var gulp 		= require('gulp');
var browser = require('browser-sync');
var rimraf  = require('rimraf');
var sequence = require('run-sequence');

var PORT = 3000;

gulp.task('clean', function(done) {
  rimraf('dist', done);
});

gulp.task('javascript', function() {
	gulp.src([
			'src/assets/js/studyBuddy.js',
			'src/assets/js/user.js'
		])
	.pipe($.sourcemaps.init())
	.pipe($.concat('app.js'))
	.pipe($.sourcemaps.write('./'))
	.pipe(gulp.dest('dist/assets/js'))
	.on('finish', browser.reload);
});

gulp.task('sass', function() {
	gulp.src('src/assets/scss/app.scss')
	.pipe($.sourcemaps.init())
	.pipe($.sass())
	.pipe($.sourcemaps.write('./'))
	.pipe(gulp.dest('dist/assets/css'))
	.pipe(browser.reload({ stream: true }));
});

gulp.task('build', function(done) {
  sequence('clean', ['sass', 'javascript'], done);
});

gulp.task('server', function() {
	browser.init({
    server: '', port: PORT
  });
});

gulp.task('default', ['build', 'server'], function() {
	gulp.watch(['src/assets/scss/**/{*.scss, *.sass}'], ['sass']);
  gulp.watch(['src/assets/js/**/*.js'], ['javascript']);
});