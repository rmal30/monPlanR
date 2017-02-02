#!/bin/sh

echo "Preparing for git"
echo "Cleaning up doc folder..."
rm -rf docs/
rm -rf mochawesome-reports/
echo "Building Unit Test Report"
mocha --compilers babel-core/register test/setup.js test/**/*.spec.{js,jsx} --reporter mochawesome
echo "Renaming Files for gh-pages"
mv mochawesome-reports docs
cd docs
mv mochawesome.html index.html
echo "Deploying to Git using git add . and git commit"
echo "cd back to main Directory"
cd ..
echo "Using Git too add and Commit"
git add .



git commit -a
echo "pushing to origin using git push"
git push
