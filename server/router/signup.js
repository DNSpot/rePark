const express = require('express');
const signup = express.Router();

const userController = require('../controllers/userController');
// const sessionController = require('../controllers/sessionController');
const cookieController = require('../controllers/cookieController');


signup.post('/', userController.createUser, (req, res) => {
	const { phone } = req.body;
    phoneNum = Number(phone);
	res.status(200).json(phoneNum);
});

signup.put('/', userController.updateUserCar,
		  (req, res) => {
			res.status(200).json({ successfulSignup: true })
		  })
						



module.exports = signup;