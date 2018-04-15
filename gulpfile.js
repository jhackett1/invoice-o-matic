const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const path = require('path');

// Compile ma sass for me and autoprefix it
gulp.task('sass', function(){
  return gulp.src('./public/sass/*.sass')
  .pipe(sass().on('error', sass.logError))
  // And autoprefix it too
  .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
  }))
  .pipe(gulp.dest('./public/'))
})

gulp.task('default', function(){
  // Watch & compile sass
  gulp.start('sass');
  gulp.watch('./public/sass/*.sass', ['sass']);
})
