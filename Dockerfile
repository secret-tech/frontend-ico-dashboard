FROM mhart/alpine-node:8

ARG ENV_FILE=stage

WORKDIR /usr/src/app
ADD . /usr/src/app/
RUN cp -r .env.${ENV_FILE} .env

RUN yarn
RUN yarn run build
