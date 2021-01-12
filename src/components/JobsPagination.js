import React from 'react'
import { Pagination } from 'react-bootstrap'

export default function JobsPagination({ page, setPage, jobsLength, hasNextPage }) {
    return (
        <div>
            {jobsLength > 0 && <Pagination>
                {page > 2 && <Pagination.First onClick={() => setPage(1)} />}
                {page > 1 && < Pagination.Item key={page - 1} activeLabel='' onClick={() => setPage(page - 1)}>{page - 1}</Pagination.Item>}
                <Pagination.Item key={page} active activeLabel=''>{page}</Pagination.Item>
                {hasNextPage && <Pagination.Item key={page + 1} activeLabel='' onClick={() => setPage(page + 1)}>{page + 1}</Pagination.Item>}
                {hasNextPage && <Pagination.Next activeLabel='' onClick={() => setPage(page + 1)} />}
            </Pagination >}
        </div>
    )
}
