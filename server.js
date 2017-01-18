var express = require('express')
var path = require('path')
var compression = require('compression')

var app = express();
var helmet = require("helmet");
var hidePoweredBy = require("hide-powered-by");
var session = require("express-session");
var nosniff = require("dont-sniff-mimetype");
var ienoopen = require('ienoopen');
var xssFilter = require('x-xss-protection');
var frameguard = require('frameguard');
var hpkp = require('hpkp');
var csp = require('helmet-csp');

var fs = require('fs');
var http = require('http');
var https = require('https');

var pkey = fs.readFileSync('./ssl/server.key',"utf8");
var cert = fs.readFileSync('./ssl/server.crt',"utf8");

var credentials = {key: pkey, cert: cert};

console.log('Deploying Security Measures');
app.use(hidePoweredBy({setTo: 'Coffee'}));
app.use(nosniff());
app.use(ienoopen());
app.use(xssFilter());
app.use(frameguard({action: 'deny'}))
app.use(hpkp({
  maxAge: 1209600,
  sha256s: ['AbCdEf123=', "ZyXwVu456"],

  setIf: function(req,res){
    return req.secure
  }
}));
app.use(csp({
  directives: {
    scriptSrc: ["'self'","'unsafe-inline'", "www.google-analytics.com", "ssl.google-analytics.com"],
    imgSrc: ["'self'", "www.google-analytics.com", "ssl.google-analytics.com", "stats.g.doubleclick.net"]
  },
  reportOnly: false,
  setAllHeaders: false,
  disabledAndroid: false,
  browserSniff: false
}))
console.log('Security Measures Deployed. Compressing and Serving index.html');

app.use(compression())

// serve our static stuff like index.css
app.use(express.static(path.join(__dirname, 'dist')))

// send all requests to index.html so browserHistory works
app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'))
})

console.log("Initialising Normal HTTP Server")
var httpServer = http.createServer(app);
httpServer.listen(80);

console.log("Initialising HTTPS Server")
var httpsServer = https.createServer(credentials, app);
httpsServer.listen(443);


console.log("Ready to Go!")
