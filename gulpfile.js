var gulp = require('gulp');
var browsersync = require('browser-sync');
var karma = require('karma').server;
var server = require('gulp-live-server');
var sass = require('gulp-sass');

gulp.task('styles', function() {
    gulp.src('app/sass/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('app/css/'));
});

gulp.task('server', function() {
	var live = new server('server.js');
	live.start();
});

gulp.task('serve', ['server', 'styles'], function() {
	
	browsersync.init({
		notify: false,
		port: 8080,
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