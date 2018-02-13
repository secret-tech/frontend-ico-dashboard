import browserSync from 'browser-sync';
import historyApiFallback from 'connect-history-api-fallback';

browserSync({
  port: 5000,
  ui: { port: 5001 },
  server: { baseDir: 'dist' },
  files: ['src/*.html'],
  middleware: [historyApiFallback()]
});
