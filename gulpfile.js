// https://www.codefellows.org/blog/quick-intro-to-gulp.js
// https://www.package/gulp-ruby-sass

var gulp = require('gulp');
var gutil = require('gulp-util');
var sass = require('gulp-ruby-sass');
var sourcemaps = require('gulp-sourcemaps');
//var react = require('gulp-react');


var path = {
  admin: ['public/javascripts/admin.js'],
  admin_dest: 'public/javascripts/build/'
};

gulp.task('sass', function () {
  //return sass('/home/mgonzo/webapps/mgonzomatic/nodeapps/fuerzadlb/public/sass/style.scss')
  return sass('public/sass/style.scss')
    .on('error', function (err) {
      console.error('Error', err.message);
    })
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./public/stylesheets'))
});

gulp.task('admin-sass', function () {
  //return sass('/home/mgonzo/webapps/mgonzomatic/nodeapps/fuerzadlb/public/sass/style.scss')
  return sass('public/sass/admin.scss')
    .on('error', function (err) {
      console.error('Error', err.message);
    })
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./public/stylesheets'))
});

/*
gulp.task('transform', function () {
  gulp.src(path.admin)
    .pipe(react())
    .pipe(gulp.dest(path.admin_dest));
});
*/

gulp.task('default', ['sass', 'admin-sass', 'transform']);
