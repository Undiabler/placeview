// Include gulp
var gulp = require('gulp'); 

// Include Our Plugins
//var jshint = require('gulp-jshint');
var less = require('gulp-less');
//var concat = require('gulp-concat');
//var uglify = require('gulp-uglify');
//var rename = require('gulp-rename');

var FolderCss = "../assets/css";

// Compile Our bootstrap less
gulp.task('bootstrap', function() {
    return gulp.src('../src/less/bootstrap/bootstrap.less')
        .pipe(less())
        .pipe(gulp.dest(FolderCss));
});

// Compile Our bootstrap less
gulp.task('less', function() {
    return gulp.src('../src/less/placeview.less')
        .pipe(less())
        .pipe(gulp.dest(FolderCss));
});


// Watch Files For Changes
gulp.task('watch', function() {
    gulp.watch('../src/less/placeview.less', ['less']);
});

// Default Task
gulp.task('default', ['less', 'bootstrap-less', 'watch']);