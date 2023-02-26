import React from 'react';
import { Formik, Field, Form } from 'formik';
import '../Customers/Customers.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import { Helmet } from 'react-helmet';
function CustomerCreate() {
	const navigate = useNavigate();
	return (
		<div>
			<Helmet>
				<meta charSet="utf-8" />
				<title>Customer Create</title>
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
			<h1>Employee Recruitment</h1>
			<Formik
				initialValues={{
					customerName: '',
					customerSurname: '',
					customerEmail: '',
					customerAge: 0,
					workingPosition: '',
					customerCity: '',
					customerCountry: '',
					customerInfo: '',
					customerPhone: '',
					customerCV: '',
					customerGender: '',
					customerSRC: ''
				}}
				onSubmit={(values) => {
					axios
						.post('http://localhost:3000/customers', values)
						.then((res) => {
							navigate(-1);
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
				{({ values, errors, touched }) => (
					<Form className="customer-form">
						<div className="row-customers">
							<div className="customer-form-group">
								<Field name="customerName" placeholder="Name" />
								<Field name="customerSurname" placeholder="Surname" />
							</div>
							<div className="customer-form-group">
								<Field name="customerEmail" type="emil" placeholder="Email" />
								<Field name="workingPosition" placeholder="Position" />
							</div>
							<div className="customer-form-group">
								<Field name="customerAge" type="number" />

								<Field name="customerPhone" placeholder="Phone Number" />
							</div>
							<div className="customer-form-group">
								<Field name="customerCity" placeholder="City" />
								<Field name="customerCountry" placeholder="Country" />
							</div>
							<div className="customer-form-group gender-customer">
								<div>
									<label>Man</label>
									<Field name="customerGender" type="radio" value="man" />
								</div>
								<div>
									<label>Womanan</label>
									<Field name="customerGender" type="radio" value="woman" />
								</div>
							</div>
							<div className="customer-form-group">
								<Field name="customerCV" type="file" className="cv-customer" />
								<Field name="customerSRC" />
							</div>
							<button type="submit">Submit</button>
						</div>

						<Field name="customerInfo" as="textarea" placeholder="About" />
					</Form>
				)}
			</Formik>
		</div>
	);
}

export default CustomerCreate;
