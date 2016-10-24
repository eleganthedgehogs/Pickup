var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var methodOverride = require('method-override');
var port = process.env.PORT || 8000;
var app = express();

/************************MIDDLEWARE**************************/


//logs requests to the server in the console
app.use(morgan('dev'));

//parses the body of all incoming requests 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/vnd.api+json'}));

// // override with the X-HTTP-Method-Override header in the request
app.use(methodOverride('X-HTTP-Method-Override'));


/**************************API ROUTES****************************/

// handle user signin
app.post('/api/signin', function(req, res) {

});

// handle user signup
app.post('/api/signup', function(req, res) {

});

// getting/posting users
app.route('/api/users')
  .get(function(req, res) {

  })
  .post(function(req, res) {

  });

// getting/posting games
app.route('/api/games')
  .get(function(req, res) {

  })
  .post(function(req, res) {

  });

/*************************TEMPLATE ROUTES************************/
app.get('/', function(req, res) {
  //fill in with templates
  //res.render ( STUFF );
});




/***********************SERVER START*************************/


app.listen(port);
console.log('Listening on port', port);