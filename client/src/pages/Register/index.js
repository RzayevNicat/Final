import axios from 'axios';
import { Formik, Form, Field } from 'formik';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { Helmet } from 'react-helmet';
import './Register.css';
function Register() {
	const [ black, setBlack ] = useState('black');
	const navigate = useNavigate();
	const listenScrollEvent = () => {
		window.scrollY > 10 ? setBlack('black') : setBlack('black');
	};
	useEffect(() => {
		window.addEventListener('scroll', listenScrollEvent);
		return () => {
			window.removeEventListener('scroll', listenScrollEvent);
		};
	}, []);
	return (
		<div className="register">
			<Helmet>
				<meta charSet="utf-8" />
				<title>Register</title>
			</Helmet>
			<div className={black} />
			<ToastContainer
				position="top-right"
				autoClose={3000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				theme="light"
			/>
			{/* Same as */}
			<ToastContainer />
			<div className="registered">
				<h1>Customer Register</h1>
				<div className="registered-section-2">
					<h2>Registered Customers</h2>
					<p>If you have an account, sign in with your email address.</p>
					<Formik
						initialValues={{
							name: '',
							surname: '',
							email: '',
							gender: '',
							password: '',
							options: false
						}}
						onSubmit={(values) => {
							let user = {
								name: values.name,
								surname: values.surname,
								email: values.email,
								gender: values.gender,
								password: values.password,
								options: values.options,
								userCheckOut: [],
								userWishlist: [],
								userCard: []
							};
							axios
								.post('https://final-back-nb64-67i2b0g9y-rzayevnicat.vercel.app/auth', user)
								.then((res) => {
									if (res.status === 200) {
										sessionStorage.setItem('userLogin', JSON.stringify(false));

										navigate('/profile');
										window.location.reload();
									}
								})
								.catch((error) => {
									if (error.response.status === 500) {
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
									}
								});
							axios.get('https://final-back-nb64-67i2b0g9y-rzayevnicat.vercel.app/users').then((res) => {
								res.data.data.forEach((element) => {
									if (element.email === values.email) {
										localStorage.setItem('user', JSON.stringify(element));
									}
								});
							});
						}}
					>
						{({ errors, touched, values }) => (
							<Form className="form-register">
								<div className="register-form-name">
									<div className="register-name">
										<label>
											Name <span>*</span>
										</label>
										<Field name="name" type="text" />
									</div>
									<div className="register-surname">
										<label>
											Surname <span>*</span>
										</label>
										<Field name="surname" type="text" />
									</div>
								</div>
								<div className="register-form-group">
									<label>
										Email <span>*</span>
									</label>
									<Field name="email" type="email" />
								</div>
								<div className="register-form-group">
									<label>
										Password <span>*</span>
									</label>
									<Field name="password" type="password" />
								</div>
								<div className="register-gender">
									<div className="genderr">
										<label>Man</label>
										<Field type="radio" name="gender" value="Man" />
									</div>
									<div className="genderr">
										<label>Woman</label>
										<Field type="radio" name="gender" value="Woman" />
									</div>
								</div>
								<div className="register-form-check">
									<Field type="checkbox" name="options" />
									<label>Accept All Options</label>
								</div>
								<button
									disabled={!values.options}
									type="Submit"
									style={{ opacity: values.options === false ? '0.5' : '1' }}
								>
									Create
								</button>
							</Form>
						)}
					</Formik>
				</div>
			</div>
		</div>
	);
}

export default Register;
