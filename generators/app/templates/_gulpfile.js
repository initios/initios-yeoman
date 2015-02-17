var gulp = require('gulp');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
var coffee = require('gulp-coffee');
var uglify = require('gulp-uglify');

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





gulp.task('production', ['libJs']);

gulp.task('default', ['libJs']);
 