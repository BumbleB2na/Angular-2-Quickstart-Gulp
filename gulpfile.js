//Angular 2 Quickstart seed did not have anything set up for building a distribution version. It did not use gulp.
//Loosely followed this tutorial to build a distribution version using gulp and gulp plugin packages: http://blog.scottlogic.com/2015/12/24/creating-an-angular-2-build.html

const gulp = require('gulp');
const del = require('del');
const typescript = require('gulp-typescript');
const sourcemaps = require('gulp-sourcemaps');
const rename = require('gulp-rename');
const tscConfig = require('./src/tsconfig.json');

// clean the contents of the distribution directory
gulp.task('clean', function () {
  return del('dist/**/*');
});

// copy dependencies (NOTE: {base: '.'} keep original folder structure so that index.html can still point to node_modules folder)
gulp.task('copy:node-modules', ['clean'], function() {
    return gulp.src([
        'node_modules/core-js/client/shim.min.js',
        'node_modules/core-js/client/shim.min.js.map',
        'node_modules/zone.js/dist/zone.js',
        'node_modules/zone.js/dist/zone.js.map',
        'node_modules/systemjs/dist/system.src.js',
        'node_modules/systemjs/dist/system.src.js.map',

        'node_modules/@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js',
        'node_modules/@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js.map',
        'node_modules/@angular/core/bundles/core.umd.js',
        'node_modules/@angular/core/bundles/core.umd.js.map',
        'node_modules/@angular/platform-browser/bundles/platform-browser.umd.js',
        'node_modules/@angular/platform-browser/bundles/platform-browser.umd.js.map',
        'node_modules/@angular/forms/bundles/forms.umd.js',
        'node_modules/@angular/forms/bundles/forms.umd.js.map',
        'node_modules/@angular/router/bundles/router.umd.js',
        'node_modules/@angular/router/bundles/router.umd.js.map',
        'node_modules/@angular/common/bundles/common.umd.js',
        'node_modules/@angular/common/bundles/common.umd.js.map',
        'node_modules/@angular/compiler/bundles/compiler.umd.js',
        'node_modules/@angular/compiler/bundles/compiler.umd.js.map',
        'node_modules/rxjs/**/*.js',
        'node_modules/rxjs/**/*.js.map'
    ], {base: '.'})
    .pipe(gulp.dest('dist'))
});

// copy static assets recursively (excluding Spec files and dist version of index.html) from src directory
gulp.task('copy:static-assets', ['copy:node-modules'], function() {
    return gulp
      .src(['src/**/*', '!src/**/*.spec.*', '!src/index.dist.html'], {base: './src'})
      .pipe(gulp.dest('dist'))
});

// copy alternate "dist" version of index.html (index.dist.html) from base src directory and rename it to index.html after copy
gulp.task('copy:index-dist-html', ['copy:static-assets'], function() {
    return gulp
      .src(['src/index.dist.html'])
      .pipe(rename('index.html'))
      .pipe(gulp.dest('dist'))
});

gulp.task('generate-dist', ['copy:index-dist-html']);
gulp.task('default', ['generate-dist']);