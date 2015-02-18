var gulp = require('gulp');
var webserver   = require('gulp-webserver');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
var coffee = require('gulp-coffee');
var uglify = require('gulp-uglify');
var sass = require('gulp-sass');
var gutil = require('gulp-util');
var jade = require('gulp-jade');
var watch = require('gulp-watch');

var config = {
	"destination": "./build/",
	"destinationJs": "./build/js/",
	"destinationCss": "./build/css/",
	"destionationTemplates": "./build/templates/"
};

gulp.task('libJs', function() {
	gulp.src([
		'./app/assets/vendor/bower_components/jquery/dist/jquery.js',
		'./app/assets/vendor/bower_components/modernizr/modernizr.js',
		'./app/assets/vendor/bower_components/bootstrap-sass/assets/javascripts/bootstrap.js',
		'./app/assets/vendor/bower_components/angular/angular.js'
	])
    .pipe(sourcemaps.init())
  	.pipe(uglify())
	.pipe(concat('lib.js'))
    .pipe(sourcemaps.write())
	.pipe(gulp.dest(config.destinationJs));
});

gulp.task('libSass', function() {
	gulp.src([
		'./app/assets/styles/lib.sass'
	])
	.pipe(sourcemaps.init())
	.pipe(sass())
  	.pipe(sourcemaps.write('./maps'))
  	.pipe(gulp.dest(config.destinationCss));
});

gulp.task('sass', function() {
	gulp.src([
		'./app/assets/styles/**/*.sass',
		'!./app/assets/styles/lib.sass'
	])
	.pipe(sourcemaps.init())
	.pipe(sass())
  	.pipe(sourcemaps.write('./maps'))
  	.pipe(gulp.dest(config.destinationCss));
});

gulp.task('coffee', function() {
  gulp.src('./app/assets/scripts/**/*.coffee')
    .pipe(coffee({bare: true})
	.pipe(sourcemaps.write())
	.on('error', gutil.log))
    .pipe(gulp.dest(config.destinationJs))
});

 
gulp.task('templates', function() {
  var YOUR_LOCALS = {};
 
  // Compile index to html
  gulp.src([
  		'./app/index.jade'
  	])
	.pipe(jade({
	  locals: YOUR_LOCALS
	}))
    .pipe(gulp.dest(config.destination)
  );

  // All the rest compiles to js 
  gulp.src('./app/templates/**/*.jade')
  .pipe(jade({client: true}))
  .pipe(gulp.dest(config.destionationTemplates));
});


gulp.task('watch', function() {
	gulp.watch([
		'./app/assets/styles/**/*.sass',
		'!./app/assets/styles/lib.sass'
	], ['sass']);
	gulp.watch([
		'./app/assets/styles/lib.sass'
	], ['libSass']);
	gulp.watch([
		'./app/assets/scripts/**/*.coffee'
	], ['coffee']);
	gulp.watch([
		'./app/index.jade',
		'./app/templates/**/*.jade'
	], ['templates']);
});


gulp.task('server', function() {
	gulp.src('./build/')
		.pipe(webserver({
			fallback: 'index.html',
			livereload: true,
			open: true,
			port: 9000
		}));
});


gulp.task('launch', ['server', 'watch']);

gulp.task('default', ['libJs', 'libSass', 'sass', 'coffee', 'templates']);
 