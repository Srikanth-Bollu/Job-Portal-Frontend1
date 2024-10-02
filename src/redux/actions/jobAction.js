import axios from 'axios';
import { JOB_LOAD_FAIL, 
    JOB_LOAD_REQUEST, 
    JOB_LOAD_SINGLE_FAIL, 
    JOB_LOAD_SINGLE_REQUEST, 
    JOB_LOAD_SINGLE_SUCCESS, 
    JOB_LOAD_SUCCESS 
} from "../constants/jobconstant"


export const jobLoadAction = (pageNumber, keyword = '', cat = '', location = '') => async (dispatch) => {
    dispatch({ type: JOB_LOAD_REQUEST });
    try {
        const { data } = await axios.get(`https://job-portal-application-backend1.onrender.com/api/jobs/show/?pageNumber=${pageNumber}&keyword=${keyword}&cat=${cat}&location=${location}`)
        dispatch({
            type: JOB_LOAD_SUCCESS,
            payload: data
        });
    } catch (error) {
        dispatch({
            type: JOB_LOAD_FAIL,
            payload: error.response.data.error
        });
    }
}

// single job action

export const jobLoadSingleAction = (id) => async (dispatch) => {
    dispatch({ type: JOB_LOAD_SINGLE_REQUEST });
    try {
        const { data } = await axios.get(`https://job-portal-application-backend1.onrender.com/api/job/${id}`)
        dispatch({
            type: JOB_LOAD_SINGLE_SUCCESS,
            payload: data
        });
    } catch (error) {
        dispatch({
            type: JOB_LOAD_SINGLE_FAIL,
            payload: error.response.data.error
        });
    }
}