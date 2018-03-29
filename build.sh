#!/bin/bash

set -ex
DEV_IMAGE_NAME="jincort/frontend-ico-dashboard-develop"
PROD_IMAGE_NAME="jincort/frontend-ico-dashboard"
TAG="${1}"

docker push ${DEV_IMAGE_NAME}:${TAG}

if [ "$TAG" == "stage" ]; then
  docker build -f Dockerfile.stage -t ${PROD_IMAGE_NAME}:${TAG} .
else
  docker build -f Dockerfile.prod --no-cache -t ${PROD_IMAGE_NAME}:${TAG} .
fi

docker push ${PROD_IMAGE_NAME}:${TAG}
