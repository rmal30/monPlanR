#!/bin/bash

echo "Initialising staic data files..."
cp -r app/data/ dist/
echo "Initialising staic resource files..."
cp -r app/resources/ dist/
echo "Starting production server..."
NODE_ENV=production npm start