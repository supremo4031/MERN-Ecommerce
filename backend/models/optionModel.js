import mongoose from 'mongoose'
import { reqString } from './types.js'

const optionSchema = mongoose.Schema(
	{
		name: reqString,
		choices: [{
            type: Object
        }],
        checker: reqString
	},
	{
		timestamps: true,
	}
)

const Option = mongoose.model('Option', optionSchema)
export default Option
