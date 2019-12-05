const mongoose = require('mongoose'); //require mongoose package
const Schema = mongoose.Schema;


const messageSchema = new Schema({
  messageText : String,
  sender : Number, // ref ObjectId -- Unit 2 -- references
  receiver: Number, // ref ObjectId -- Unit 2 -- references
  timestamp : Date, // default date now
});
const Message = mongoose.model('Message', messageSchema);

module.exports = Message;
