const gulp = require('gulp');
const fileInclude = require('gulp-file-include');
const sass = require('gulp-sass')(require('sass'));
const server = require('gulp-server-livereload');
const clean = require('gulp-clean');
const fs = require('fs');
const sourceMaps = require('gulp-sourcemaps');
const plumber = require('gulp-plumber');
const notify = require('gulp-notify');
const webpack = require('webpack-stream');
const babel = require('gulp-babel');
const svgSprite = require('gulp-svg-sprite');

gulp.task('clean', function (done) {
  if (fs.existsSync('./dist/')) {
    return gulp.src('./dist/', { read: false }).pipe(clean({ force: true }));
  }
  done();
});

const fileIncludeSettings = {
  prefix: '@@',
  basepath: '@file',
};

const plumberNotify = (title) => {
  return {
    errorHandler: notify.onError({
      title: title,
      message: 'Error <%= error.message %>',
      sound: false,
    }),
  };
};

gulp.task('html', function () {
  return gulp
    .src('./*.html')
    .pipe(plumber(plumberNotify('HTML')))
    .pipe(fileInclude(fileIncludeSettings))
    .pipe(gulp.dest('./dist/'));
});

gulp.task('sass', function () {
  return gulp
    .src('./src/styles/*.scss')
    .pipe(plumber(plumberNotify('SCSS')))
    .pipe(sourceMaps.init())
    .pipe(sass())
    .pipe(sourceMaps.write())
    .pipe(gulp.dest('./dist/css/'));
});

gulp.task('fonts', function () {
  return gulp.src('./src/assets/fonts/**/*').pipe(gulp.dest('./dist/fonts/'));
});

gulp.task('js', function () {
  return gulp
    .src('./src/js/*.js')
    .pipe(plumber(plumberNotify('JS')))
    .pipe(babel())
    .pipe(webpack(require('./webpack.config')))
    .pipe(gulp.dest('./dist/js/'));
});

gulp.task('svgSprite', function () {
  return gulp
    .src('./src/assets/sprite/*.svg')
    .pipe(
      svgSprite({
        mode: {
          stack: {
            sprite: '../sprite.svg',
          },
        },
      })
    )
    .pipe(gulp.dest('./dist/svg/'));
});

const serverOptions = {
  livereload: true,
  open: true,
};

gulp.task('server', function () {
  return gulp.src('./dist/').pipe(server(serverOptions));
});

// Watching
gulp.task('watch', function () {
  gulp.watch('./src/styles/**/*.scss', gulp.parallel('sass'));
  gulp.watch('./src/**/*.html', gulp.parallel('html'));
  gulp.watch('./src/assets/sprite/**/*', gulp.parallel('svgSprite'));
  gulp.watch('./src/assets/fonts/**/*', gulp.parallel('fonts'));
  gulp.watch('./src/js/**/*.js', gulp.parallel('js'));
});

gulp.task(
  'default',
  gulp.series(
    'clean',
    gulp.parallel('html', 'sass', 'svgSprite', 'fonts', 'js'),
    gulp.parallel('server', 'watch')
  )
);
