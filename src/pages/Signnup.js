import { Avatar, Box } from '@mui/material';
import React, { useEffect } from 'react';
import LockClockOutlined from '@mui/icons-material/LockClockOutlined';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { userSignUpAction } from '../redux/actions/userAction';
import { useNavigate } from 'react-router-dom';
import MenuItem from '@mui/material/MenuItem';

const validationSchema = yup.object({
    firstName: yup
        .string('Enter your first name')
        .required('First name is required'),
    lastName: yup
        .string('Enter your last name')
        .required('last name is required'),
    email: yup
        .string('Enter your email')
        .email('Enter a valid email')
        .required('Email is required'),
    password: yup
        .string('Enter your password')
        .min(8, 'Password should be of minimum 8 characters length')
        .required('Password is required'),
    role: yup
        .number('Select your role')
        .oneOf([0, 1], 'Invalid role')
        .required('Role is required')
});

const Signnup = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isAuthenticated, userInfo } = useSelector(state => state.signUp);

    useEffect(() => {
        // If the user successfully signs up, redirect to the login page
        if (isAuthenticated) {
            navigate('/login');
        }
    }, [isAuthenticated, navigate]);

    const formik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            role:''
            
        },
        validationSchema: validationSchema,
        onSubmit: (values, actions) => {
            dispatch(userSignUpAction(values));
            actions.resetForm();
        }
    });

    return (
        <>
            {/* <Navbar /> */}
            <Box sx={{ height: '81vh', display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Box onSubmit={formik.handleSubmit} component="form" className='form_style border-style'>
                    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%" }}>
                        <Avatar sx={{ m: 1, bgcolor: "primary.main", mb: 3 }}>
                            <LockClockOutlined />
                        </Avatar>
                        <TextField
                            sx={{ mb: 3 }}
                            fullWidth
                            id="firstName"
                            label="First Name"
                            name='firstName'
                            InputLabelProps={{
                                shrink: true,
                            }}
                            placeholder="First Name"
                            value={formik.values.firstName}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                            helperText={formik.touched.firstName && formik.errors.firstName}
                        />
                        <TextField
                            sx={{ mb: 3 }}
                            fullWidth
                            id="lastName"
                            label="Last Name"
                            name='lastName'
                            InputLabelProps={{
                                shrink: true,
                            }}
                            placeholder="Last Name"
                            value={formik.values.lastName}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                            helperText={formik.touched.lastName && formik.errors.lastName}
                        />
                        <TextField
                            sx={{ mb: 3 }}
                            fullWidth
                            id="email"
                            label="E-mail"
                            name='email'
                            InputLabelProps={{
                                shrink: true,
                            }}
                            placeholder="E-mail"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.email && Boolean(formik.errors.email)}
                            helperText={formik.touched.email && formik.errors.email}
                        />
                        <TextField
                            sx={{ mb: 3 }}
                            fullWidth
                            id="password"
                            name="password"
                            label="Password"
                            type="password"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            placeholder="Password"
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.password && Boolean(formik.errors.password)}
                            helperText={formik.touched.password && formik.errors.password}
                        />
                        <TextField
                            sx={{ mb: 3 }}
                            select
                            fullWidth
                            id="role"
                            name="role"
                            label="Role"
                            value={formik.values.role}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.role && Boolean(formik.errors.role)}
                            helperText={formik.touched.role && formik.errors.role}
                            >
                                <MenuItem value={0}>User</MenuItem>
                                <MenuItem value={1}>Admin</MenuItem>
                            </TextField>
                        
                        <Button fullWidth variant="contained" type='submit'>Sign Up</Button>
                    </Box>
                </Box>
            </Box>
            
            {/* <Footer /> */}
        </>
    );
};
export default Signnup
