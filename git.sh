#!/bin/sh

echo "Preparing for git"
echo "Cleaning up doc folder..."
rm -rf docs/
rm -rf mochawesome-reports/
echo "Builing Unit Test Report"
mocha --compilers babel-core/register test/setup.js test/**/*.spec.{js,jsx} --reporter mochawesome
echo "Renaming Files"
mv mochawesome-reports docs
cd docs
mv mochawesome.html index.html
echo "Deploying to Git using lazy git"
lazy git
