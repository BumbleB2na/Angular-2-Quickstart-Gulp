//Used Angular 2 Quickstart seed and started working on Tour of Heroes tutorial project. It did not have anything set up for building a distribution version. It did not use gulp.
//Then, followed this tutorial to build a distribution version using gulp and gulp plugin packages: http://blog.scottlogic.com/2015/12/24/creating-an-angular-2-build.html

const gulp = require('gulp');
const del = require('del');
const typescript = require('gulp-typescript');
const sourcemaps = require('gulp-sourcemaps');
const tscConfig = require('./src/tsconfig.json');

// clean the contents of the distribution directory
gulp.task('clean', function () {
  return del('dist/**/*');
});

// copy dependencies (NOTE: {base: '.'} keep original folder structure so that index.html can still point to node_modules folder)
gulp.task('copy:libs', ['clean'], function() {
    return gulp.src([
        'node_modules/core-js/client/shim.min.js',
        'node_modules/zone.js/dist/zone.js',
        'node_modules/systemjs/dist/system.src.js',

        'node_modules/@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js',
        'node_modules/@angular/core/bundles/core.umd.js',
        'node_modules/@angular/platform-browser/bundles/platform-browser.umd.js',
        'node_modules/@angular/forms/bundles/forms.umd.js',
        'node_modules/@angular/router/bundles/router.umd.js',
        'node_modules/@angular/common/bundles/common.umd.js',
        'node_modules/@angular/compiler/bundles/compiler.umd.js',
        'node_modules/rxjs/**/*.js'
    ], {base: '.'})
    .pipe(gulp.dest('dist'))
});

// NOTE: This TypeScript compile step is trivial since we already do it in dev builds using: npm run build
// TypeScript compile
// gulp.task('compile', ['clean'], function () {
//   return gulp
//     .src('src/app/**/*.ts')
//     .pipe(typescript(tscConfig.compilerOptions))
//     .pipe(gulp.dest('dist/app'));
// });
// TypeScript compile with sourcemaps (gulp-sourcemaps)
gulp.task('compile', ['copy:libs'], function () {
    return gulp
      .src('src/app/**/*.ts')
      .pipe(sourcemaps.init())
      .pipe(typescript(tscConfig.compilerOptions))
      .pipe(sourcemaps.write('.'))
      .pipe(gulp.dest('dist/app'));
});


// copy static assets (non-TypeScript and non-spec files) from base src/app directory
gulp.task('copy:assets', ['compile'], function() {
    return gulp
      .src(['src/app/**/*', '!src/app/**/*.ts', '!src/app/**/*.spec.*'])
      .pipe(gulp.dest('dist/app'))
});
// copy static assets (non-TypeScript files) from base src directory
gulp.task('copy:assets2', ['copy:assets'], function() {
    return gulp
      .src(['src/index.html', 'src/favicon.ico', 'src/styles.css', 'src/main.js', 'src/main.js.map', 'src/systemjs*.js', 'src/tsconfig.json'])
      .pipe(gulp.dest('dist'))
});

gulp.task('build', ['copy:assets2']);
gulp.task('default', ['build']);