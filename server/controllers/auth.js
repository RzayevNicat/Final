const User = require('../modules/User');
const CustomError = require('../helpers/errors/CustomError');
const AsyncErrorHandler = require('express-async-handler');
const getAllAuth = AsyncErrorHandler(async (req, res, next) => {
	const { name, email, password, role } = req.body;
	console.log(req.body);
	const user = await User.create({
		name,
		email,
		password,
		role
	});

	res.status(200).json({
		success: true,
		data: user
	});
});
const errorTest = (req, res, next) => {
	return next(new CustomError('Custom Error Error'));
};
module.exports = {
	getAllAuth,
	errorTest
};
