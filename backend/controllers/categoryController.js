import asyncHandler from 'express-async-handler'
import Category from '../models/categoryModel.js'
import ErrorResponse from '../utils/ErrorResponse.js'

// @desc    Fetch all categories
// @route   GET /api/categories
// @access  Public
export const getCategories = asyncHandler(async (req, res) => {
    let categories
    if(req.query.id) {
	    const category = Category.findById(req.query.id).populate('subcategories')
        categories = category.subcategories
    } else {
        categories = Category.find({ type: "Level0" })
    }

    res.status(200).json({
        categories
    })
})

// @desc    Fetch category by id
// @route   GET /api/categories/:id
// @access  Public
export const getCategoryById = asyncHandler(async (req, res) => {
    const category = Category.findById(req.params.id)
    res.status(200).json({
        category
    })
})
