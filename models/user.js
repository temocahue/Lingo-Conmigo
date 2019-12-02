const mongoose = require('mongoose'); //require mongoose package
const Schema = mongoose.Schema;


const userSchema = new Schema({
  email: {type: String, required: true},
  password: {type: String, required: true},
  bio:   String,
  username:   String,
  nativeLanguage: String,
  languageOfInterest: String,
});
const User = mongoose.model('User', userSchema);

module.exports = User;