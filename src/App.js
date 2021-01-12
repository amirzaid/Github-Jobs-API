import './App.css';
import { useState } from 'react'
import { Container, Spinner, Alert, FormGroup, Form, Row, Col, Button } from 'react-bootstrap'
import * as  Icon from 'react-bootstrap-icons'
import JobsPagination from './components/JobsPagination';
import useFetchJobs from './components/useFetchJobs'
import Jobs from './components/Jobs';

function App() {
  const [page, setPage] = useState(1)
  const [params, setParams] = useState({})
  const { jobs, loading, error, hasNextPage } = useFetchJobs(page, params);

  const searchHandler = (e) => {
    e.preventDefault()
    setParams({
      ...params,
      description: document.querySelector('#description').value,
      location: document.querySelector('#location').value
    })
  }

  // Scroll to top handlers
  const scroll_btn = document.querySelector('#scroll-btn')

  window.onscroll = () => scrollFunction()

  const scrollFunction = () => {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
      scroll_btn.classList.remove('hide')
      scroll_btn.classList.add('show')
    }
    else {
      scroll_btn.classList.remove('show')
      scroll_btn.classList.add('hide')
    }

  }

  const backToTop = () => {
    document.body.scrollTop = 0
    document.documentElement.scrollTop = 0
  }

  // end scroll to top handlers

  return (
    <Container className='my-4'>
      <h1 className='mb-4'>
        <Icon.Github />
        <span className='ms-2 align-middle'>GitHub Jobs</span>
      </h1>
      <Form className='mb-3'>
        <FormGroup>
          <Row>
            <Col className=''>
              <Form.Label>Description</Form.Label>
              <Form.Control type='text' id='description' placeholder='Enter Description...'></Form.Control>
            </Col>
            <Col className=''>
              <Form.Label>Location</Form.Label>
              <Form.Control type='text' id='location' placeholder='Location...'></Form.Control>
            </Col>
            <Col className='align-self-end' xs='auto'>
              <Button onClick={searchHandler} type="submit">Search</Button>
            </Col>
          </Row>
        </FormGroup>
      </Form>
      <JobsPagination name='top-pagination' page={page} setPage={setPage} jobsLength={jobs.length} hasNextPage={hasNextPage} ></JobsPagination>
      {
        loading && <Spinner className='mb-3 mt-2' animation='border' role='status'>
        </Spinner>
      }
      {
        error && <Alert variant="danger">
          <Alert.Heading className='ms-2 align-middle'>
            <Icon.ExclamationTriangle />
            <span className='ms-2 align-middle'>
              Oh snap! You got an error!
          </span>
          </Alert.Heading>
          <span>Try refreshing.</span>
        </Alert>
      }
      {
        jobs.map(job => (
          <Jobs job={job}></Jobs>
        ))
      }
      <JobsPagination name='bottom-pagination' page={page} setPage={setPage} hasNextPage={hasNextPage} ></JobsPagination>
      <Button id='scroll-btn' onClick={backToTop}>
        <Icon.ChevronUp />
      </Button>
    </Container >
  );
}

export default App;
