import React, { useEffect, useState } from 'react';
import './Login.css';
import { Link, useNavigate } from 'react-router-dom';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { RxCross1 } from 'react-icons/rx';
import { ToastContainer, toast } from 'react-toastify';
const loginSchema = Yup.object().shape({
	email: Yup.string()
		.matches(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please provide valid email')
		.required('fill input'),
	password: Yup.string().required('fill input').min(6, 'Short password')
});
const forgotValidation = Yup.object().shape({
	forgotEmail: Yup.string()
		.matches(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please provide valid email')
		.required('Please provide email')
});
function Login() {
	const [ user, setUser ] = useState([]);
	const [ forgot, setForgot ] = useState(false);
	useEffect(() => {
		axios.get('http://localhost:3000/users').then((res) => setUser(res.data.data));
	}, []);
	const navigate = useNavigate();
	const handleCreate = () => {
		navigate('sfjsjfkjfksfjkjkfj');
	};
	return (
		<div className="logining">
			<div className="login">
				<h1>Customer Login</h1>
				<div className="login-section-2">
					<h2>Registered Customers</h2>
					<p>If you have an account, sign in with your email address.</p>
					<Formik
						initialValues={{
							email: '',
							password: ''
						}}
						validationSchema={loginSchema}
						onSubmit={(values, { resetForm }) => {
							axios
								.post('http://localhost:3000/login', {
									email: values.email,
									password: values.password
								})
								.then((res) => {
									if (res.data.success === true) {
										user.forEach((element) => {
											if (element.email === res.data.data.email) {
												localStorage.setItem('user', JSON.stringify(element));
												sessionStorage.setItem('userLogin', JSON.stringify(true));
												navigate('/');
												window.location.reload();
											}
										});
									}
								})
								.catch((error) => {
									toast.error(`${error.response.data.message}`, {
										position: 'bottom-right',
										autoClose: 3000,
										hideProgressBar: false,
										closeOnClick: true,
										pauseOnHover: true,
										draggable: true,
										progress: undefined,
										theme: 'dark'
									});
								});
						}}
					>
						{({ errors, touched, values }) => (
							<Form className="form">
								<div className="login-form-group first-input">
									<label htmlFor="email">
										Email <span>*</span>
									</label>
									<Field name="email" type="email" />
									{errors.email && touched.email ? (
										<div className="errors">{errors.email}</div>
									) : null}
								</div>
								<div className="login-form-group">
									<label htmlFor="password">
										PassWord <span>*</span>
									</label>
									<Field name="password" type="password" />
									{errors.password && touched.password ? (
										<div className="errors">{errors.password}</div>
									) : null}
								</div>
								<p className="forgotPassword" onClick={() => setForgot(true)}>
									Forgot Your Password?
								</p>
								<button className="signIn" type="submit">
									SIGN IN
								</button>
							</Form>
						)}
					</Formik>
					<button className="create-account" onClick={handleCreate}>
						CREATE AN ACCOUNT
					</button>
				</div>
			</div>
			{forgot ? (
				<div className="forgot-card-bg">
					<div className="forgot-card">
						<div className="forgot-title">
							<h2>Provide Email</h2>
							<RxCross1 onClick={() => setForgot(false)} />
						</div>
						<Formik
							initialValues={{
								forgotEmail: ''
							}}
							validationSchema={forgotValidation}
							onSubmit={(values) => {
								axios
									.post('http://localhost:3000/forgatpassword', {
										email: values.forgotEmail
									})
									.then((res) => {
										alert(res.data.message);
									})
									.catch((error) => {
										alert(error.response.data.message);
									});
								setForgot(false);
							}}
						>
							{({ values, errors, touched }) => (
								<Form className="form-forgot">
									<div className="forgot-form-group">
										<label>
											Email <span>*</span>
										</label>
										<Field name="forgotEmail" />
										{errors.forgotEmail && touched.forgotEmail ? (
											<div className="err">{errors.forgotEmail}</div>
										) : null}
									</div>
									<button className="reset-link" type="submit">
										Send Reset Link
									</button>
								</Form>
							)}
						</Formik>
					</div>
				</div>
			) : null}
		</div>
	);
}

export default Login;
