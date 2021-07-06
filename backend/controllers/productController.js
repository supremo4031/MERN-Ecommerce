import asyncHandler from 'express-async-handler'
import Product from '../models/productModel.js'
import ErrorResponse from '../utils/ErrorResponse.js'

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
export const getProducts = asyncHandler(async (req, res) => {

	const pageSize = 10
	const page = Number(req.query.pageNumber) || 1

	const keyword = req.query.keyword ? {
		name: {
			$regex: req.query.keyword,
			$options: 'i'
		}
	} : {}


	const count = await Product.countDocuments({ ...keyword })
	const products = await Product.find({ ...keyword }).limit(pageSize).skip(pageSize * (page - 1))
	res.status(200).json({
		products,
		page,
		pages: Math.ceil(count / pageSize)
	})
})

// @desc    Fetch product by id
// @route   GET /api/products/:id
// @access  Public
export const getProductById = asyncHandler(async (req, res) => {
	const product = await Product.findById(req.params.id)
	res.status(200).json({
		product,
	})
})

// @desc    Delete product by id
// @route   DELETE /api/products/:id
// @access  Private/Admin
export const deleteProductById = asyncHandler(async (req, res) => {
	await Product.findByIdAndDelete(req.params.id)
	res.status(200).json({
		message: 'Product removed',
	})
})

// @desc    Update product by id
// @route   PATCH /api/products/:id
// @access  Private/Admin
export const updateProductById = asyncHandler(async (req, res) => {
	const product = await Product.findById(req.params.id)

	if (product) {
		const { name, brand, image, description, category, price } = req.body

		product.name = name || product.name
		product.description = description || product.description
		product.brand = brand || product.brand
		product.image = image || product.image
		product.category = category || product.category
		product.price = price || product.price

		const updateProduct = await product.save()

		res.status(200).json(updateProduct)
	} else {
		throw new ErrorResponse('Product not found', 404)
	}
})

// @desc    Create product
// @route   POST /api/products
// @access  Private/Admin
export const createProduct = asyncHandler(async (req, res) => {
	const product = new Product({
		name: 'Sample Name',
		price: 0,
		user: req.user._id,
		image: '/images/sample.jpg',
		brand: 'Sample Brand',
		category: 'Sample Category',
		countInStock: 0,
		numReviews: 0,
		description: 'Sample Description',
	})

	const createdProduct = await product.save()
	res.status(201).json(createdProduct)
})

// @desc    Create new review
// @route   PATCH /api/products/:id/reviews
// @access  Private
export const createProductReview = asyncHandler(async (req, res) => {
	const product = await Product.findById(req.params.id)

	if (product) {

		const { rating, comment } = req.body

		const alreadyReviewed = product.reviews.find(
			(r) => r.user.toString() === req.user._id.toString()
		)

		if (alreadyReviewed) {
			throw new ErrorResponse('Product already reviewed', 400)
		}

		const review = {
			name: req.user.name,
			rating: Number(rating),
			comment,
			user: req.user._id,
		}

		product.reviews.push(review)
		product.numReviews = product.reviews.length
		product.rating =
			product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.numReviews
		await product.save()
		res.status(201).json({ message: 'Review added' })
	} else {
		throw new ErrorResponse('Product not found', 404)
	}
})


// @desc    Get top rated products
// @route   GET /api/products/top
// @access  Public
export const getTopProducts = asyncHandler(async (req, res) => {
	const products = await Product.find({}).sort({ rating: -1 }).limit(3)
	res.status(200).json(products)
})
