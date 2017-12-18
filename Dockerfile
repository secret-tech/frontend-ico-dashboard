FROM mhart/alpine-node:8

USER root
ARG ENV_FILE=stage

VOLUME /usr/src/app
WORKDIR /usr/src/app
