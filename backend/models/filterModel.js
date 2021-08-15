import mongoose from 'mongoose'
import { reqString } from './types.js'

const filterSchema = mongoose.Schema(
	{
		name: reqString,
		options: [{
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Option',
		}],
	},
	{
		timestamps: true,
	}
)

const Filter = mongoose.model('Filter', filterSchema)
export default Filter
