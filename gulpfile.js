// Node modules
var fs = require('fs'),
	vm = require('vm'),
	merge = require('deeply'),
	chalk = require('chalk'),
	es = require('event-stream'),
	browserSync = require('browser-sync').create();;

// Gulp and plugins
var gulp = require('gulp'),
	concat = require('gulp-concat'),
	clean = require('gulp-clean'),
	replace = require('gulp-replace'),
	uglify = require('gulp-uglify'),
	htmlreplace = require('gulp-html-replace'),
	sass = require('gulp-sass'),
	useref = require('gulp-useref'),
	gulpIf = require('gulp-if'),
	webserver = require('gulp-webserver'),
	nunjucksRender = require('gulp-nunjucks-render');

// Discovers all AMD dependencies, concatenates together all required .js files, minifies them
// gulp.task('js', function() {
//   return rjs(requireJsOptimizerConfig)
//     .pipe(uglify({
//       preserveComments: 'some'
//     }))
//     .pipe(gulp.dest('./dist/'));
// });

gulp.task('useref', function() {
	return gulp.src('app/*.html')
		.pipe(useref())
		// .pipe(gulpIf('*.js', uglify()))
		.pipe(gulp.dest('./'))
});

gulp.task('images', function() {
	return es.concat(gulp.src('app/images/*')
		.pipe(gulp.dest("./public/images")),
		gulp.src('app/favicon.png')
		.pipe(gulp.dest("./public/images"))
	);
});

// Transpiles sass -> css and minifies, rewrites relative paths to Bootstrap fonts, copies Bootstrap fonts
gulp.task('sass', function() {
	return gulp.src('app/scss/**/*.scss')
		.pipe(sass({
			compress: true
		}))
		.pipe(concat('styles.css'))
		.pipe(gulp.dest('app/css'))
		.pipe(browserSync.reload({
			stream: true
		}));
});

// Moves the bootstrap fonts to the dist-folder
gulp.task('fonts', function() {
	return es.concat(gulp.src('./node_modules/bootstrap/fonts/*', {
			base: './node_modules/bootstrap/components-bootstrap/'
		})
		.pipe(gulp.dest('./public/fonts')),
		gulp.src('./node_modules/font-awesome/fonts/*')
		.pipe(gulp.dest('./public/fonts')));
});

gulp.task('devsass', function() {
	return gulp.src('app/scss/**/*.scss')
		.pipe(sass())
		.pipe(concat('styles.css'))
		.pipe(gulp.dest('app/css'));
});

gulp.task('watch', function() {
	gulp.watch('app/scss/**/*.scss', ['devsass']);
});


gulp.task('custom-fonts', function () {
	return gulp.src('app/fonts/**/*.+(woff|woff2)')
		.pipe(gulp.dest('public/fonts'));

});


// // Copies index.html, replacing <script> and <link> tags to reference production URLs
// gulp.task('html', function() {
//   return gulp.src('app/index.html')
//     .pipe(htmlreplace({
//       'css': 'css.css',
//       'js': 'scripts.js'
//     }))
//     .pipe(gulp.dest('dist/'));
// });

// Removes all files from ./public/
gulp.task('clean', function() {
	return gulp.src('public/**/*', {
			read: false
		})
		.pipe(clean());
});

gulp.task('browserSync', function() {
	browserSync.init({
		server: {
			baseDir: 'app'
		},
	})
});

gulp.task('nunjucks', function() {
	// Gets .html and .nunjucks files in pages
	return gulp.src('app/pages/**/*.+(html|nunjucks)')
		// Renders template with nunjucks
		.pipe(nunjucksRender({
			path: ['app/templates']
		}))
		// output files in app folder
		.pipe(gulp.dest('app'))
});

gulp.task('webserver', function() {
	gulp.src('.')
		.pipe(webserver({
			directoryListing: false,
			open: true
		}));
});

gulp.task('server', ['default', 'webserver']);
gulp.task('serve', ['default', 'webserver']);



gulp.task('default', ['sass','custom-fonts', 'fonts', 'images'], function(callback) {
	gulp.start('nunjucks');
	gulp.start('useref');
	callback();
});


gulp.task('build', ['default'], function() {
	console.log('Now run :   gulp serve');
});
