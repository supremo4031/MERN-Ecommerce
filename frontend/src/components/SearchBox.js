import React, { useState } from 'react'
import { Row, Col, Form, Button } from 'react-bootstrap'

const SearchBox = ({ history }) => {
	const [keyword, setKeyword] = useState('')

	const submitHandler = (e) => {
        e.preventDefault()
        if(keyword.trim()) {
            history.push(`/search/${keyword}`)
        } else {
            history.push('/')
        }
    }

	return (
		<>
			<Form onSubmit={submitHandler} inline>
				<Row>
					<Col sm={10}>
						<Form.Control
							type="text"
							name="q"
							onChange={(e) => setKeyword(e.target.value)}
							className="mr-sm-2 ml-sm-5"
							placeholder="Search Products..."></Form.Control>
					</Col>
					<Col sm={2}>
						<Button type="submit" variant="outline-success" className="p-2">
							Search
						</Button>
					</Col>
				</Row>
			</Form>
		</>
	)
}

export default SearchBox
