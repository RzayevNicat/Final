import React, { useEffect, useState } from 'react';
import './Login.css';
import { Link, useNavigate } from 'react-router-dom';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
const loginSchema = Yup.object().shape({
	email: Yup.string()
		.matches(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please provide valid email')
		.required('fill input'),
	password: Yup.string().required('fill input').min(6, 'Short password')
});
function Login() {
	const [ user, setUser ] = useState([]);

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
									alert(error.response.data.message);
								});
							console.log(values);
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
		</div>
	);
}

export default Login;
