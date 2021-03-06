import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { listProductDetails, updateProduct } from '../actions/productActions'
import { PRODUCT_UPDATE_RESET } from '../constants/productConstants'
import axios from 'axios'

const ProductEditScreen = ({ match, history }) => {
	const firstUpdate = useRef(true)

	const productId = match.params.id

	const [name, setName] = useState('')
	const [price, setPrice] = useState(0)
	const [brand, setBrand] = useState('')
	const [category, setCategory] = useState('')
	const [image, setImage] = useState('')
	const [countInStock, setCountInStock] = useState('')
	const [description, setDescription] = useState('')
	const [uploading, setUploading] = useState(false)

	const dispatch = useDispatch()
	const { loading, error, product } = useSelector((state) => state.productDetails)
	const {
		loading: loadingUpdate,
		error: errorUpdate,
		success: successUpdate,
	} = useSelector((state) => state.productUpdate)

	useEffect(() => {
		if (successUpdate) {
			dispatch({ type: PRODUCT_UPDATE_RESET })
			history.push('/admin/productlist')
		} else {
			if (!product.name || product._id !== productId || firstUpdate.current) {
				dispatch(listProductDetails(productId))
				firstUpdate.current = false
			} else {
				setName(product.name)
				setPrice(product.price)
				setBrand(product.brand)
				setImage(product.image)
				setCategory(product.category)
				setCountInStock(product.countInStock)
				setDescription(product.description)
			}
		}
	}, [productId, dispatch, product, successUpdate, history])

	const submitHandler = (e) => {
		e.preventDefault()
		dispatch(
			updateProduct({
				_id: productId,
				name,
				brand,
				category,
				image,
				description,
				countInStock,
			})
		)
	}

	const uploadFileHandler = async (e) => {
		const file = e.target.files[0]
		const formdata = new FormData()
		formdata.append('image', file)
		setUploading(true)

		try {
			const config = {
				headers: {
					'Content-Type': 'multipart/form-data'
				}
			}

			const { data } = await axios.post(`/api/upload`, formdata, config)

			setImage(data)
			setUploading(false)
		} catch (error) {
			setUploading(false)
		}
	}

	return (
		<>
			<Link to="/admin/productlist" className="btn btn-light my-3">
				Go back
			</Link>
			<FormContainer>
				<h1>Edit Product</h1>
				{loadingUpdate && <Loader />}
				{errorUpdate && <Message variant="danger">{errorUpdate}</Message>}
				{loading ? (
					<Loader />
				) : error ? (
					<Message variant="danger">{error}</Message>
				) : (
					<Form onSubmit={submitHandler}>
						<Form.Group controlId="name">
							<Form.Label>Name</Form.Label>
							<Form.Control
								type="name"
								placeholder="Enter name"
								value={name}
								onChange={(e) => setName(e.target.value)}></Form.Control>
						</Form.Group>

						<Form.Group controlId="price">
							<Form.Label>Price</Form.Label>
							<Form.Control
								type="number"
								placeholder="Enter price"
								value={price}
								onChange={(e) => setPrice(e.target.value)}></Form.Control>
						</Form.Group>

						<Form.Group controlId="image">
							<Form.Label>Image</Form.Label>
							<Form.Control
								type="text"
								placeholder="Enter image"
								value={image}
								onChange={(e) => setImage(e.target.value)}></Form.Control>
							<Form.File
								id="image-file"
								label="Choose file"
								custom
								onChange={uploadFileHandler}></Form.File>
							{uploading && <Loader/>}
						</Form.Group>

						<Form.Group controlId="brand">
							<Form.Label>Brand</Form.Label>
							<Form.Control
								type="text"
								placeholder="Enter brand"
								value={brand}
								onChange={(e) => setBrand(e.target.value)}></Form.Control>
						</Form.Group>

						<Form.Group controlId="category">
							<Form.Label>Category</Form.Label>
							<Form.Control
								type="text"
								placeholder="Enter category"
								value={category}
								onChange={(e) => setCategory(e.target.value)}></Form.Control>
						</Form.Group>

						<Form.Group controlId="countInStock">
							<Form.Label>countInStock</Form.Label>
							<Form.Control
								type="number"
								placeholder="Enter countInStock"
								value={countInStock}
								onChange={(e) => setCountInStock(e.target.value)}></Form.Control>
						</Form.Group>

						<Form.Group controlId="description">
							<Form.Label>Description</Form.Label>
							<Form.Control
								type="text"
								placeholder="Enter description"
								value={description}
								onChange={(e) => setDescription(e.target.value)}></Form.Control>
						</Form.Group>

						<Button type="submit" variant="primary">
							update
						</Button>
					</Form>
				)}
			</FormContainer>
		</>
	)
}

export default ProductEditScreen
