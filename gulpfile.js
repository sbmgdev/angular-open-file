let gulp = require('gulp');
let babel = require('gulp-babel');
let uglify = require('gulp-uglify');
let rename = require('gulp-rename');

gulp.task('default',()=>{
	return gulp.src('angular-open-file.js')
		.pipe(babel())
		//.pipe(uglify())
		.pipe(rename('angular-open-file.min.js'))
		.pipe(gulp.dest('dist'))
})