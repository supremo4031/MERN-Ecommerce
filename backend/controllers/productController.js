import asyncHandler from 'express-async-handler'
import Product from '../models/productModel.js'
import ErrorResponse from '../utils/ErrorResponse.js'

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
export const getProducts = asyncHandler(async (req, res) => {
	const products = await Product.find()
	res.status(200).json({
		products
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
		message: 'Product removed'
	})
})


// @desc    Update product by id
// @route   PATCH /api/products/:id
// @access  Private/Admin
export const updateProductById = asyncHandler(async (req, res) => {
	const product = await Product.findById(req.params.id)

	if(product) {

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
		description: 'Sample Description'
	})

	const createdProduct = await product.save()
	res.status(201).json(createdProduct)
})