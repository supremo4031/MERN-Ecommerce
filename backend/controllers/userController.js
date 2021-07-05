import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'
import ErrorResponse from '../utils/ErrorResponse.js'
import generateToken from '../utils/generateToken.js'

// @desc    Register new user
// @route   POST /api/users
// @access  Public
export const registerUser = asyncHandler(async (req, res) => {
	const { name, email, password } = req.body

    const userExists = await User.findOne({email})
    if(userExists) {
        throw new ErrorResponse('User already exists', 400)
    }

    const user = await User.create({
        name,
        email,
        password
    })

    if(user) {
        res.status(200).json({
			_id: user._id,
			name: user.name,
			email: user.email,
			isAdmin: user.isAdmin,
			token: generateToken(user._id),
		})
    } else {
        throw new ErrorResponse('Invalid user data', 400)
    }
})

// @desc    Auth user and get token
// @route   POST /api/users/login
// @access  Public
export const loginUser = asyncHandler(async (req, res) => {
	const { email, password } = req.body
    const user = await User.findOne({email})
    if(user && (await user.matchPassword(password))) {
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id)
        })
    } else {
        throw new ErrorResponse('Invalid email or password', 401);
    }
})


// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
export const getUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id)
    if(user) {
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin
        })
    } else {
        throw new ErrorResponse('User not found', 404);
    }
})


// @desc    Update user profile
// @route   PATCH /api/users/profile
// @access  Private
export const updateUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id)

    if(user) {
        const { name, email, password } = req.body
        user.name = name || user.name
		user.email = email || user.email
		password ? user.password = password : null
        const updatedUser = await user.save()
        res.status(200).json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
            token: generateToken(updatedUser._id)
        })
    } else {
        throw new ErrorResponse('User not found', 404);
    }
})


// @desc    Get all users
// @route   GET /api/users
// @access  Private/Admin
export const getUsers = asyncHandler(async (req, res) => {
    const users = await User.find({})
    res.status(200).json(users)
})

// @desc    Get user by id
// @route   GET /api/users/:id
// @access  Private/Admin
export const getUserById = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id).select('-password')
    if(user) {
        res.status(200).json(user)
    } else {
        throw new ErrorResponse('No user found with the id', 404)
    }
})

// @desc    Update user by id
// @route   PATCH /api/users/:id
// @access  Private/Admin
export const updateUserById = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id)

    if(user) {
        const { name, email, isAdmin } = req.body
        user.name = name || user.name
		user.email = email || user.email
        user.isAdmin = isAdmin
        const updatedUser = await user.save()
        res.status(200).json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin
        })
    } else {
        throw new ErrorResponse('User not found', 404);
    }
})

// @desc    Delete user
// @route   DELETE /api/users
// @access  Private/Admin
export const deleteUser = asyncHandler(async (req, res) => {
    const user = await User.findByIdAndDelete(req.params.id)
    res.status(200).json({ message: 'User removed' })
})
