const mongoose = require('mongoose'); //require mongoose package
const Schema = mongoose.Schema;


const messageSchema = new Schema({
	messageText : String,
	sender: {
		type: mongoose.Schema.Types.ObjectId,
		ref: `User`
	},
	receiver:{
		type: mongoose.Schema.Types.ObjectId,
		ref: `User`
	},
	date: {
		type: Date,
    	default: Date.now()
  	}
});

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;
