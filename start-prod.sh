#!/bin/bash

echo "Cleaning up old static files..."
rm -rf dist/
echo "Initialising static files..."
mkdir dist
cp -r app/data/ app/resources/ dist/
echo "Starting production server..."
NODE_ENV="production" npm start
