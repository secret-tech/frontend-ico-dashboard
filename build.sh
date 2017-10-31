#!/bin/bash

set -ex
IMAGE_NAME="jincort/frontend-supreme-happiness"
TAG="${1}"
ENV_FILE="${2}"

docker build --build-arg ENV_FILE=${ENV_FILE} -t ${IMAGE_NAME}:${TAG} .
docker push ${IMAGE_NAME}:${TAG}
