const gulp = require('gulp'),
  sass = require('gulp-sass'),
  postcss = require('gulp-postcss'),
  autoprefixer = require('autoprefixer'),
  cssnano = require('cssnano')

gulp.task('styles', function () {
  return gulp.src('scss/style.scss')
  .pipe(sass()).on('error', sass.logError)
  .pipe(postcss([
    autoprefixer({
      browsers: ['last 2 version', 'safari > 6', 'ie 11', 'opera 12.1', 'ios 6', 'android > 3','Firefox > 47'],
      cascade: false
    }),
    cssnano()
  ]))

  .pipe(gulp.dest('./css'))
});


const babel = require('gulp-babel');
gulp.task('babel', () =>
  gulp.src('js/*.js')
  .pipe(babel({
    presets: ['es2015']
  }))
  .pipe(gulp.dest('js/dist'))
);


gulp.task('watch', ()=> {
  gulp.watch('js/*.js', ['babel']);
  gulp.watch('scss/**/*.scss', ['styles']);
});
