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
  gulpIf = require('gulp-if');

// Discovers all AMD dependencies, concatenates together all required .js files, minifies them
// gulp.task('js', function() {
//   return rjs(requireJsOptimizerConfig)
//     .pipe(uglify({
//       preserveComments: 'some'
//     }))
//     .pipe(gulp.dest('./dist/'));
// });

gulp.task('useref', function(){
  return gulp.src('app/*.html')
    .pipe(useref())
    .pipe(gulpIf('*.js', uglify()))
    .pipe(gulp.dest('dist'))
});

gulp.task('images', function() {
  return es.concat(gulp.src('app/images/*')
    .pipe(gulp.dest("dist/images")),
    gulp.src('app/favicon.png')
    .pipe(gulp.dest("dist"))
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
    .pipe(gulp.dest('./dist/fonts')),
    gulp.src('./node_modules/font-awesome/fonts/*')
    .pipe(gulp.dest('./dist/fonts')));
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


// // Copies index.html, replacing <script> and <link> tags to reference production URLs
// gulp.task('html', function() {
//   return gulp.src('app/index.html')
//     .pipe(htmlreplace({
//       'css': 'css.css',
//       'js': 'scripts.js'
//     }))
//     .pipe(gulp.dest('dist/'));
// });

// Removes all files from ./dist/
gulp.task('clean', function() {
  return gulp.src('dist/**/*', {
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
})

gulp.task('default', ['useref', 'sass', 'fonts'], function(callback) {
  callback();
  console.log('\nPlaced optimized files in ' + chalk.magenta('dist/\n'));
});
