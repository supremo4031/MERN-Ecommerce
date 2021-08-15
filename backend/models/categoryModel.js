import mongoose from 'mongoose'
import { reqNum, reqString } from './types.js'

const categorySchema = mongoose.Schema(
	{
		name: reqString,
		image: reqString,
		type: reqString,
        level: reqNum,
		filter_options: reqString,  // will be ObjectId type
        subcategories: [{
            type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: 'Category',
        }]
	},
	{
		timestamps: true,
	}
)

const Category = mongoose.model('Category', categorySchema)
export default Category
