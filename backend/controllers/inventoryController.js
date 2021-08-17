import asyncHandler from 'express-async-handler'
import Inventory from '../models/inventoryModel.js'

// @desc    Fetch inventory by seller id
// @route   GET /api/inventory/seller/:id
// @access  Public
export const getInventoriesBySellerId = asyncHandler(async (req, res) => {
	
    const inventory = Inventory.find({ seller: req.params.id })

	res.status(200).json({
		inventory,
	})
})

// @desc    Fetch inventory by product id
// @route   GET /api/inventory/product/:id
// @access  Public
export const getInventoriesByProductId = asyncHandler(async (req, res) => {
	
    const inventory = Inventory.find({ product: req.params.id })

	res.status(200).json({
		inventory,
	})
})

// @desc    Fetch inventory by product id
// @route   GET /api/inventory/product/:id
// @access  Public
export const getInventoriesByProductAndSellerId = asyncHandler(async (req, res) => {
	
    const inventory = Inventory.findOne({ product: req.params.pid, seller: req.params.sid })

	res.status(200).json({
		inventory,
	})
})


