


export const reqString = {
    type: String,
    required: true
}

export const unReqString = {
    type: String,
    required: true,
    unique: true
}

export const reqDefBool = {
    type: Boolean,
    required: true,
    default: false
}

export const reqDefNum = {
	type: Number,
	required: true,
	default: 0,
}

export const reqDefDouble = {
	type: Number,
	required: true,
	default: 0.0,
}

export const reqNum = {
	type: Number,
	required: true,
}