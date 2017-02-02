#!/bin/sh

echo "Preparing for git"
echo "Cleaning up doc folder..."
rm -rf doc/
rm -rf mochawesome-reports/
echo "Builing Unit Test Report"
mocha --compilers babel-core/register test/**/*.spec.js* --reporter mochawesome
echo "Renaming Files"
mv mochawesome-reports doc
cd doc
mv mochawesome.html index.html
echo "Deploying to Git using lazy git"
lazy git
