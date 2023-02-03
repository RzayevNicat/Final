const CustomError = require('../../helpers/errors/CustomError');

const customError = (err, req, res, next) => {
	let customError = err;
	if (err.name === 'SyntaxError') {
		customError = new CustomError('Unexpected Syntax', 400);
	}

	console.log(CustomError.name, CustomError.message, CustomError.status);
	res.status(customError.status || 500).json({
		success: false,
		message: customError.message
	});
};
module.exports = customError;
