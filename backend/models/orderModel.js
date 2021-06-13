import mongoose from 'mongoose'
import { reqDefBool, reqDefDouble, reqDefNum, reqNum, reqString } from './types.js'

const orderSchema = mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: 'User',
		},
		orderItems: [
			{
				name: reqString,
				qty: reqNum,
				image: reqString,
				price: reqDefNum,
				product: {
					type: mongoose.Schema.Types.ObjectId,
					required: true,
					ref: 'Product',
				},
			},
		],
		shippingAddress: {
			address: reqString,
			city: reqString,
			postalCode: reqString,
			country: reqString,
		},
		paymentMethod: reqString,
		paymentResult: {
			id: String,
			status: String,
			update_time: String,
			email_address: String,
		},
		taxPrice: reqDefDouble,
		shippingPrice: reqDefDouble,
		totalPrice: reqDefDouble,
		isPaid: reqDefBool,
		paidAt: Date,
		isDelivered: reqDefBool,
		deliveredAt: Date
	},
	{
		timestamps: true,
	}
)

const Order = mongoose.model('Order', orderSchema)
export default Order
