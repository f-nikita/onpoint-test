var gulp = require('gulp'),
	sass = require('gulp-sass'),
	browserSync = require('browser-sync');

gulp.task('sass', function() {
	return gulp.src('app/sass/**/*.sass')
		.pipe(sass())
		.pipe(gulp.dest('app/css'))
		.pipe(browserSync.reload({stream: true}))
});

gulp.task('scripts', function() {
	return gulp.src([
			'app/js/**/*'
		])
		.pipe(gulp.dest('app/js'));
});

gulp.task('browser-sync', function() {
	browserSync({
		server: {
			baseDir: 'app'
		},
		notify: false
	});
});

gulp.task('watch', ['browser-sync', 'sass', 'scripts'], function() {
	gulp.watch('app/sass/**/*.sass',['sass']);
	gulp.watch('app/*.html', browserSync.reload);
});

gulp.task('img', function() {
	return gulp.src('app/img/**/*')
		.pipe(gulp.dest('dist/img'));
});

gulp.task('build', ['img', 'sass', 'scripts'], function() {
	var buildCss = gulp.src([
			'app/css/main.css',
			'app/css/main.min.css'
		])
	.pipe(gulp.dest('dist/css'))

	var buildFonts = gulp.src('app/fonts/**/*')
	.pipe(gulp.dest('dist/fonts'))

	var buildJs = gulp.src('app/js/**/*')
	.pipe(gulp.dest('dist/js'))

	var buildHtml = gulp.src('app/*.html')
	.pipe(gulp.dest('dist'));

});

gulp.task('default', ['watch']);