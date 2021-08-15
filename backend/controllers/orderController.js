import asyncHandler from 'express-async-handler'
import Order from '../models/orderModel.js'
import ErrorResponse from '../utils/ErrorResponse.js'

// @desc    Create new Order
// @route   POST /api/orders
// @access  Private
export const addOrderItems = asyncHandler(async (req, res) => {
	const {
		orderItems,
		shippingAddress,
		paymentMethod,
		itemsPrice,
		taxPrice,
		shippingPrice,
		totalPrice,
	} = req.body
	
    if(!orderItems || orderItems.length === 0) {
        throw new ErrorResponse('No order items', 400)
    } else {
        const order = new Order({
			orderItems,
            user: req.user._id,
			shippingAddress,
			paymentMethod,
			itemsPrice,
			taxPrice,
			shippingPrice,
			totalPrice,
		})

        const createdOrder = await order.save()
        res.status(201).json(createdOrder)
    }
})


// @desc    Get order by id
// @route   GET /api/orders/:id
// @access  Private
export const getOrderById = asyncHandler(async (req, res) => {
	const order = await Order.findById(req.params.id).populate('user', 'name email')

	if(order) {
		res.status(200).json(order)
	} else {
		throw new ErrorResponse('Order not found', 404)
	}
})


// @desc   	Update order to paid
// @route   GET /api/orders/:id/pay
// @access  Private
export const updateOrderToPaid = asyncHandler(async (req, res) => {
	const order = await Order.findById(req.params.id)

	if(order) {
		order.isPaid = true
		order.paidAt = Date.now()
		const { id, status, update_time, payer } = req.body
		order.paymentResult = {
			id,
			status,
			update_time,
			email_address: payer.email_address
		}

		const updatedOrder = await order.save()
		res.status(200).json(updatedOrder)
	} else {
		throw new ErrorResponse('Order not found', 404)
	}
})


// @desc   	Update order to delivered
// @route   GET /api/orders/:id/deliver
// @access  Private/Admin
export const updateOrderToDelivered = asyncHandler(async (req, res) => {
	const order = await Order.findById(req.params.id)

	if(order) {
		order.isDelivered = true
		order.deliveredAt = Date.now()

		const updatedOrder = await order.save()
		res.status(200).json(updatedOrder)
	} else {
		throw new ErrorResponse('Order not found', 404)
	}
})


// @desc   	Get current user orders
// @route   GET /api/orders/myorders
// @access  Private
export const getMyOrders = asyncHandler(async (req, res) => {
	const orders = await Order.find({ user: req.user._id })

	res.status(200).json(orders)
})


// @desc   	Get all orders
// @route   GET /api/orders
// @access  Private/Admin
export const getAllOrders = asyncHandler(async (req, res) => {
	const orders = await Order.find({ }).populate('user', 'id name')

	res.status(200).json(orders)
})