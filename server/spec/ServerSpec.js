var expect = require('chai').expect;
var request = require('request');

var db = require('../config/db.js');
var User = require('../models/userModel.js');
var Court = require('../models/courtModel.js');
var Game = require('../models/gameModel.js');


// these tests should work, but the before each hook doesn't work?
// check back later to figure it out
describe('Login routes', function() {

  beforeEach(function(done) {
    User.remove({email: 'test@hr.com'}, function(err, response) {
      if (err) { console.log(err); }
      done();
    });
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
          done();
        });
      });
    });

    it('should return a JSON Web Token if signup is successful', function(done) {
      request(postSignup, function(err, res, body) {
        if (err) { return console.log(err); }
        console.log(body.id_token);

        expect(body.id_token).to.not.equal(undefined);
        expect(res.statusCode).to.equal(201);
        done();
      });
    });
  });
});