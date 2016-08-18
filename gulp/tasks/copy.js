import gulp from 'gulp';
import { copy as config } from '../config';

gulp.task('copy', () => {
  gulp.src(config.src, config.base)
    .pipe(gulp.dest(config.dest));
});
