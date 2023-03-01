import React, { useEffect, useState } from 'react';
import { Formik, Form, Field } from 'formik';
import ReactStars from 'react-rating-stars-component';
import * as Yup from 'yup';
import { useQuick } from '../../context/QuickView';
import axios from 'axios';
import { toast } from 'react-toastify';
const validateSchemaa = Yup.object().shape({
	nickName: Yup.string().min(3, 'very small').max(10, 'very long').required('fill input'),
	summary: Yup.string().required('fill input'),
	review: Yup.string().min(5, 'very small').max(100, 'very long').required('fill input')
});
function Review() {
	const { saleProduct, setSaleProduct } = useQuick();

	const [ star, setStar ] = useState(0);
	const ratingChanged = (newRating) => {
		setStar(newRating);
	};

	return (
		<div className="reviews">
			<p className="youRe">YOU'RE REVIEWING:</p>
			<p className="product-named">{saleProduct.productName}</p>
			<p className="your-rating">
				Your Rating <span>*</span>
			</p>
			<p className="ratingg">Rating</p>

			<Formik
				initialValues={{
					nickName: '',
					summary: '',
					review: '',
					star: 0
				}}
				validationSchema={validateSchemaa}
				onSubmit={(values, { resetForm }) => {
					if (saleProduct?.productReview.some((x) => x.nickName === values.nickName)) {
						saleProduct?.productReview.forEach((element) => {
							if (element.nickName === values.nickName) {
								toast.error('Already NickName!', {
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
					} else {
						
						values.star = star;

						axios.put(`https://finalldaaqaqa.herokuapp.com/products/${saleProduct._id}`, {
							productReview: [ ...saleProduct.productReview, values ]
						});
						window.location.reload();
					}
					
				}}
			>
				{({ errors, touched, values }) => (
					<Form className="form">
						<ReactStars
							count={5}
							onChange={ratingChanged}
							size={50}
							required={true}
							isHalf={true}
							emptyIcon={<i className="far fa-star" />}
							halfIcon={<i className="fa fa-star-half-alt" />}
							fullIcon={<i className="fa fa-star" />}
							activeColor="#ffd700"
						/>
						<div className="form-group">
							<label>
								Nick Name <span>*</span>
							</label>
							<Field name="nickName" />
							{errors.nickName && touched.nickName ? <div className="err">{errors.nickName}</div> : null}
						</div>
						<div className="form-group">
							<label>
								Summary <span>*</span>
							</label>
							<Field name="summary" />
							{errors.summary && touched.summary ? <div className="err">{errors.summary}</div> : null}
						</div>
						<div className="form-group">
							<label>
								Review <span>*</span>
							</label>
							<Field name="review" />
							{errors.review && touched.review ? <div className="err">{errors.review}</div> : null}
						</div>
						<button
							disabled={values.nickName && values.summary && values.review !== '' ? false : true}
							type="submit"
						>
							SUBMIT REVIEW
						</button>
					</Form>
				)}
			</Formik>
			<div className="user-reviews">
				<hr />
				<h2>Review of some users</h2>
				{(saleProduct.productReview || []).map((elem, index) => (
					<div className="user-review" key={index}>
						<h5>{elem.nickName}</h5>
						<ReactStars
							count={elem.star}
							size={20}
							required={true}
							isHalf={true}
							emptyIcon={<i className="far fa-star" />}
							halfIcon={<i className="fa fa-star-half-alt" />}
							fullIcon={<i className="fa fa-star" />}
							activeColor="#ffd700"
						/>
						<p>{elem.summary}</p>
						<p>{elem.review}</p>
					</div>
				))}
			</div>
		</div>
	);
}

export default Review;
