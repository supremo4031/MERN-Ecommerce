import express from 'express'
import {
	deleteUser,
	getUserById,
	getUserProfile,
	getUsers,
	loginUser,
	registerUser,
	updateUserById,
	updateUserProfile,
} from '../controllers/userController.js'
import { protect, admin } from '../middlewares/authMiddleware.js'
const router = express.Router()

router.route('/').post(registerUser).get(protect, admin, getUsers)
router.route('/login').post(loginUser)
router.route('/profile').get(protect, getUserProfile).patch(protect, updateUserProfile)
router
	.route('/:id')
	.delete(protect, admin, deleteUser)
	.get(protect, admin, getUserById)
	.patch(protect, admin, updateUserById)

export default router
