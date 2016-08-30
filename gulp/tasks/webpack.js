import gulp from 'gulp';
import gulpif from 'gulp-if';
import uglify from 'gulp-uglify';
import webpack from 'gulp-webpack';
import minimist from 'minimist';
import config from '../config';

const options = minimist(process.argv.slice(2));
const isProduction = (options.env === 'production') ? true : false;
if (isProduction) {
    delete config.webpack.devtool;
}

gulp.task('webpack', () => {
  gulp.src(config.webpack.entry)
    .pipe(webpack(config.webpack))
    .pipe(gulpif(isProduction, uglify()))
    .pipe(gulp.dest(config.js.dest));
});
