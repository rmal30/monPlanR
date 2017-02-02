#!/bin/sh
echo "Running Unit Tests"
npm test
echo "Finished Testing. Builiding using Webpack"
npm run build:prod
echo "Built dist, deploying to GCloud"
cd dist
gcloud app deploy
