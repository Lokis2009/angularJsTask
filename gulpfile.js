var gulp = require('gulp'),
	sass = require('gulp-sass'),
	uglify = require('gulp-uglifyjs'),
	reload = require('browser-sync'),
	concat = require('gulp-concat');

gulp.task('sass', function(){ // Создаем таск Sass
	return gulp.src('app/sass/**/*.sass') // Берем источник
		.pipe(sass())
		.pipe(gulp.dest('app/css')) // Выгружаем результата в папку app/css
		.pipe(reload.reload({stream: true})) // Обновляем CSS на странице при изменении
});


gulp.task('browser-sync', function () {  // Создаем таск browser-sync

	reload({
		server: {
			baseDir: 'app'
		},
		notify: false
	})
});
	

gulp.task('watch', ['browser-sync'], function() {
	gulp.watch('app/sass/**/*.sass', ['sass']); // Наблюдение за sass файлами в папке sass
	gulp.watch('app/*.html', reload.reload); // Наблюдение за HTML файлами в корне проекта
	gulp.watch('app/templates/*.html', reload.reload);
	gulp.watch('app/js/**/*.js', reload.reload);   // Наблюдение за JS файлами в папке js
});

gulp.task('default', ['watch']);