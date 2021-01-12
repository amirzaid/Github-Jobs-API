import React, { useState } from 'react'
import { Card, Button, Collapse, Badge } from 'react-bootstrap'
import ReactMarkdown from "react-markdown"

export default function Jobs({ job }) {
    const [open, setOpen] = useState(false)

    return (
        <div>
            < Card key={job.id} className='mb-3' >
                <Card.Body className='d-flex justify-content-between'>
                    <div>
                        <Card.Title>
                            {job.title}
                        </Card.Title>
                        <Card.Subtitle className='mb-3'>
                            {job.location}
                        </Card.Subtitle>
                        <div style={{ wordBreak: 'break-all' }}>
                            <ReactMarkdown children={job.how_to_apply} allowDangerousHtml='true'></ReactMarkdown>
                        </div>
                        <Badge className='bg-secondary mb-2'>{job.type}</Badge>
                        <Card.Text>
                            <Button variant="primary" onClick={() => setOpen(!open)}>{open ? 'Hide' : 'Show'} Description</Button>
                            <Collapse in={open}>
                                <div className='mt-3'>
                                    <ReactMarkdown children={job.description} allowDangerousHtml={true} />
                                </div>
                            </Collapse>
                        </Card.Text>
                    </div>
                    <img className='d-none d-md-block' height='50' src={job.company_logo}></img>
                </Card.Body>
            </Card >
        </div >
    )
}
