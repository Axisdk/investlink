const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass')(require('sass'));
const rename = require('gulp-rename');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const imagemin = require('gulp-imagemin');

gulp.task('server', function() {
    browserSync.init({
        server: {
            baseDir: "dist"
        }
    });
});

gulp.task('styles', function(){
    return gulp.src("src/sass/**/*.+(sass|scss)")
            .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
            .pipe(rename({
                prefix: "",
                suffix: ".min",
              }))
            .pipe(autoprefixer())
            .pipe(cleanCSS({compatibility: 'ie8'}))
            .pipe(gulp.dest("dist/css"))
            .pipe(browserSync.stream());
});

gulp.task('watchSass', function(){
    gulp.watch('src/sass/**/*.+(sass|scss|css)', gulp.series("styles"));
});

gulp.task('watchJS', function() {
    gulp.watch('src/js/*.js').on('change', browserSync.reload);
});

gulp.task('watchHTML', function() {
    gulp.watch('src/*.html').on('change', browserSync.reload);
});

gulp.task('migrateDist', function(){
    return gulp.src(['src/**/*', '!src/sass/**/*', '!src/img/**/*'])  
        .pipe(gulp.dest('dist'));
});

// gulp.task('compressImages', function() {
//     return gulp.src('src/img/**/*')
//         .pipe(imagemin([
//             pngquant({ quality: [0.6, 0.8] }),
//             imagemin.gifsicle({ interlaced: true }),
//             imagemin.mozjpeg({ quality: 75, progressive: true }),
//             imagemin.optipng({ optimizationLevel: 5 }),
//             imagemin.svgo({ plugins: [{ removeViewBox: true }] })
//         ]))
//         .pipe(gulp.dest('dist/img'));
// });

gulp.task('default', gulp.parallel('watchSass', 'watchJS', 'server', 'styles'));
