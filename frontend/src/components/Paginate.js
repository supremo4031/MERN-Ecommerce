import React from 'react'
import { Pagination } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

const Paginate = ({ pages, page, isAdmin = false, keyword = '' }) => {

    

    const getLink = (x) => {
        let link
		if(isAdmin) link = `/admin/productlist/${x + 1}`
        else {
            link = keyword ? `/search/${keyword}/page/${x + 1}` : `/page/${x + 1}`
        }
        return link
    }

	return (
		pages > 1 && (
			<Pagination>
				{[...Array(pages).keys()].map((x) => (
					<LinkContainer
						key={x + 1}
						to={getLink(x)}>
                            <Pagination.Item active={x + 1 === page }>{x + 1}</Pagination.Item>
                        </LinkContainer>
				))}
			</Pagination>
		)
	)
}

export default Paginate
