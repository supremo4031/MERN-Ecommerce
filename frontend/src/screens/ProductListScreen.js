import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { createProduct, deleteProduct, listProducts } from '../actions/productActions'
import { PRODUCT_CREATE_RESET } from '../constants/productConstants'
import Paginate from '../components/Paginate'

const ProductListScreen = ({ match, history }) => {

	const pageNumber = match.params.pageNumber || 1

	const dispatch = useDispatch()

	const { loading, products, page, pages, error } = useSelector((state) => state.productList)
	const {
		loading: loadingDelete,
		success: successDelete,
		error: errorDelete,
	} = useSelector((state) => state.productDelete)
	const {
		loading: loadingCreate,
		success: successCreate,
		product: createdProduct,
		error: errorCreate,
	} = useSelector((state) => state.productCreate)
	const { userInfo } = useSelector((state) => state.userLogin)

	useEffect(() => {
		dispatch({ type: PRODUCT_CREATE_RESET })
		if (!userInfo.isAdmin) {
			history.replace('/')
		}

		if (successCreate) {
			history.push(`/admin/product/${createdProduct._id}/edit`)
		} else {
			dispatch(listProducts('', pageNumber))
		}
	}, [dispatch, userInfo, history, successDelete, successCreate, createdProduct, pageNumber])

	const deleteProductHandler = (id) => {
		if (window.confirm('Are you sure')) {
			dispatch(deleteProduct(id))
		}
	}

	const createProductHandler = () => {
		dispatch(createProduct())
	}

	return (
		<>
			<Row className="align-items-center">
				<Col>
					<h1>Products</h1>
				</Col>
				<Col className="text-right">
					<Button className="my-3" onClick={createProductHandler}>
						<i className="fas fa-plus" /> Create Product
					</Button>
				</Col>
			</Row>
			<h1>Users</h1>
			{loadingDelete && <Loader />}
			{errorDelete && <Message variant="danger">{errorDelete}</Message>}
			{loadingCreate && <Loader />}
			{errorCreate && <Message variant="danger">{errorCreate}</Message>}
			{loading ? (
				<Loader />
			) : error ? (
				<Message variant="danger">{error}</Message>
			) : (
				<>
					<Table striped bordered hover responsive className="table-sm">
						<thead>
							<tr>
								<th>ID</th>
								<th>NAME</th>
								<th>PRICE</th>
								<th>CATEGORY</th>
								<th>BRAND</th>
								<th></th>
							</tr>
						</thead>
						<tbody>
							{products &&
								products.map((product) => (
									<tr key={product._id}>
										<td>{product._id}</td>
										<td>{product.name}</td>
										<td>${product.price}</td>
										<td>{product.category}</td>
										<td>{product.brand}</td>
										<td>
											<LinkContainer
												to={`/admin/product/${product._id}/edit`}>
												<Button variant="light" className="btn-sm">
													<i className="fas fa-edit" />
												</Button>
											</LinkContainer>
											<Button
												variant="danger"
												className="btn-sm"
												onClick={() => deleteProductHandler(product._id)}>
												<i className="fas fa-trash" />
											</Button>
										</td>
									</tr>
								))}
						</tbody>
					</Table>
					<Paginate page={page} pages={pages} isAdmin={true} />
				</>
			)}
		</>
	)
}

export default ProductListScreen
