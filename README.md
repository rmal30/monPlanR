# monPlan [![Build Status](https://travis-ci.org/MonashUnitPlanner/monPlanR.svg?branch=master)](https://travis-ci.org/MonashUnitPlanner/monPlanR) [![Packagist](https://img.shields.io/packagist/l/doctrine/orm.svg)](https://github.com/MonashUnitPlanner/monPlanR/blob/master/LICENSE)
### **[ ![Logo](https://raw.githubusercontent.com/MonashUnitPlanner/monPlanR/master/app/public/favicon.ico) Start planning your course today](http://www.monplan.tech)**
_Built by Josh Nelsson-Smith, Saurabh Joshi and Eric Jiang_

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

## When code builds
In the development version, `app/public` acts as a static directory for
`webpack-dev-server`.

In the production version, `pre_build_prod_server.sh`
copies all files from `server/.` and the static directory `app/public`, and pastes them into `dist` folder.

Here are some nice file tree diagrams explaining what happens in the pre-build production process:

```
Source of copy:
-----------------
- app
  \- public
- server
  |- app.yaml
  |- package.json
  \- server.js

Destination of copy:
-----------------
- dist
  |- public
  |- app.yaml
  |- package.json
  \- server.js
```

Note: There is a file called `server/package.json`. All it does is that it only provides packages necessary to run `server/server.js` once the copying phase has been completed.

The reason for having two `package.json` files is that servers tend to be slower than desktops/laptops when building code, and so it makes sense to build it here rather than over there. Having two `package.json` files is not ideal, and we would like a one `package.json` file solution.

Due to how the build is setup, you only need to modify `/path/to/monPlanR/package.json` file unless you are adding/removing dependencies for `server/server.js` file.

## Google App Engine
To deploy this web app to Google App Engine:
```
cd /path/to/monPlanR
npm run build:prod
cd dist
gcloud app deploy
```

## Setup HTTPS on production server
If you want the production server to handle HTTPS, you **must** have a private key (named _server.key_) and a TLS/SSL certificate in a folder with path `/path/to/monPlanR/server/ssl`. Then follow instructions on running the production server as per usual, and the server will load the key and certificate up before running the app on port `443`.

## Testing code
To test the code for any syntaxical or stylistic errors/warnings, as well as unit testing:
```
npm test
```
## Documentation
Currently we use jsdoc to document our code, which you can view it here: https://doclets.io/MonashUnitPlanner/monPlanR

If you want to, you can also build documentation:
```
npm run jsdoc
```
## License
View `LICENSE` file to see our MIT license.
