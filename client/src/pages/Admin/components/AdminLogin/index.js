import React, { useState } from 'react';
import { Formik, Field, Form } from 'formik';
import axios from 'axios';
import './AdminLogin.css';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { RxCross1 } from 'react-icons/rx';
import { Helmet } from 'react-helmet';
const forgotValidation = Yup.object().shape({
	forgotEmail: Yup.string()
		.matches(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please provide valid email')
		.required('Please provide email')
});
function AdminLogin() {
	const [ forgot, setForgot ] = useState(false);
	return (
		<div className="admin-login">
			<Helmet>
				<meta charSet="utf-8" />
				<title>Admin Login</title>
			</Helmet>
			<div className="login-bg">
				<Formik
					initialValues={{
						email: '',
						password: ''
					}}
					onSubmit={(values) => {
						axios
							.post('https://final-back-nb64-67i2b0g9y-rzayevnicat.vercel.app/login', {
								email: values.email,
								password: values.password
							})
							.then((res) => {
								if (res.data.data.role === 'Admin') {
									sessionStorage.setItem('adminLogin', JSON.stringify(true));
									window.location.reload();
								} else {
									toast.error('Not Admin', {
										position: 'top-center',
										autoClose: 3000,
										hideProgressBar: false,
										closeOnClick: true,
										pauseOnHover: true,
										draggable: true,
										progress: undefined,
										theme: 'dark'
									});
								}
							})
							.catch((error) => {
								toast.error(`${error.response.data.message}`, {
									position: 'top-center',
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
					{({ errors, touched }) => (
						<Form className="admin-login-form">
							<Field name="email" placeholder="Email" type="email" />
							<Field name="password" placeholder="Password" type="password" />
							<p onClick={() => setForgot(true)}>Forgot your password?</p>
							<button style={{ color: 'cyan' }} type="Submit">
								<span>Submit</span>
								<i />
							</button>
						</Form>
					)}
				</Formik>
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
									.post('https://final-back-nb64-67i2b0g9y-rzayevnicat.vercel.app/forgatpassword', {
										email: values.forgotEmail
									})
									.then((res) => {
										toast.success(`${res.data.message}`, {
											position: 'top-center',
											autoClose: 3000,
											hideProgressBar: false,
											closeOnClick: true,
											pauseOnHover: true,
											draggable: true,
											progress: undefined,
											theme: 'dark'
										});
									})
									.catch((error) => {
										toast.error(`${error.response.data.message}`, {
											position: 'top-center',
											autoClose: 3000,
											hideProgressBar: false,
											closeOnClick: true,
											pauseOnHover: true,
											draggable: true,
											progress: undefined,
											theme: 'dark'
										});
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

export default AdminLogin;
