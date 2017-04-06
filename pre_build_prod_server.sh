#!/bin/sh

echo "Preparing for build..."
echo "Cleaning up dist folder..."
rm -rf dist/
echo "Creating directories..."
mkdir dist
mkdir dist/public

echo "Copying static files..."
cp -a app/public/. dist/public/
cp -a server/. dist

echo "Completed preparation. Ready for building."
