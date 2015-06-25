// Include gulp
var gulp = require('gulp');

// Include Our Plugins
var less = require('gulp-less');
var watch = require('gulp-watch');

// Compile Our less
gulp.task('less', function() {
    return gulp.src('../src/less/placeview.less')
        .pipe(less())
        .pipe(gulp.dest('../web/css'));
});
//Compile Less of the player
gulp.task('player_less',function() {
	return gulp.src('../src/less/player/player.less')
		.pipe(less())
		.pipe(gulp.dest('../web/css/player'));
})
// Compile Our Bootstrap
gulp.task('boots', function() {
    return gulp.src('../src/less/styles.less')
        .pipe(less())
        .pipe(gulp.dest('../web/css'));
});

// Watch Files For Changes
gulp.task('watch', function() {
    gulp.watch('../src/less/placeview_var.less', ['less']);
    gulp.watch('../src/less/placeview.less', ['less']);
    gulp.watch('../src/less/styles.less', ['boots']);
    gulp.watch('../src/less/player/player.less',['player_less'])
});

// Default Task
gulp.task('default', ['less', 'boots', 'watch']);