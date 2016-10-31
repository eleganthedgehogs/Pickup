var expect = require('chai').expect;
var request = require('request');

var db = require('../config/db.js');
var User = require('../models/userModel.js');
var Court = require('../models/courtModel.js');
var Game = require('../models/gameModel.js');

describe('Login routes', function() {

  beforeEach(function() {
    User.remove({email: 'test@hr.com'}).exec();
  });

  describe('User signup', function() {
    var postSignup = {
      method: 'POST',
      url: 'http://localhost:8000/api/signup',
      json: {
        email: 'test@hr.com',
        password: 'test'
      }
    };

    it('should return a 404 status code if user already exists', function(done) {
      request(postSignup, function(err, res, body) {
        request(postSignup, function(err, res, body) {
          if (err) {
            return console.log(err);
          }

          expect(res.statusCode).to.equal(404);
          return done();
        });
      });
    });

    it('should return a JSON Web Token if signup is successful', function(done) {
      request(postSignup, function(err, res, body) {
        if (err) { return console.log(err); }
      });
    });
  });


});