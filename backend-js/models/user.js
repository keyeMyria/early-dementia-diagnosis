/**
 * Created by EleanorLeung on 6/04/2017.
 */
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const config = require('../config/database');
const relationship = require('../node_modules/mongoose-relationship');
const Schema = mongoose.Schema;

const Patient = require('../models/patient');
const Test = require('../models/test');

const UserSchema = Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    dateOfBirth: {
        type: Date
    },
    patients: [{
        type: Schema.ObjectId, ref : 'Patient'
    }],
    tests: [{
        type: Schema.ObjectId, ref: 'Test'
    }]
});

UserSchema.pre('save', true, function(next, done){
   var self = this;

   User.findOne({email : this.email}, 'email', function(err, results){
       if (err) {
           done(err);
       }
       else if (results) {
           self.invalidate("email", "Email must be unique");
           done(new Error("Email must be unique!"));
       }
       else {
           done();
       }
   });
    next();
});

const User = module.exports = mongoose.model('User', UserSchema);

module.exports.getUserById = function(id, callback){
    const query = {_id: id};
    User.findOne(query, callback);
};

module.exports.getAllUsers = function(callback){
    User.find();
};

module.exports.getUserByEmail = function(email, callback){
    const query = {email: email};
    User.findOne(query, callback);
};

module.exports.addUser = function(newUser, callback){
    // generate salt i.e. random key to hash password
    console.log('adding user');
    bcrypt.genSalt(10, function(err, salt){
       bcrypt.hash(newUser.password, salt, function(err, hash){
           if (err) {
               throw err;
           }

           newUser.password = hash;
           newUser.save(callback);
       });
    });
};

module.exports.comparePassword = function(candidatePassword, hash, callback){
    if (hash ==  "") {
        callback("The user's hash is empty, no comparisons will be made", false);
    } else {
        bcrypt.compare(candidatePassword, hash, function (err, isMatch) {
            if (err) {
                throw err;
            }
            callback(null, isMatch);
        });
    }
};

//functions made for testing purposes
module.exports.removeUsers = function(callback){
    User.remove({}, callback);
};