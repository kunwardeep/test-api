#!/bin/bash
set -e


if [[ -z $API_ENDPOINT ]]; then
  echo "Please set the API_ENDPOINT environment variable"
  echo "Usage - API_ENDPOINT=http://preview.airwallex.com:30001  ./bin/ci_runTests.sh"
  exit 1
fi

echo '--- Building docker image'
docker-compose build test-api

echo '--- Running ci_runTest in Docker :docker:'
docker-compose run --rm test-api \
  npm run test
