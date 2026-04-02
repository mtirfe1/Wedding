'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass')(require('sass'));
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');

// compile scss to css
gulp.task('sass', function () {
    return gulp.src('./sass/styles.scss')
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(rename({basename: 'styles.min'}))
        .pipe(gulp.dest('./css'));
});

// watch changes in scss files and run sass task
gulp.task('sass:watch', function () {
    gulp.watch('./sass/**/*.scss', gulp.series('sass'));
});

// minify js
gulp.task('minify-js', function () {
    return gulp.src('./js/scripts.js')
        .pipe(uglify())
        .pipe(rename({basename: 'scripts.min'}))
        .pipe(gulp.dest('./js'));
});

// watch changes in scripts.js and re-minify
gulp.task('scripts:watch', function () {
    gulp.watch('./js/scripts.js', gulp.series('minify-js'));
});

// dev watch: rebuild CSS + JS on changes
gulp.task('watch', function () {
    gulp.series('sass', 'minify-js')();
    gulp.watch('./sass/**/*.scss', gulp.series('sass'));
    gulp.watch('./js/scripts.js', gulp.series('minify-js'));
});

// default task
gulp.task('default', gulp.series('sass', 'minify-js'));