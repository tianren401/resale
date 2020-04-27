#!/bin/bash

set -e

printf "> On $CIRCLE_BRANCH branch \n"

if [[ "$CIRCLE_BRANCH" == "master" ]]; then
  BUILD_ENV="prod"
elif [[ "$CIRCLE_BRANCH" == "dev" ]]; then
  BUILD_ENV="nonprod"
else BUILD_ENV="nonprod"
fi

printf "> Setting BUILD_ENV=${BUILD_ENV} \n"

echo "export BUILD_ENV=${BUILD_ENV}" >> $BASH_ENV
