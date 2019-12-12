// // message controller
const express = require('express')
const router = express.Router()
const Message = require('../models/message')
const User = require('../models/user')
const bcrypt = require('bcryptjs')
// // message route
// // create meesage
router.post('/sms', async (req, res) => {
	try{
	 	const createdMessage = await Message.create({
	 		messageText: req.body.messageText,
	  		sender : req.session.userId,
	  		receiver: req.body.receiver,
	  		date: req.body.date	
	 	})

		res.send({
			message:createdMessage,
			status:'message created',
			success: true
		})
	}
 	catch(err){
 		console.log(err)
 		res.send({
 			message:'failed to create',
 			success: false
 		})
 	}
})
// get messages
router.get('/:amigoId', async (req, res) => {
	console.log("\nme");
	console.log(req.session.userId);
	const sentMessages = await Message.find({sender: req.session.userId, receiver: req.params.amigoId});
	const receivedMessages = await Message.find({sender: req.params.amigoId, receiver: req.session.userId})
	// _.sortBy(sentMessages, ['date'])
	console.log("\nabout to respond");
	res.json({sentMessages: sentMessages, receivedMessages: receivedMessages})
})


// // update route for messages
router.put('/:id', async (req, res, next) => {
	try{
		const updateMessage = await Message.findByIdAndUpdate(req.params.id, req.body, {new:true});
		await updateMessage.save()
		res.send({
			message: updateMessage,
			status:'message updated',
			success: true
		})
	}
	catch(err){
		res.send({
			message:'failed to update',
			success: false
		})
	}
})
// // delete route for messages
router.delete('/:id', async (req, res, next) => {
	try{
		const deleteMessage = await Message.findByIdAndRemove(req.params.id)
		res.send({
			message: deleteMessage,
			status:'message deleted',
			success: true
		})
	}
	catch(err){
		res.send({
			message:'failed to update',
			success: false
		})

	}

})
module.exports = router;
