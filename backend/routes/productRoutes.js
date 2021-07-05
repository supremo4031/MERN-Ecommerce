import express from 'express'
import {
    createProduct,
	deleteProductById,
	getProductById,
	getProducts,
	updateProductById,
} from '../controllers/productController.js'
import { admin, protect } from '../middlewares/authMiddleware.js'
const router = express.Router()

router.route('/').get(getProducts).post(protect, admin, createProduct)
router
	.route('/:id')
	.get(getProductById)
	.delete(protect, admin, deleteProductById)
	.patch(protect, admin, updateProductById)

export default router
