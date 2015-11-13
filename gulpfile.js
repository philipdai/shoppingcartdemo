var gulp = require('gulp');
var browsersync = require('browser-sync');
var karma = require('karma').server;
var server = require('gulp-live-server');
var sass = require('gulp-sass');

var debug = require('gulp-debug'),
    inject = require('gulp-inject'),
    tsc = require('gulp-typescript'),
    tslint = require('gulp-tslint'),
    sourcemaps = require('gulp-sourcemaps'),
    del = require('del'),
    Config = require('./gulpfile.config'),
    tsProject = tsc.createProject('tsconfig.json'),
    superstatic = require( 'superstatic' );

var config = new Config();

/**
 * Lint all custom TypeScript files.
 */
gulp.task('ts-lint', function () {
	return gulp.src(config.allTypeScript).pipe(tslint()).pipe(tslint.report('prose'));
});

/**
 * Compile TypeScript and include references to library and app .d.ts files.
 */
gulp.task('compile-ts', function () {
	var sourceTsFiles = [config.allTypeScript,                //path to typescript files
											 config.libraryTypeScriptDefinitions]; //reference to library .d.ts files


	var tsResult = gulp.src(sourceTsFiles)
									 .pipe(sourcemaps.init())
									 .pipe(tsc(tsProject));

	tsResult.dts.pipe(gulp.dest(config.tsOutputPath));
	return tsResult.js
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest(config.tsOutputPath));
});

/**
 * Remove all generated JavaScript files from TypeScript compilation.
 */
gulp.task('clean-ts', function (cb) {
  var typeScriptGenFiles = [
		config.tsOutputPath +'/**/*.js',    // path to all JS files auto gen'd by editor
		config.tsOutputPath +'/**/*.js.map', // path to all sourcemap files auto gen'd by editor
		'!' + config.tsOutputPath + '/lib'
	];

  // delete the files
  del(typeScriptGenFiles, cb);
});

gulp.task('watch', function() {
    gulp.watch([config.allTypeScript], ['ts-lint', 'compile-ts']);
});

gulp.task('styles', function() {
    gulp.src('app/sass/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('app/css/'));
});

gulp.task('server', function() {
	var live = new server('server.js');
	live.start();
});

gulp.task('serve', ['server', 'styles', 'compile-ts', 'watch', 'compile-ts'], function() {
	process.stdout.write('Starting browserSync and superstatic...\n');
	
	browsersync.init({
		notify: true,
		port: 8080,
		files: ['index.html', '**/*.js'],
    injectChanges: true,
    logFileChanges: false,
    logLevel: 'silent',
    logPrefix: 'angularin20typescript',

    reloadDelay: 0,
		server: {
			baseDir: ['app'],
			routes: {
				'/bower_components': 'bower_components',
				'/node_modules': 'node_modules'
			}
		}
	});
	
	gulp.watch(['app/**/*.*']).on('change', browsersync.reload);
	gulp.watch('app/sass/**/*.scss',['styles']);
	
});

gulp.task('test-browser', function() {
	karma.start({
		configFile: __dirname + '/karma.conf.js',
		singleRun: true,
		reporters: ['mocha']
	});
});

gulp.task('serve-test', function() {
	browsersync.init({
		notify: false,
		port: 8081,
		server: {
			baseDir: ['test', 'app'],
			routes: {
				'/bower_components': 'bower_components'
			}
		}
	});
	
	gulp.watch(['app/**/*.*'])
	.on('change', browsersync.reload);
});