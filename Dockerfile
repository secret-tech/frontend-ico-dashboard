FROM mhart/alpine-node:8

ARG ENV_FILE=stage

VOLUME /usr/src/app
WORKDIR /usr/src/app
