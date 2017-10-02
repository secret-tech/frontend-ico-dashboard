const webpack = require('webpack');
const chalk = require('chalk');
const config = require('../webpack.config.prod.js');

process.env.NODE_ENV = 'production';

console.log(chalk.green('Start building app'));

webpack(config).run((error, stats) => {
  if (error) {
    console.log(chalk.red('┻━┻ ︵ ლ(ಠ益ಠლ)'));
    console.log(chalk.red(error));
    return 1;
  }

  const jsonStats = stats.toJson();

  if (stats.hasWarnings()) {
    jsonStats.warnings.map((warn) => console.log(chalk.yellow(warn)));
  }

  if (stats.hasErrors()) {
    console.log(chalk.red('┻━┻ ︵ ლ(ಠ益ಠლ)'));
    return jsonStats.errors.map((err) => console.log(chalk.red(err)));
  }

  console.log('');
  console.log(chalk.bgGreen('                                                           '));
  console.log(chalk.bgGreen('   App is compiled in production mode in /dist directory   '));
  console.log(chalk.bgGreen('                                                           '));
  console.log('');
});
