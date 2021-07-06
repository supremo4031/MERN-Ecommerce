import express from 'express'
import {
    createProduct,
	createProductReview,
	deleteProductById,
	getProductById,
	getProducts,
	getTopProducts,
	updateProductById,
} from '../controllers/productController.js'
import { admin, protect } from '../middlewares/authMiddleware.js'
const router = express.Router()

router.route('/').get(getProducts).post(protect, admin, createProduct)
router.route('/top').get(getTopProducts)
router.route('/:id/reviews').post(protect, createProductReview)
router
	.route('/:id')
	.get(getProductById)
	.delete(protect, admin, deleteProductById)
	.patch(protect, admin, updateProductById)

export default router
