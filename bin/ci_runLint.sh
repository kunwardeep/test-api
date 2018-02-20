#!/bin/bash
set -e
set -o pipefail
set -u

echo '--- Building docker image'
docker-compose build test-api

echo '--- Running ci_runTest in Docker :docker:'
docker-compose run --rm test-api \
  npm run lint
