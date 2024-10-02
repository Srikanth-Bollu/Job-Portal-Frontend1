import axios from 'axios';
import { toast } from 'react-toastify';
import { 
    ALL_USER_LOAD_FAIL,
    ALL_USER_LOAD_REQUEST,
    ALL_USER_LOAD_SUCCESS,
    USER_APPLY_JOB_FAIL,
    USER_APPLY_JOB_REQUEST,
    USER_APPLY_JOB_SUCCESS,
    USER_LOAD_FAIL, 
    USER_LOAD_REQUEST, 
    USER_LOAD_SUCCESS, 
    USER_LOGOUT_FAIL, 
    USER_LOGOUT_REQUEST, 
    USER_LOGOUT_SUCCESS, 
    USER_SIGNIN_FAIL, 
    USER_SIGNIN_REQUEST, 
    USER_SIGNIN_SUCCESS, 
    USER_SIGNUP_FAIL, 
    USER_SIGNUP_REQUEST,
    USER_SIGNUP_SUCCESS
} from '../constants/userConstant';



export const userSignInAction = (user) => async (dispatch) => {
    dispatch({ type: USER_SIGNIN_REQUEST });
    try {
        const { data } = await axios.post("https://job-portal-application-backend1.onrender.com/api/signin", user);
        localStorage.setItem('userInfo', JSON.stringify(data));
        dispatch({
            type: USER_SIGNIN_SUCCESS,
            payload: data
        });
        toast.success("Login Successfully")
    } catch (error) {
        dispatch({
            type: USER_SIGNIN_FAIL,
            payload: error.response.data.error
        });
        toast.error(error.response.data.error)
    }
}


export const userLogoutAction = (user) => async (dispatch) => {
    dispatch({ type: USER_LOGOUT_REQUEST });
    try {
        const { data } = await axios.get("https://job-portal-application-backend1.onrender.com/api/logout");
        localStorage.removeItem('userInfo');
        dispatch({
            type: USER_LOGOUT_SUCCESS,
            payload: data
        });
        toast.success("Log out Successfully")
    } catch (error) {
        dispatch({
            type: USER_LOGOUT_FAIL,
            payload: error.response.data.error
        });
        toast.error(error.response.data.error)
    }
}


// USER PROFILE ACTION

export const userProfileAction = (user) => async (dispatch) => {
    dispatch({ type: USER_LOAD_REQUEST });
    try {
        const { data } = await axios.get("https://job-portal-application-backend1.onrender.com/api/me");   
        dispatch({
            type: USER_LOAD_SUCCESS,
            payload: data
        });
        
    } catch (error) {
        dispatch({
            type: USER_LOAD_FAIL,
            payload: error.response.data.error
        });
        
    }
}

//all user action
export const allUserAction = () => async (dispatch) => {
    dispatch({ type: ALL_USER_LOAD_REQUEST });
    try {
        const { data } = await axios.get("https://job-portal-application-backend1.onrender.com/api/allusers");
        dispatch({
            type: ALL_USER_LOAD_SUCCESS,
            payload: data
        });

    } catch (error) {
        dispatch({
            type: ALL_USER_LOAD_FAIL,
            payload: error.response.data.error
        });
    }
}

//user job apply action
export const userApplyJobAction = (job) => async (dispatch) => {
    dispatch({ type: USER_APPLY_JOB_REQUEST });
    try {
        const { data } = await axios.post("https://job-portal-application-backend1.onrender.com/api/user/jobhistory", job);

        dispatch({
            type: USER_APPLY_JOB_SUCCESS,
            payload: data
        });
        toast.success("Apply Successfully for this Job!");
    } catch (error) {
        dispatch({
            type: USER_APPLY_JOB_FAIL,
            payload: error.response.data.error
        });
        toast.error(error.response.data.error);
    }
}


// sign up action

export const userSignUpAction = (userData) => async (dispatch) => {
    try {
        dispatch({ type: USER_SIGNUP_REQUEST });

        // API call to sign-up endpoint
        const response = await fetch('https://job-portal-application-backend1.onrender.com/api/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });

        const data = await response.json();
        dispatch({ type: USER_SIGNUP_SUCCESS, payload: data });

    } catch (error) {
        dispatch({ type: USER_SIGNUP_FAIL, payload: error.message });
    }
};
