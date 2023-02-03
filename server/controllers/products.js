const CustomError = require('../helpers/errors/CustomError');
const AsyncErrorHandler = require('express-async-handler');
const Products = require('../modules/Products');
const postProduct = AsyncErrorHandler(async (req, res, next) => {
	const {
		productName,
		prodcutPrice,
		productStock,
		img_url,
		sale,
		brand,
		productRatings,
		productInfo,
		productSize,
		productColor
	} = req.body;

	console.log(req.body);
	const product = await Products.create({
		productName,
		prodcutPrice,
		productStock,
		img_url,
		discontinued: productStock === 0 ? false : true,
		productRatings,
		sale,
		brand,
		productInfo,
		productSize,
		productColor
	});

	res.status(200).json({
		success: true,
		data: product
	});
});
const getProducts = AsyncErrorHandler(async (req, res, next) => {
	Products.find({}, (err, docs) => {
		res.status(200).json({
			success: true,
			data: docs
		});
	});
});
const deleteProduct = AsyncErrorHandler(async (req, res, next) => {
	const { id } = req.params;
	Products.findByIdAndDelete(id, (err) => {
		res.status(200).json({
			success: true,
			message: 'Delete Product'
		});
	});
});
const errorTest = (req, res, next) => {
	return next(new CustomError('Custom Error Error'));
};
module.exports = {
	postProduct,
	errorTest,
	getProducts,
	deleteProduct
};
