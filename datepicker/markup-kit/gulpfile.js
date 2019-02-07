import browserSync from 'browser-sync';
const server = browserSync.create();

const autoprefixer = require('autoprefixer'),
  babel = require('gulp-babel'),
  concat = require('gulp-concat'),
  cssnano = require('cssnano'),
  gulp = require('gulp'),
  postcss = require('gulp-postcss'),
  sass = require('gulp-sass');

// Make a collection of paths used by the various
// build steps
const paths = {
  html: './*.html',
  scripts: 'js/**/*.js',
  styles: 'scss/**/*.scss',
  dist: 'dist/'
};

function styles(done) {
   gulp
    .src(paths.styles)
    .pipe(sass())
    .on('error', sass.logError)
    .pipe(postcss([autoprefixer({ cascade: false }), cssnano()]))
    .pipe(concat('style.css'))
    .pipe(gulp.dest(paths.dist + '/css'))
    .pipe(server.stream());
  done();
}

function scripts(done) {
  gulp
    .src(paths.scripts)
    .pipe(
      babel({
        presets: [['env', { modules: false }]]
      })
    )
    .pipe(gulp.dest(paths.dist + '/js'));
    server.reload();
  done();
}

function reload(done) {
  console.log('reload')
  server.reload();
  done();
}

function serve(done) {
  server.init({
    server: {
      baseDir: './'
    },
  });
  done();
}

function watch() {
  gulp.watch(paths.styles, styles);
  gulp.watch(paths.scripts, gulp.series(scripts, reload));
  gulp.watch(paths.html, gulp.series(reload));
}

const build = gulp.series(styles, scripts, reload);

exports.build = build;
exports.serve = serve;
exports.watch = watch;

exports.default = gulp.series(build, serve, watch);
