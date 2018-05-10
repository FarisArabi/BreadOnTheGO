var userRouter = require('express').Router();
var userController = require('./UserController');

userRouter.route('/')
	.get(function (req, res) {
		res.json("Not Allowed To Enter Here");
	})

userRouter.route('/login')
	.post(function (req, res) {
		userController.login(req, res);
	})

userRouter.route('/create')
	.post(function (req, res) {
		userController.create(req, res);
	})


module.exports = userRouter;
