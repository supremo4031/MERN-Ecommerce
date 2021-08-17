import asyncHandler from 'express-async-handler'
import Product from '../models/productModel.js'

// @desc    Fetch searched products
// @route   GET /api/search/products/
// @access  Public
export const getSearchedProducts = asyncHandler(async (req, res) => {
	
    const pageSize = 10
	const page = Number(req.query.pageNumber) || 1

	const keyword = req.query.keyword
		? {
				name: {
					$regex: req.query.keyword,
					$options: 'i',
				},
		  }
		: {}

	const count = await Product.countDocuments({ ...keyword })
	const products = await Product.find({ ...keyword })
		.limit(pageSize)
		.skip(pageSize * (page - 1))
	res.status(200).json({
		products,
		page,
		pages: Math.ceil(count / pageSize),
	})
})
