import { useEffect, useReducer } from 'react'

const ACTIONS = {
    REQUEST_DATA: 'request-data',
    GET_DATA: 'get-data',
    ERROR: 'error',
    HAS_NEXT_PAGE: 'has_next_page'
}

const BASE_URL = '/positions.json'

function reducer(state, action) {
    switch (action.type) {
        case ACTIONS.REQUEST_DATA:
            return { jobs: [], loading: true }

        case ACTIONS.GET_DATA:
            return { ...state, jobs: action.payload.jobs, loading: false }

        case ACTIONS.ERROR:
            return { ...state, jobs: [], loading: false, error: action.payload.error }

        case ACTIONS.HAS_NEXT_PAGE:
            return action.payload.jobs.length != 0 ? { ...state, hasNextPage: true } : { ...state, hasNextPage: false }
        default:
            return state
    }
}

export default function useFetchJobs(page, params) {
    const [state, dispatch] = useReducer(reducer, { jobs: [], loading: false })
    let searchParams = new URLSearchParams()
    if (params.description != null)
        searchParams.append('description', params.description)
    if (params.location != null)
        searchParams.append('location', params.location)

    useEffect(() => {
        dispatch({ type: ACTIONS.REQUEST_DATA })
        fetch(`${BASE_URL}?page=${page}&${searchParams.toString()}`)
            .then(res => res.json())
            .then(data => dispatch({ type: ACTIONS.GET_DATA, payload: { jobs: data } }))
            .catch(e => {
                dispatch({ type: ACTIONS.ERROR, payload: { error: e } })
            })

        dispatch({ type: ACTIONS.REQUEST_DATA })
        fetch(`${BASE_URL}?page=${page + 1}&${searchParams.toString()}`)
            .then(res => res.json())
            .then(data => dispatch({ type: ACTIONS.HAS_NEXT_PAGE, payload: { jobs: data } }))
            .catch(e => {
                dispatch({ type: ACTIONS.ERROR, payload: { error: e } })
            })

        return
    }, [page, params])

    return state
}