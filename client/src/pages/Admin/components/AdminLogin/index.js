import React from 'react';
import { Formik, Field, Form } from 'formik';
import axios from 'axios';
import './AdminLogin.css';
function AdminLogin() {
	return (
		<div className="admin-login">
			<Formik
				initialValues={{
					email: '',
					password: ''
				}}
				onSubmit={(values) => {
					axios
						.post('http://localhost:3000/login', {
							email: values.email,
							password: values.password
						})
						.then((res) => {
							if (res.data.data.role === 'Admin') {
								sessionStorage.setItem('adminLogin', JSON.stringify(true));
								window.location.reload();
							} else {
								alert('Not Admin');
							}
						})
						.catch((error) => {
							// toast.error(`${error.response.data.message}`, {
							// 	position: 'bottom-right',
							// 	autoClose: 3000,
							// 	hideProgressBar: false,
							// 	closeOnClick: true,
							// 	pauseOnHover: true,
							// 	draggable: true,
							// 	progress: undefined,
							// 	theme: 'dark'
							// });
							alert(`${error.response.data.message}`);
						});
				}}
			>
				{({ errors, touched }) => (
					<Form className="admin-login-form">
						<Field name="email" placeholder="Email" type="email" />
						<Field name="password" placeholder="Password" type="password" />
						<button type="submit">Submit</button>
					</Form>
				)}
			</Formik>
		</div>
	);
}

export default AdminLogin;
