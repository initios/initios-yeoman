var gulp = require('gulp');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
var coffee = require('gulp-coffee');
var uglify = require('gulp-uglify');
var sass = require('gulp-sass');
var gutil = require('gulp-util');

var config = {
	"destination": "./build/",
	"destinationJs": "./build/js/",
	"destinationCss": "./build/css/"
};

gulp.task('libJs', function() {
	gulp.src([
		'./bower_components/jquery/dist/jquery.js',
		'./bower_components/modernizr/modernizr.js',
		'./bower_components/bootstrap-sass/assets/javascripts/bootstrap.js',
		'./bower_components/angular/angular.js'
	])
    .pipe(sourcemaps.init())
  	.pipe(uglify())
	.pipe(concat('lib.js'))
    .pipe(sourcemaps.write())
	.pipe(gulp.dest(config.destinationJs));
});

gulp.task('libSass', function() {
	gulp.src([
		'./app/assets/sass/lib.sass'
	])
	.pipe(sourcemaps.init())
	.pipe(sass())
  	.pipe(sourcemaps.write('./maps'))
  	.pipe(gulp.dest(config.destinationCss));
});

gulp.task('sass', function() {
	// Compile all sass files recursively except lib.sass (which has it's own task libSass)
	gulp.src([
		'./app/assets/sass/**/*.sass',
		'!./app/assets/sass/lib.sass'
	])
	.pipe(sourcemaps.init())
	.pipe(sass())
  	.pipe(sourcemaps.write('./maps'))
  	.pipe(gulp.dest(config.destinationCss));
});

gulp.task('coffee', function() {
	gulp.src([
		'./app/assets/coffee/**/*.coffee'
	])
    .pipe(sourcemaps.init())
	.pipe(concat('lib.js'))
    .pipe(sourcemaps.write())
	.pipe(gulp.dest(config.destinationJs));
});

gulp.task('coffee', function() {
  gulp.src('./app/assets/coffee/**/*.coffee')
    .pipe(coffee({bare: true})
	.pipe(sourcemaps.write())
	.on('error', gutil.log))
    .pipe(gulp.dest(config.destinationJs))
});

// TO DO
//gulp.task('production', ['libJs']);

gulp.task('default', ['libJs', 'libSass', 'sass', 'coffee']);
 