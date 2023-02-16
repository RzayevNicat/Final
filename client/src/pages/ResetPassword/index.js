import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import './ResetPassword.css';
import { BsCheck } from 'react-icons/bs';
const newPasswordValid = Yup.object().shape({
	password: Yup.string().min(6, 'Short Password').required('Please provide New Password'),
	newPassword: Yup.string().min(6, 'Short Password').required('Please provide New Password')
});
function ResetPassword() {
	const { token } = useParams();
	const [ black, setBlack ] = useState('black');
	const [ check, setCheck ] = useState(false);
	const navigate = useNavigate();
	const listenScrollEvent = () => {
		window.scrollY > 10 ? setBlack('black') : setBlack('black');
	};
	useEffect(() => {
		window.scrollTo(0, 0);
		window.addEventListener('scroll', listenScrollEvent);
		return () => {
			window.removeEventListener('scroll', listenScrollEvent);
		};
	}, []);
	return (
		<div className="reset-pass-page">
			<div className={black} />
			{check ? (
				<div className="success">
					<BsCheck className="icon-success" />
					<p>Password Updated!!!</p>
				</div>
			) : (
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
								.put(`http://localhost:3000/resetpassword?resetPasswordToken=${token}`, {
									password: values.password
								})
								.then((res) => {
									alert(res.data.message);
									setCheck(true);
								})
								.catch((error) => {
									alert(error.response.data.message);
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
							<button type="submit">Reset Password</button>
						</Form>
					)}
				</Formik>
			)}
		</div>
	);
}

export default ResetPassword;
