//user controller
const express = require('express')
const router = express.Router()
const User = require('../models/user')
const bcrypt = require('bcryptjs')

// login
router.post('/login', async (req, res, next) => {
  if(!req.body.username){
    return res.send({
      success: false,
      message:'Error: username cannot be blank'
    })
  }
  if(!req.body.password){
    return res.send({
      success: false,
      message: 'Error: password cannot be blank'
    })
  }
 try {
    const foundUser = await User.findOne({username: req.body.username});
    if (foundUser) {
      if (bcrypt.compareSync(req.body.password, foundUser.password)) {
        req.session.message = '';
        req.session.username = foundUser.username;
        req.session.logged = true;
        console.log('password correct');
        res.send({
          success: true,
          message: 'Valid sign in'

        })
      }
      else {
        console.log(`Username or password is incorrect`);
        req.session.message = `Username or password is incorrect`;
        res.send({
          success: false,
          message: 'Error: server error'

        })
      }
    }
    else {
      console.log(`Username or password is incorrect`);
      req.session.message = `Username or password is incorrect`
      res.send({
        success: false,
        message: 'Error: server error'

      })
    }
  }
  catch(err) {
    next(err)
  }
})
        //1. if we find user check password 
        // 2. if password matches wt db set session and send user
        // object omit pw
        // 


router.post('/register', (req, res, next) => {
  console.log("this is req in register");
  console.log(req);
    if (!req.body.username) {
        return res.send({
            success: false,
            message: 'Error: username cannot be blank.'
        });
    }
    if (!req.body.password) {
        return res.send({
            success: false,
            message: 'Error: Password cannot be blank.'
        });
    }

    const username = req.body.username
    User.find({
        username: username
    }, (err, previousUsers) => {
        if (err) {
            return res.send({
                success: false,
                message: 'Error: Server error'
            });
        } else if (previousUsers.length > 0) {
            return res.send({
                success: false,
                message: 'Error: Account already exist.'
            });
        }
        // Save the new user
        const encryptedPassword = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10))
        const userToCreate = {
            username: username,
            password: encryptedPassword,
            bio: req.body.bio,
            nativeLanguage: req.body.nativeLanguage,
            languageOfInterest: req.body.languageOfInterest
        }
        const newUser = User.create(userToCreate)
        console.log(newUser);
        return res.send({
            success: true,
            message: 'Signed up'
        });
    });
}); // end of sign up endpoint
// stores regitered user into db

// // profile route
// router.get('/profile', async (req, res, next) => {

// })
// // amigo list page
// router.get('/findAmigos', async (req, res, next) => {

// })
// // get users for amigo list
// router.get('/findAmigos/:id', async (req, res, next) => {

// })
// // route spanish page
// router.get('/learnSpanish', async (req, res, next) => {
  
// })

module.exports = router;



