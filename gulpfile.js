const gulp = require('gulp');
const imageResize = require('gulp-image-resize');
const spritesmith = require('gulp.spritesmith');
const rimraf = require('rimraf');
const merge = require('merge-stream');
const path = require('path');
const buffer = require('vinyl-buffer');
const sass = require('gulp-ruby-sass');
const glumber = require('gulp-plumber');
const postcss = require('gulp-postcss');
const prefixer = require('gulp-autoprefixer');
const autoprefixer = require('autoprefixer');
const postcssScss = require('postcss-scss');
const precss = require('precss');
const imagemin = require('gulp-imagemin');
const livereload = require('gulp-livereload');

gulp.task('default', ['sprite', 'main-scss', 'main-css', 'watch']);
gulp.task('watch', () => {
  livereload.listen();
  gulp.watch('./src/images/editor_icon/**/*.png', ['sprite']);
  gulp.watch('./src/**/*.scss', ['main-scss']);
  gulp.watch('./src/**/*.css', ['main-css']);
  // gulp.watch('./src/AAA/**/*', ['imagemin']);
});
// gulp.task('imagemin', () => (
//   gulp.src('./src/AAA/**/*')
//     .pipe(imagemin())
//     .pipe(glumber())
//     .pipe(gulp.dest('./src/styles/images/'))
//     .pipe(livereload())
// ));

gulp.task('main-scss', () => (
  gulp.src('./src/base1.scss')
    .pipe(postcss([
      precss(),
      autoprefixer({ browsers: ['last 2 version'] }),
    ], {
      syntax: postcssScss,
    }))
    .pipe(glumber())
    .pipe(gulp.dest('./src/styles/'))
    .pipe(livereload())
));
gulp.task('main-css', () => (
  gulp.src('./src/AAA.css')
    .pipe(postcss([
      precss(),
      autoprefixer({ browsers: ['last 2 version'] }),
    ], {
      syntax: postcssScss,
    }))
    .pipe(glumber())
    .pipe(gulp.dest('./dist/css/'))
    .pipe(livereload())
));

// gulp.task('sass', () => {
//   sass('./src/**/*.scss', {
//     style: 'compressed',
//   })
//   .pipe(glumber())
//   .pipe(prefixer('last 2 versions'))
//   .pipe(gulp.dest('./src/styles/'));
// });


gulp.task('sprite', () => {
  // Generate our spritesheet
  const spriteData = gulp.src('./src/images/editor_icon/**/*.png').pipe(spritesmith({
    imgName: 'sprite.png',
    cssName: 'sprite.css',
    algorithm: 'binary-tree',
    cssVarMap: (Sprite) => {
      const sprite = Sprite;
      let parentPath = '';
      let actionPos = 0;
      const paths = sprite.source_image.split(path.sep);
      for (let i = 1, startPos = 0; i < paths.length - 1; i += 1) {
        if (paths[i - 1] === 'src' && paths[i] === 'tmp') {
          startPos = i;
        } else if (startPos > 0) {
          if (paths[i] !== 'hover' && paths[i] !== 'active') {
            parentPath += paths[i];
            if (i < paths.length) parentPath += '-';
          }
        }
      }
      actionPos = paths.length - 2;
      if (actionPos > 0 && (paths[actionPos] === 'hover' || paths[actionPos] === 'active')) {
        sprite.name = `editor-${parentPath}${sprite.name}:${paths[actionPos]}`;
      } else {
        sprite.name = `editor-${parentPath}${sprite.name}`;
      }
    },
    imgPath: '../images/editor_icon.png',
  }));

  // Pipe image stream through image optimizer and onto disk
  const imgStream = spriteData.img
    // DEV: We must buffer our stream into a Buffer for `imagemin`
    .pipe(buffer())
    .pipe(imagemin())
    .pipe(gulp.dest('./dist/images/'));

  // Pipe CSS stream through CSS optimizer and onto disk
  const cssStream = spriteData.css
    .pipe(gulp.dest('./dist/css'));

  // Return a merged stream to handle both `end` events
  return merge(imgStream, cssStream);
});
