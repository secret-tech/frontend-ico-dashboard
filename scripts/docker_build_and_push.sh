#!/bin/bash

set -ev

if [ "$TRAVIS_PULL_REQUEST" == "false" ]; then
  export DOCKERFILE=`if [ "$TRAVIS_BRANCH" == "develop" ]; then echo "Dockerfile.stage";
    else echo "Dockerfile.prod" ; fi`
  docker build -f $DOCKERFILE --no-cache -t jincort/frontend-ico-dashboard:${TAG} .
  docker login -u $DOCKER_USER -p $DOCKER_PASS
  docker push jincort/frontend-ico-dashboard-develop:${TAG}
  docker push jincort/frontend-ico-dashboard:${TAG}
fi

exit 0;