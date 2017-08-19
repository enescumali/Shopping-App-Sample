var gulp = require('gulp');
var sass = require('gulp-sass');

var scssSource = 'src/assets/css/scss';
var cssSource = 'src/assets/css';

gulp.task('styles', function() {
    gulp.src(scssSource +'/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest(cssSource));
});

gulp.task('watch', function () {
    gulp.watch(scssSource + '/**/*.scss',['styles']);
});

gulp.task('default', ['watch', 'styles']);