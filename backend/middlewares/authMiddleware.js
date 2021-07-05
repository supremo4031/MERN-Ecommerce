import asyncHandler from 'express-async-handler'
import jwt from 'jsonwebtoken'
import User from '../models/userModel.js'
import ErrorResponse from '../utils/ErrorResponse.js'

export const protect = asyncHandler(async (req, res, next) => {
	let token,
		auth = req.headers.authorization
    console.log(auth);
	if (auth && auth.startsWith('jwt')) {
		try {
			token = auth.split(' ')[1]
			const decoded = jwt.verify(token, process.env.JWT_SECRET)
			req.user = await User.findById(decoded.id).select('-password')
			next()
		} catch (err) {
			throw new ErrorResponse('Unauthorized user', 401)
		}
	}

	if (!token) {
		throw new ErrorResponse('Unauthorized user', 401)
	}
})

export const admin = (req, res, next) => {
	if(req.user && req.user.isAdmin) {
		next()
	} else {
		throw new ErrorResponse('Not authorized as admin', 401)
	}
}
