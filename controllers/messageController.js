// // message controller
const express = require('express')
const router = express.Router()
const Message = require('../models/message')
const bcrypt = require('bcryptjs')
// // message route

// // create meesage
router.post('/sms', async (req, res) => {
	try{
	 	const createdMessage = await Message.create({
	 		messageText: req.body.messageText,
	  		sender : req.body.sender,
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


// // edit messages route
// router.get('/:id/edit', async (req, res) => {
// 	try{
// 		const foundMessage = await Message.findById(req.params.id)
// 		res.send({
// 			message: foundMessage,
// 			success: true
// 		})
// 	}
// 	catch(err){
// 		console.log(err)
//  		res.send({
//  			message:'failed to edit',
//  			success: false
//  		})
// 	}

// })

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
