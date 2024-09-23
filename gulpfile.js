const { src, dest, watch, parallel, series } = require("gulp");
const concat = require("gulp-concat");
const cleanCSS = require("gulp-clean-css");
const browserSync = require("browser-sync").create();
const clean = require("gulp-clean");

function styles() {
  return src("src/css/style.css")
    .pipe(concat("style.min.css"))
    .pipe(cleanCSS())
    .pipe(dest("app/css"))
    .pipe(browserSync.stream());
}

// Автоматичне оновлення браузера
function watching() {
  watch("src/css/style.css", styles);
  watch("src/*.html").on("change", browserSync.reload);
}

function browsersync() {
  browserSync.init({
    server: {
      baseDir: "src/",
    },
  });
}

function cleanDist() {
  return src("dist").pipe(clean());
}

function building() {
  return src(["src/css/style.min.css", "src/**/*.html", "src/images/**/*"], {
    base: "src",
  }).pipe(dest("dist"));
}

exports.styles = styles;
exports.watching = watching;
exports.browsersync = browsersync;

exports.build = series(cleanDist, building);
exports.default = parallel(styles, browsersync, watching);
