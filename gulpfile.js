const gulp = require('gulp'),
      browsersync = require('browser-sync'),
      sass = require('gulp-sass'),
      rename = require('gulp-rename'),
      autoprefixer = require('gulp-autoprefixer'),
      cleanCSS = require('gulp-clean-css');

// Static server
gulp.task('server', function() {
    browsersync.init({
        server: {
            baseDir: "src"
        }
    });
});

gulp.task('styles', function() {
    return gulp.src("src/assets/sass/*.+(sass|scss)")
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(rename({
            prefix: "",
            suffix: ".min"
        }))
        .pipe(autoprefixer({
            browsers: ['last 8 versions'],
            cascade: true
        }))
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest("src/assets/css"))
        .pipe(browsersync.stream());
});

gulp.task('watch', function() {
    gulp.watch("src/assets/sass/*.+(sass|scss)", gulp.parallel('styles'));
    gulp.watch("src/*.html").on('change', browsersync.reload);
});

gulp.task('default', gulp.parallel('watch', 'server', 'styles'));
