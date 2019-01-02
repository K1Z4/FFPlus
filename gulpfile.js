"use strict";
const gulp = require('gulp');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const gutil = require('gulp-util');
const sourcemaps = require('gulp-sourcemaps');
const ejs = require('gulp-ejs');
const insert = require('gulp-insert');
const frontMatter = require('gulp-front-matter');
const fs = require('fs');

const onError = function(err) { 
    gutil.log(gutil.colors.red('[Error]'), err.toString());
}

const header = fs.readFileSync('src/includes/header.html');
const footer = fs.readFileSync('src/includes/footer.html');

const constants = {  
}

gulp.task('js', function() {
    return gulp.src('src/js/*.js')
        .pipe(sourcemaps.init())
        .pipe(babel()).on('error', onError)
        .pipe(uglify()).on('error', onError)
        .pipe(sourcemaps.write()).on('error', onError)
        .pipe(gulp.dest('dist/js'));
});

gulp.task('html', function() {
    gulp.src("src/html/**/*.html")
        .pipe(frontMatter({ 
            property: 'data', // property added to file object - ejs then reads this prop and merges it with the contants object
            remove: true // remove front-matter header 
        })).on('error', onError)
        .pipe(insert.prepend(header)).on('error', onError)
        .pipe(insert.append(footer)).on('error', onError)
        .pipe(ejs(constants)).on('error', onError)
        .pipe(gulp.dest("./dist"))
});

gulp.task('static', function () {
    return gulp.src('src/static/**/*')
    .pipe(gulp.dest('dist/'));
});

gulp.task('build', ["js", "static", "html"]);
