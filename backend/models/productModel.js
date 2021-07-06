import mongoose from 'mongoose'
import { reqDefNum, reqNum, reqString } from './types.js'

const reviewSchema = mongoose.Schema(
	{
		name: reqString,
		rating: reqNum,
		comment: reqString,
		user: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: 'User',
		},
	},
	{
		timestamps: true,
	}
)

const productSchema = mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: 'User',
		},
		name: reqString,
		image: reqString,
		brand: reqString,
		category: reqString,
		description: reqString,
        reviews: [reviewSchema],
		rating: reqDefNum,
		numReviews: reqDefNum,
		price: reqDefNum,
		countInStock: reqDefNum,
	},
	{
		timestamps: true,
	}
)

const Product = mongoose.model('Product', productSchema)
export default Product
