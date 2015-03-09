var gulp = require('gulp');
var webserver = require('gulp-webserver');
var concat = require('gulp-concat');
var coffee = require('gulp-coffee');
var uglify = require('gulp-uglify');
var sass = require('gulp-sass');
var gutil = require('gulp-util');
var jade = require('gulp-jade');
var watch = require('gulp-watch');
var gulpif = require('gulp-if');
var argv = require('yargs').argv;
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');
var templateCache = require('gulp-angular-templatecache');
var jsonminify = require('gulp-jsonminify');

var config = {
	"destination": "./build/",
	"destinationJs": "./build/js/",
	"destinationCss": "./build/css/",
	"destinationImg": "./build/img/",
	"destinationTemplates": "./build/js/",
    "destinationLang": "./build/i18n/"
};

gulp.task('libJs', function () {
    gulp.src([
        './app/assets/vendor/bower_components/jquery/dist/jquery.js',
        './app/assets/vendor/bower_components/modernizr/modernizr.js',
        './app/assets/vendor/bower_components/bootstrap-sass/assets/javascripts/bootstrap.js',
        './app/assets/vendor/bower_components/angular/angular.js',
        './app/assets/vendor/bower_components/angular-cookies/angular-cookies.js',
        './app/assets/vendor/bower_components/angular-resource/angular-resource.js',
        './app/assets/vendor/bower_components/angular-route/angular-route.js'
    ])
        .pipe(concat('lib.js'))
        .pipe(gulpif(argv.production, uglify().on('error', gutil.log)))
        .pipe(gulp.dest(config.destinationJs));
});

gulp.task('libSass', function () {
    gulp.src([
        './app/assets/styles/lib.sass'
    ])
        .pipe(gulpif(argv.production, sass({outputStyle: 'compressed'}), sass()).on('error', gutil.log))
        .pipe(gulp.dest(config.destinationCss));
});

gulp.task('sass', function () {
    gulp.src([
        './app/assets/styles/**/*.sass',
        '!./app/assets/styles/lib.sass'
    ])
        .pipe(gulpif(argv.production, sass({indentedSyntax: true, outputStyle: 'compressed'}), sass({indentedSyntax: true})).on('error', gutil.log))
        .pipe(gulp.dest(config.destinationCss));
});

gulp.task('coffee', function () {
    gulp.src([
        './app/assets/scripts/*.coffee',
        './app/assets/scripts/**/*.coffee'
        ])
        .pipe(coffee({bare: true}).on('error', gutil.log))
        .pipe(concat('app.js'))
        .pipe(gulpif(argv.production, uglify().on('error', gutil.log)))
        .pipe(gulp.dest(config.destinationJs))
});

gulp.task('templates', function () {
    var YOUR_LOCALS = {};

    // Compile index to html
    gulp.src([
        './app/index.jade'
    ])
        .pipe(jade({
            locals: YOUR_LOCALS,
            pretty: true
        }).on('error', gutil.log))
        .pipe(gulp.dest(config.destination)
    );

    // All the rest compiles to js
    gulp.src('./app/templates/**/*.jade')
        .pipe(jade({pretty: true}).on('error', gutil.log))
        .pipe(templateCache('templates.js', {standalone:true }))
        .pipe(gulp.dest(config.destinationTemplates));
});

gulp.task('translations', function () {
    gulp.src([
        './app/i18n/*.json',
    ])
        .pipe(jsonminify())
        .pipe(gulp.dest(config.destinationLang))
});

gulp.task('img', function () {
    gulp.src('./app/assets/img/**/*')
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        }))
        .pipe(gulp.dest(config.destinationImg))
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

    gulp.watch([
        './app/i18n/*.json'
    ], ['translations']);
	
	gulp.watch([
		'./app/assets/img/**/*'
	], ['img'])
});


gulp.task('server', function () {
    gulp.src('./build/')
        .pipe(webserver({
            fallback: 'index.html',
            livereload: true,
            open: true,
            port: 9000
        }));
});


gulp.task('launch', ['default','server', 'watch']);
gulp.task('default', ['libJs', 'libSass', 'sass', 'coffee', 'templates', 'translations', 'img']);
 