import React from 'react';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import './ResetPassword.css';
import { BsCheck } from 'react-icons/bs';
import { ToastContainer, toast } from 'react-toastify';
import { Helmet } from 'react-helmet';
const newPasswordValid = Yup.object().shape({
	password: Yup.string().min(6, 'Short Password').required('Please provide New Password'),
	newPassword: Yup.string().min(6, 'Short Password').required('Please provide New Password')
});
function ResetPassword() {
	const { token } = useParams();

	const [ check, setCheck ] = useState(false);

	return (
		<div className="reset-pass-page">
			<Helmet>
				<meta charSet="utf-8" />
				<title>Reset Password</title>
			</Helmet>
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
			{check ? (
				<div className="success">
					<BsCheck className="icon-success" />
					<p>Password Updated!!!</p>
				</div>
			) : (
				<div className="reset-bg">
					<Formik
						initialValues={{
							password: '',
							newPassword: ''
						}}
						validationSchema={newPasswordValid}
						onSubmit={(values) => {
							if (values.password !== values.newPassword) {
								alert('Fail, Please provide same password');
							} else {
								axios
									.put(
										`https://finalldaaqaqa.herokuapp.com/resetpassword?resetPasswordToken=${token}`,
										{
											password: values.password
										}
									)
									.then((res) => {
										toast.success(`${res.data.message}`, {
											position: 'bottom-right',
											autoClose: 3000,
											hideProgressBar: false,
											closeOnClick: true,
											pauseOnHover: true,
											draggable: true,
											progress: undefined,
											theme: 'dark'
										});
										setCheck(true);
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
							}
						}}
					>
						{({ errors, values, touched }) => (
							<Form className="reset-pass">
								<div className="new-password-form-group">
									<label>
										New Password <span>*</span>
									</label>
									<Field name="password" type="password" />
									{errors.password && touched.password ? (
										<div className="err">{errors.password}</div>
									) : null}
								</div>
								<div className="new-password-form-group">
									<label>
										Confirmed Password <span>*</span>
									</label>
									<Field name="newPassword" type="password" />
									{errors.newPassword && touched.newPassword ? (
										<div className="err">{errors.newPassword}</div>
									) : null}
								</div>
								<button style={{ color: 'cyan' }} type="Submit">
									<span>Reset Password</span>
									<i />
								</button>
							</Form>
						)}
					</Formik>
				</div>
			)}
		</div>
	);
}

export default ResetPassword;
