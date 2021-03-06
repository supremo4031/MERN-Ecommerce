import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { deleteUser, listUsers } from '../actions/userActions'

const UserListScreen = ({ history }) => {
	const dispatch = useDispatch()

	const { loading, users, error } = useSelector((state) => state.userList)
	const { userInfo } = useSelector((state) => state.userLogin)
	const { success: successDelete } = useSelector((state) => state.userDelete)

	useEffect(() => {
        if(userInfo && userInfo.isAdmin) {
            dispatch(listUsers())
        } else {
            history.replace('/')
        }
	}, [dispatch, userInfo, history, successDelete])

	const deleteUserHandler = (id) => {
		if(window.confirm('Are you sure')) {
			dispatch(deleteUser(id))
		}
	}

	return (
		<>
			<h1>Users</h1>
			{loading ? (
				<Loader />
			) : error ? (
				<Message variant="danger">{error}</Message>
			) : (
				<Table striped bordered hover responsive className="table-sm">
					<thead>
						<tr>
							<th>ID</th>
							<th>NAME</th>
							<th>EMAIL</th>
							<th>ADMIN</th>
							<th></th>
						</tr>
					</thead>
					<tbody>
						{users && users.map((user) => (
							<tr key={user._id}>
								<td>{user._id}</td>
								<td>{user.name}</td>
								<td>
									<a href={`mailto:${user.email}`}>{user.email}</a>
								</td>
								<td>
									{user.isAdmin ? (
										<i className="fas fa-check" style={{ color: 'green' }} />
									) : (
										<i className="fas fa-times" style={{ color: 'red' }} />
									)}
								</td>
								<td>
									<LinkContainer to={`/admin/user/${user._id}/edit`}>
										<Button variant="light" className="btn-sm">
											<i className="fas fa-edit" />
										</Button>
									</LinkContainer>
									<Button
										variant="danger"
										className="btn-sm"
										onClick={() => deleteUserHandler(user._id)}>
										<i className="fas fa-trash" />
									</Button>
								</td>
							</tr>
						))}
					</tbody>
				</Table>
			)}
		</>
	)
}

export default UserListScreen
