# Jincor Investor Dashboard Frontend

[![Build Status](https://travis-ci.org/JincorTech/frontend-ico-dashboard.svg?branch=develop)](https://travis-ci.org/JincorTech/frontend-ico-dashboard)

Last stable version is [1.4.0](https://github.com/secret-tech/frontend-ico-dashboard/releases/tag/v1.4.0) in master branch. In develop branch we're redesign dashboard, so dev branch not ready for production.

### Commit hooks

That boilerplate uses pre-commit hooks and run some scripts before making git commit. To see what is started before commit check package.json pre-commit block. Default - `yarn lint:all` and `yarn test`. To ignore the check, use `-n` e.g `git commit -n -m 'Your amazing commit msg'`.

### Environment variables

``cp .env.example .env`` - copy example dotenv file and specify your own values in `.env`

You can use different environment variables. Create `.env.stage`, `.env.prod` and `.env.dev` and copy the file you need.

To access values inside application call `console.log(process.env)`.

### Server api mocks

By default api mocks are turned on. To use real server api you have to set API_HOST environment variable.

### Scripts

``yarn start`` - start application in development mode

``yarn build`` - build application into `/dist` directory

``yarn build:clean`` - remove prev `/dist` and build application

``yarn serve`` - serve `/dist` directory. Requires build application before run

``yarn lint:js`` - run eslint

``yarn lint:css`` - run stylelint

``yarn lint:all`` - run eslint and stylelint concurrently

``yarn test`` - run jest

``yarn test:coverage`` - jest coverage

``yarn test:watch`` - jest in watch mode

``yarn analyze`` - analyze webpack bundle

______________________________

[Jincor Tech]( https://github.com/JincorTech)
