#!/bin/sh
set -e

echo "Preparing for git"

echo "Building Unit Test Report"
mocha --compilers babel-core/register test/setup.js test/**/*.spec.{js,jsx} --reporter mochawesome

echo "Cleaning up doc folder..."
rm -rf docs/

echo "Renaming Files for gh-pages"
mv mochawesome-reports docs
mv docs/mochawesome.html docs/index.html

echo "Performing eslint Test"
npm run test:lint

echo "Report Ready. Preparing for Git"
echo "Using Git to Add and Commit"
git add .
git commit -a
echo "pushing to origin using git push"
git push
