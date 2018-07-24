# Space ICO dashboard Frontend module

![GitHub (pre-)release](https://img.shields.io/github/release/secret-tech/frontend-ico-dashboard/all.svg)
[![Build Status](https://travis-ci.org/secret-tech/frontend-ico-dashboard.svg?branch=develop)](https://travis-ci.org/secret-tech/frontend-ico-dashboard)
![license](https://img.shields.io/github/license/secret-tech/frontend-ico-dashboard.svg)

This is frontend module of [Space ICO Dashboard](https://icodashboard.space/). Checkout backend [here](https://github.com/secret-tech/backend-ico-dashboard).

This web client can be used to connect Space Dashboard's backend. Currently it has the following functionality:

1. Registration & Authorization
1. Generation of Ethereum address upon user activation
1. KYC verification using [Jumio Netverify](https://www.jumio.com/trusted-identity/netverify) service and [Sufti Pro](https://shuftipro.com) service
1. Token purchase
1. Displaying Investor's transaction history
1. All important actions are protected with 2FA (email or google authenticator) by integration with [secret_tech Backend Verify](https://github.com/JincorTech/backend-verify) service

For more info check [**API DOCS**](https://secret-tech.github.io/backend-ico-dashboard)

## How start application loacally?

1. Clone this repo.
1. Install deps via `$ yarn`
1. Set up env variables `$ cp .env.example .env`
1. Up dev server locally `$ yarn start`
1. Go to `localhost:3000/auth/sign-in`

## How to build application for production?

Webpack generate static `dist` directory with production build of app. You just need serve it with your server like nginx.

1. `$ yarn`
1. `$ cp .env.prod .env`
1. `$ yarn build` or `$ yarn build:clean` clean build remove previous build directory
1. `$ yarn serve` start local webserver to see results

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

[LICENSE](https://github.com/JincorTech/frontend-moon-wallet/blob/develop/LICENSE) @ [secret_tech](http://secrettech.io/)
