import webpack from 'webpack';
import chalk from 'chalk';
import config from './webpack/webpack.config.prod';

process.env.NODE_ENV = 'production';

console.log(chalk.green('Building application...'));

webpack(config).run((error, stats) => {
  if (error) {
    console.log(chalk.red(error));
    return 1;
  }

  const jsonStats = stats.toJson();

  if (stats.hasWarnings) {
    console.log('Bundle generated with following warnings: ');
    jsonStats.warnings.map((warn) => console.log(chalk.yellow(warn)));
  }

  if (stats.hasErrors()) {
    return jsonStats.errors.map((err) => console.log(chalk.red(err)));
  }

  console.log(`Webpack stats: ${stats}`);
  console.log(chalk.green('Application builded in /dist'));
  return 0;
});
