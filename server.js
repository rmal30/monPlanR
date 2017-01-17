var express = require('express')
var path = require('path')
var compression = require('compression')

var app = express()
var helmet = require("helmet");
var hidePoweredBy = require("hide-powered-by");
var session = require("express-session");
var nosniff = require("dont-sniff-mimetype");
var ienoopen = require('ienoopen');
var xssFilter = require('x-xss-protection');
var frameguard = require('frameguard');
var hpkp = require('hpkp');
var csp = require('helmet-csp');

console.log('Deploying Security Measures')
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
    scriptSrc: ["'self'", "'unsafe-inline'", "www.google-analytics.com"]
  },
  reportOnly: false,
  setAllHeaders: false,
  disabledAndroid: false,
  browserSniff: false
}))

app.use(compression())

// serve our static stuff like index.css
app.use(express.static(path.join(__dirname, 'dist')))

// send all requests to index.html so browserHistory works
app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'))
})

var PORT = process.env.PORT || 80
app.listen(PORT, function() {
  console.log('Production Express server running at localhost:' + PORT)
})
