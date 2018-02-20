# test-api
This tool helps running api integration tests against an end-point.

- [Getting Started](#getting-started)
- [Test Results](#test-results)

## Getting Started

#### Prerequisites
To run the project you need to have minimum node version 6.10.3 and minimum npm version 3.10.10. After you have done that you can follow the [Local Setup](#local-setup)

If your environment is not configured for to run node, you can install docker. After you have done that you can follow the  [CI Setup](#ci-setup)

Currently 15 tests are failing. They will report as failures when you run the tests. The details of the tests have been put under [github issues](https://github.com/kunwardeep/test-api/issues)
#### Clone
To clone this repo, run these commands
```
mkdir -p ~/code
git clone git@github.com:kunwardeep/test-api.git ~/code/test-api
```
#### Local Setup
```
npm install
```

#### Running integration tests
```
API_ENDPOINT=http://preview.airwallex.com:30001 npm run test
```
API_ENDPOINT can be changed to any url that supports the `/bank` endpoint

#### Running Linter
```
npm run lint
```
#### CI Setup

To run tests in CI run the following command
```
API_ENDPOINT=http://preview.airwallex.com:30001 ./bin/ci_runTests.sh
```
API_ENDPOINT can be changed to any url that supports the `/bank` endpoint

To run linter in CI run the following command
```
./bin/ci_runLint.sh
```

## Test Results

[Results](testResult.txt)
