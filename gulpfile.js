// https://www.codefellows.org/blog/quick-intro-to-gulp.js
// https://www.package/gulp-ruby-sass

var gulp = require('gulp');
var gutil = require('gulp-util');
var sass = require('gulp-ruby-sass');
var sourcemaps = require('gulp-sourcemaps');

gulp.task('sass', function () {
  //return sass('/home/mgonzo/webapps/mgonzomatic/nodeapps/fuerzadlb/public/sass/style.scss')
  return sass('public/sass/style.scss')
    .on('error', function (err) { 
      console.error('Error', err.message);
    })
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./public/stylesheets'))
});

gulp.task('default', ['sass']);
