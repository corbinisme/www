var gulp = require('gulp');
var concat = require('gulp-concat');
var refresh = require('gulp-livereload');
var lr = require('tiny-lr');
var server = lr();
var sass = require('gulp-sass');

gulp.task('run', function() {
  // Stuff here
  console.log("running")
});

gulp.task('lr-server', function() {
    server.listen(35729, function(err) {
        if(err) return console.log(err);
    });
})


gulp.task('hello', function() {
  console.log('Hello Zell');
});

gulp.task('scripts', function() {
    gulp.src(['assets/js/**/*.js'])
        //.pipe(browserify())
        .pipe(concat('assets/js/app.js'))
        .pipe(gulp.dest('dist'))
        .pipe(refresh(server))
});

gulp.task('sass', function() {
    gulp.src(['assets/css/**/*.scss'])
        //.pipe(browserify())
        .pipe(sass()) 
        .pipe(concat('theme.css'))
        .pipe(gulp.dest('assets/css'))
        .pipe(refresh(server))
});


gulp.task('styles', function() {
    gulp.src(['assets/css/**/*.css'])
        //.pipe(browserify())
        .pipe(concat('styles.css'))
        .pipe(gulp.dest('assets/css'))
        .pipe(refresh(server))
});

gulp.task('default', function() {
    //'lr-server', 
    gulp.run('hello', 'styles', 'sass');

    /*
    gulp.watch('app/js/**', function(event) {
        gulp.run('scripts');
    })
    */

    gulp.watch('app/css/**', function(event) {
        gulp.run('styles');
    })

})

/*
gulp.task('task-name', function () {
  return gulp.src('source-files') // Get source files with gulp.src
    .pipe(aGulpPlugin()) // Sends it through a gulp plugin
    .pipe(gulp.dest('destination')) // Outputs the file in the destination folder
});
*/