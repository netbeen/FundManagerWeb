const gulp = require('gulp');
const del = require('del');
const vinylPaths = require('vinyl-paths');
const Q = require('q');
const runSequence = require('run-sequence');
const bower = require('gulp-bower');
const mainFiles = require('main-bower-files');
const stylus = require('gulp-stylus');
const connect = require('gulp-connect');
const staticFiles = require('./config/staticFiles');

const paths = {
  stylus: "static-assets/src/styl/*.styl",
  js: 'static-assets/src/js/**/*',
  images: 'static-assets/src/images/**/*',
  css: 'static-assets/src/css/**/*',
};

const distPaths = {
  js: staticFiles.js,
  css: staticFiles.css,
  js_root: 'static-assets/build/js',
  css_root: 'static-assets/build/css',
  css_log_file: 'static-assets/build/css/log.css',
  css_images_root: 'static-assets/build/css/images',
  images_root: 'static-assets/build/images',
  package_fonts_root: 'static-assets/package/fonts',
  package_images_root: 'static-assets/package/images',
  package_js_root: 'static-assets/package/js',
  package_css_root: 'static-assets/package/css'
};

gulp.task('bower', function() {
  return bower();
});

gulp.task("clean", function() {
  return gulp.src(['static-assets/build', 'static-assets/.package']).pipe(vinylPaths(del));
});

gulp.task('cssLib', function() {
  let cssFilter = (/(.*\.(css|map)$|multiple-select.png)/i);
  return gulp.src(mainFiles({
    filter: cssFilter
  })).pipe(gulp.dest(distPaths.css_root));
});

gulp.task('jsLib', function() {
  let jsFilter = (/.*\.js$/i);
  return gulp.src(mainFiles({
    filter: jsFilter
  })).pipe(gulp.dest(distPaths.js_root));
});

gulp.task('cssLibDependentImages', function() {
  let cssFilter = (/(.*\.png$)/i);
  return gulp.src(mainFiles({
    filter: cssFilter
  })).pipe(gulp.dest(distPaths.css_images_root));
});

gulp.task("stylus", function() {
  return gulp.src(paths.stylus).pipe(stylus()).pipe(gulp.dest(distPaths.css_root));
});
gulp.task("images", function() {
  return gulp.src(paths.images).pipe(gulp.dest(distPaths.images_root));
});
gulp.task("css", function() {
  return gulp.src(paths.css).pipe(gulp.dest(distPaths.css_root));
});
gulp.task("js", function() {
  return gulp.src(paths.js, {
    base: 'static-assets/src/js'
  }).pipe(gulp.dest(distPaths.js_root));
});

gulp.task("build", ["clean"], function() {
  let deferred = Q.defer();
  runSequence('bower', ['cssLib', 'cssLibDependentImages', 'jsLib'], ["stylus", "js", "images", "css"], function(err) {
    if(err){
      deferred.reject(err);
    }else{
      console.log("Build Success!");
      deferred.resolve();
    }
  });
  return deferred.promise;
});

gulp.task('startAssetsServer', ['build'], function() {
  console.log('start development server');
  connect.server({
    root: 'static-assets',
    port: 8888,
    middleware: function() {
      return [function(req, res, next) {
        res.setHeader("Access-Control-Allow-Origin", "*");
        return next();
      }];
    }
  });
});

gulp.task("watch", ['startAssetsServer'], function() {
  gulp.watch([paths.stylus, paths.js, paths.images], ['build']);
});

gulp.task('default', ['watch'], function() {
  console.log("start the server and watch the static-assets");
});