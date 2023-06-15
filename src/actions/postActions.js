import api from '../api'

import {
    POST_LIST_REQUEST,
    POST_LIST_SUCCESS,
    POST_LIST_FAIL
} from '../constants/postConstants'

// import { useSelector, useDispatch } from 'react-redux'


export const listPosts = () => async (dispatch) => {
    try {
        dispatch({ type: POST_LIST_REQUEST })


        const userInfo = JSON.parse(localStorage.getItem('userInfo'))

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await api.get(
            '/api/posts/feed/',
            config
        )

        dispatch({
            type: POST_LIST_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: POST_LIST_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

