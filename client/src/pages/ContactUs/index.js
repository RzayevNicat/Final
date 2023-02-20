import React, { useEffect, useState } from 'react';
import './Conatct.css';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { FiPhoneCall, FiSmartphone, FiMail } from 'react-icons/fi';
import { FaSkype } from 'react-icons/fa';
import Alert from '../../components/Alert/index';
const validationcontact = Yup.object().shape({
	name: Yup.string()
		.min(3, 'Short Name')
		.max(15, 'Long Name')
		.matches(/^[A-Za-z]+/, 'Please provide valid name')
		.required('Please provide Name'),
	email: Yup.string()
		.matches(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please provide valid email')
		.required('Please provide email'),
	phone: Yup.string().matches(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/, 'Invalid phone Number'),
	mind: Yup.string().required('Please fill input')
});
function ContactUs() {
	const [ black, setBlack ] = useState('black');
	const [ alert, setAlert ] = useState(false);
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
		<div className="contactus">
			<div className="black" />
			<div className="contact-container">
				<div style={{ width: '100%' }}>
					<iframe
						width="100%"
						height="400"
						frameborder="0"
						scrolling="no"
						marginheight="0"
						marginwidth="0"
						src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=1%20Grafton%20Street,%20Dublin,%20Ireland+(My%20Business%20Name)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
					>
						<a href="https://www.maps.ie/distance-area-calculator.html">measure acres/hectares on map</a>
					</iframe>
				</div>
				{alert ? <Alert /> : null}

				<div className="contact-input-icons">
					<div className="contact-input">
						<h2>
							Write <span>Us</span>
						</h2>
						<Formik
							initialValues={{
								name: '',
								email: '',
								phone: '',
								mind: ''
							}}
							onSubmit={(values, { resetForm }) => {
								setAlert(true);
								setTimeout(function() {
									setAlert(false);
								}, 4000);
								resetForm({ values: '' });
							}}
							validationSchema={validationcontact}
						>
							{({ errors, touched, values }) => (
								<Form className="form-contact">
									<div className="contact-info">
										<div className="contact-form-group">
											<label>
												Name <span>*</span>
											</label>
											<Field name="name" />
											{errors.name && touched.name ? (
												<div className="err">{errors.name}</div>
											) : null}
										</div>
										<div className="contact-form-group">
											<label>
												Email <span>*</span>
											</label>
											<Field name="email" />
											{errors.email && touched.email ? (
												<div className="err">{errors.email}</div>
											) : null}
										</div>
										<div className="contact-form-group">
											<label>
												Phone Number <span>*</span>
											</label>
											<Field name="phone" />
											{errors.phone && touched.phone ? (
												<div className="err">{errors.phone}</div>
											) : null}
										</div>
										<button type="submit" className="resp-btn">
											Submit
										</button>
									</div>
									<div className="textarea-contact">
										<label>
											What’s on your mind? <span>*</span>
										</label>
										<Field as="textarea" name="mind" type="textarea" />
										{errors.mind && touched.mind ? <div className="err">{errors.mind}</div> : null}
									</div>
									<button type="submit" className="none">
										SUBMIT
									</button>
								</Form>
							)}
						</Formik>
					</div>
					<div className="contact-icons">
						<h2>
							Contact <span>Details</span>
						</h2>
						<div className="contact-icon-row">
							<FiPhoneCall className="contact-icon" />
							<div>
								<p>0201 203 2032</p>
								<p>0201 203 2032</p>
							</div>
						</div>
						<div className="contact-icon-row">
							<FiSmartphone className="contact-icon" />
							<div>
								<p>+994 70 728 38 64</p>
								<p>+994 99 728 38 64</p>
							</div>
						</div>
						<div className="contact-icon-row">
							<FiMail className="contact-icon" />
							<div>
								<p>rzzayev.nicat@gmail.com</p>
								<p>nicatrzayev888@gmail.com</p>
							</div>
						</div>
						<div className="contact-icon-row">
							<FaSkype className="contact-icon" />
							<div>
								<p>porto_skype</p>
								<p>proto_template</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default ContactUs;
