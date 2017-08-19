const gulp = require('gulp');
const gutil = require('gulp-util');
const bower = require('bower');
const concat = require('gulp-concat');
const sass = require('gulp-sass');
const minifyCss = require('gulp-minify-css');
const rename = require('gulp-rename');
const sh = require('shelljs');
const assets = require('./assets.config');

const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const gulpLoadPlugins = require('gulp-load-plugins');
const ngAnnotate = require('gulp-ng-annotate');
const strip = require('gulp-strip-comments');
const stripDebug = require('gulp-strip-debug');
const purgeSourcemaps = require('gulp-purge-sourcemaps');
const $ = gulpLoadPlugins();


var paths = {
    sass: ['./scss/**/*.scss']
};

gulp.task('default', ['sass']);

gulp.task('sass', function(done) {
    gulp.src('./scss/ionic.app.scss')
        .pipe(sass())
        .on('error', sass.logError)
        .pipe(gulp.dest('./www/css/'))
        .pipe(minifyCss({
            keepSpecialComments: 0
        }))
        .pipe(rename({ extname: '.min.css' }))
        .pipe(gulp.dest('./www/css/'))
        .on('end', done);
});

gulp.task('watch', ['minJs', 'minCss'], function() {
    // gulp.watch(paths.sass, ['sass']);
    gulp.watch([...assets.css], ['minCss']);
    gulp.watch([...assets.js], ['minJs']);
});

gulp.task('install', ['git-check'], function() {
    return bower.commands.install()
        .on('log', function(data) {
            gutil.log('bower', gutil.colors.cyan(data.id), data.message);
        });
});

gulp.task('git-check', function(done) {
    if (!sh.which('git')) {
        console.log(
            '  ' + gutil.colors.red('Git is not installed.'),
            '\n  Git, the version control system, is required to download Ionic.',
            '\n  Download git here:', gutil.colors.cyan('http://git-scm.com/downloads') + '.',
            '\n  Once git is installed, run \'' + gutil.colors.cyan('gulp install') + '\' again.'
        );
        process.exit(1);
    }
    done();
});

gulp.task("minJs", function() {
    let argv = process.argv;
    if (argv.includes('--vendor')) {
        gulp.src([...assets.vendorJs])
            .pipe($.plumber({
                errorHandler: function(error) {
                    console.log(error.toString());
                    this.emit('end');
                }
            }))
            .pipe(ngAnnotate())
            .pipe(concat('script.vendor.min.js'))
            .pipe(gulp.dest(assets.minDir))
            .pipe(purgeSourcemaps())
            .pipe(stripDebug())
            .pipe(strip())
            .pipe(uglify())
            .pipe(gulp.dest(assets.minDir));
    }

    gulp.src([...assets.js])
        .pipe($.plumber({
            errorHandler: function(error) {
                console.log(error);
                this.emit('end');
            }
        }))
        .pipe(ngAnnotate())
        .pipe(concat('app.min.js'))
        .pipe(gulp.dest(assets.minDir))
        .pipe(babel({ presets: ['es2015'], compact: false }))
        .pipe(purgeSourcemaps())
        .pipe(uglify())
        .pipe(stripDebug())
        .pipe(gulp.dest(assets.minDir));
});

gulp.task("minCss", function() {
    gulp.src([...assets.css])
        .pipe(concat('app.min.css'))
        .pipe(gulp.dest(assets.minDir))
        .pipe(sass().on('error', sass.logError))
        // .pipe(cssPurge())
        .pipe(gulp.dest(assets.minDir))
        // .pipe(cssPurge())
        .pipe(minifyCss())
        .pipe(gulp.dest(assets.minDir));
});