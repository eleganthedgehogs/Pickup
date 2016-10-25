var Promise = require('bluebird');
var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: String,
  location: String
});


UserSchema.methods.comparePasswords = function(enteredPassword) {
  var currentPassword = this.password;
  return new Promise(function(resolve, reject) {
    bcrypt.compare(enteredPassword, currentPassword, function(err, matched) {
      if (err) { reject(err); }

      if (matched) {
        resolve(matched);
      }
    });
  });
};

UserSchema.methods.setLocation = function(newLocation) {
  this.location = newLocation;
};

UserSchema.pre('save', function(next) {
  var user = this;

  //method on mongoose schemas
  //allows the server to do check the database
  //for a user without having to check password as well
  if (!user.isModified('password')) {
    next();
  }

  bcrypt.hash(user.password, null, null, function(err, hash) {
    if (err) { return next(err); }

    user.password = hash;
    next();
  });
});


module.exports = mongoose.model('users', UserSchema);