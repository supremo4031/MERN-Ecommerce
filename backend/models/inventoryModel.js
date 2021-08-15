import mongoose from 'mongoose'
import { reqDefBool, reqDefNum, reqString } from './types.js'

const inventorySchema = mongoose.Schema(
	{
		product: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: 'Product',
		},
		seller: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: 'User',
		},
		seller_pincode: reqString,
		stock: reqDefNum,
		available: reqDefBool
	},
	{
		timestamps: true,
	}
)

const Inventory = mongoose.model('Inventory', inventorySchema)
export default Inventory
