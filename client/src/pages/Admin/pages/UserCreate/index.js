import React from 'react';
import axios from 'axios';
import { Formik, Form, Field } from 'formik';
import './UserCreate.css';
import { Button } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import '../../../../../node_modules/react-toastify/dist/ReactToastify.css';
import { Helmet } from 'react-helmet';
function UserCreate() {
	return (
		<div className="user-create">
			<Helmet>
				<meta charSet="utf-8" />
				<title>User Create</title>
			</Helmet>
			<ToastContainer
				position="bottom-right"
				autoClose={5000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				theme="dark"
			/>
			<h1>User Create</h1>
			<Formik
				initialValues={{
					name: '',
					surname: '',
					email: '',
					password: '',
					gender: '',
					role: '',
					src: '',
					options: false
				}}
				onSubmit={(values) => {
					axios
						.post('https://final-back-nb64-67i2b0g9y-rzayevnicat.vercel.app/auth', values)
						.then((res) => {
							if (res.data.success === true) {
								toast.success('Added User!', {
									position: 'bottom-right',
									autoClose: 5000,
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
							toast.warn(`${error.response.data.message}`, {
								position: 'bottom-right',
								autoClose: 5000,
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
				{({ values }) => (
					<Form className="user-create-form">
						<div className="create-form-group">
							<div>
								<label>Name</label>
								<Field id="outlined-basic" required name="name" />
							</div>
							<div>
								<label>Surname</label>
								<Field id="outlined-basic" required name="surname" />
							</div>
						</div>
						<div className="create-form-group">
							<div>
								<label>Email</label>
								<Field id="outlined-basic" required name="email" type="email" />
							</div>
							<div>
								<label>Password</label>
								<Field id="outlined-basic" required name="password" type="password" />
							</div>
						</div>
						<div className="create-form-group">
							<div>
								<label>Role</label>
								<Field id="outlined-basic" required name="role" />
							</div>
							<div>
								<label>IMG</label>
								<Field id="outlined-basic" required name="src" />
							</div>
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
						<Button disabled={values.options === true ? false : true} type="submit">
							Submit
						</Button>
					</Form>
				)}
			</Formik>
		</div>
	);
}

export default UserCreate;
