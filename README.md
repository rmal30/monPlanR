# monPlan [![Build Status](https://travis-ci.org/MonashUnitPlanner/monPlanR.svg?branch=master)](https://travis-ci.org/MonashUnitPlanner/monPlanR) [![Packagist](https://img.shields.io/packagist/l/doctrine/orm.svg)](https://github.com/MonashUnitPlanner/monPlanR/blob/master/LICENSE)
### **[Start planning your course today](http://www.monplan.tech)**

**monPlan** is a course planner for Monash students.

Built in the latest standards with _React_, _Redux_, and _Semantic-UI_, **monPlan** delivers a clean and beautiful tool packaged as a web app.

## Get started
We use babel for transpiling ES6 and npm for running scripts.

To start this project, first install dependencies via:
```
npm install
```
then to run the local development environment (on `localhost:8080`):
```
npm start
```
Optionally if you wish to build a production distribution to test on a server or for whatever reason (default port is 8080), you can build a dist and host via:
```
NODE_ENV=production PORT=8080 npm start
```

## HTTPS
If you want the production server to handle HTTPS, you **must** have a private key (named _server.key_) and a TLS/SSL certificate in a folder with path `/path/to/monPlanR/ssl`. Then follow instructions on running the production server as per usual, and the server will load the key and certificate up before running the app on port `443`.

## Test
To test the code for any syntaxical or stylistic errors/warnings, as well as unit testing:
```
npm test
```
# Documentation
Currently we use jsdoc to document our code, which you can view it here: https://doclets.io/MonashUnitPlanner/monPlanR

If you want to, you can also build documentation:
```
npm run jsdoc
```
# License
MIT License

Copyright (c) 2016 eSolutions (Monash University)

_Built by Saurabh Joshi, Josh Nelsson-Smith, Eric Jiang_

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
