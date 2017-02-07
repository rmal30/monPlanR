#!/bin/sh
set -e

echo "Preparing for git"

echo "Building Unit Test Report"
mocha --compilers babel-core/register test/setup.js test/**/*.spec.{js,jsx} --reporter mochawesome --reporter-options reportDir=docs,reportFilename=index

echo "Performing eslint Test"
npm run test:lint

echo "Report Ready. Preparing for Git"
echo "Using Git to Add and Commit"
git add .
git commit -a
echo "pushing to origin using git push"
git push
