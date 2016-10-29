var bodyParser = require('body-parser');
var morgan = require('morgan');
var methodOverride = require('method-override');

module.exports = function(app) {
  //logs requests to the server in the console
  app.use(morgan('dev'));

  //parses the body of all incoming requests 
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.text());
  app.use(bodyParser.json({ type: 'application/vnd.api+json'}));

  // // override with the X-HTTP-Method-Override header in the request
  app.use(methodOverride('X-HTTP-Method-Override'));
};
