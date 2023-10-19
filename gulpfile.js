var gulp = require('gulp');
var sass = require('gulp-sass');
var cssmin = require("gulp-cssmin");
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var concat = require("gulp-concat");

var paths = {
  scss :"./Assets/scss/toast.scss",
  css  : "./wwwroot/css/",
  minCss : "./wwwroot/css/min/",
  concatCssDest : "./wwwroot/css/toast.min.css",


  // js : "./Assets/js/**/*.js",
  // minJs : "./wwwroot/js/**/*.min.js",
  // concatJsDest : "./wwwroot/js/site.min.js",
  // concatCssDest : "./wwwroot/css/site.min.css",
};


gulp.task('sass', function(cb) {
  gulp
    .src(paths.scss)
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(paths.css))
    .pipe(cssmin())
    .pipe(gulp.dest(paths.minCss));
  cb();
});

// gulp.task('default',gulp.series('sass', function(cb) {
//     gulp.watch(paths.scss, gulp.series('sass'));
//     cb();
//   })
// );