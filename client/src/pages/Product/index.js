import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { FiChevronRight } from 'react-icons/fi';
import { useQuick } from '../../context/QuickView';
import './Product.css';
import axios from 'axios';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { CiHeart } from 'react-icons/ci';
import { BsHandbag, BsFillCheckCircleFill } from 'react-icons/bs';
import { Gallery } from '../../components/ProductImage/index';
import { productAdd } from '../../redux/slice/basketSlice';
import { FaFacebookF, FaLinkedinIn, FaGithub, FaInstagram } from 'react-icons/fa';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import { useDispatch } from 'react-redux';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Star from '../../components/RatingStar';
import CarouselForType from '../../components/CarouselForType';
import { addWish } from '../../redux/slice/wishListSlice';
import { ToastContainer, toast } from 'react-toastify';
import '../../../node_modules/react-toastify/dist/ReactToastify.css';
const validateSchemaa = Yup.object().shape({
	nickName: Yup.string().min(3, 'very small').max(10, 'very long').required('fill input'),
	summary: Yup.string().required('fill input'),
	review: Yup.string().min(5, 'very small').max(100, 'very long').required('fill input')
});
function Product() {
	const [ black, setBlack ] = useState('black');
	const { saleProduct, setSaleProduct } = useQuick();
	const [ details, setDetails ] = useState(true);
	const [ review, setReview ] = useState(false);
	const [ custom, setCustom ] = useState(false);
	const [ count, setCount ] = useState(1);
	const { id } = useParams();
	const listenScrollEvent = () => {
		window.scrollY > 10 ? setBlack('black') : setBlack('black');
	};

	useEffect(
		() => {
			axios.get(`http://localhost:3000/products/${id}`).then((res) => setSaleProduct(res.data.data));
			window.scrollTo(0, 0);
			window.addEventListener('scroll', listenScrollEvent);
			return () => {
				window.removeEventListener('scroll', listenScrollEvent);
			};
		},
		[ setCount, count, setSaleProduct, id ]
	);
	function createData(name, first, second, third, fourth) {
		return { name, first, second, third, fourth };
	}
	const rows = [
		createData('UK', 18, 20, 22, 24, 26),
		createData('European', 46, 48, 50, 52, 54),
		createData('US', 14, 16, 18, 20, 22),
		createData('Australia', 8, 10, 12, 14, 16)
	];
	const getDetails = () => {
		setDetails(true);
		setReview(false);
		setCustom(false);
	};
	const getReviews = () => {
		setDetails(false);
		setReview(true);
		setCustom(false);
	};
	const getCustom = () => {
		setDetails(false);
		setReview(false);
		setCustom(true);
	};
	const dispatch = useDispatch();
	const activee = JSON.parse(sessionStorage.getItem('userLogin'));

	const navigate = useNavigate();
	const toBasket = (elem) => {
		if (activee === false) {
			navigate('/profile');
		} else if (elem.discontinued === false) {
			toast.error('🦄 No Stock!', {
				position: 'bottom-right',
				autoClose: 3000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: 'dark'
			});
		} else {
			let productt = { count: count, elem: elem };
			dispatch(productAdd(productt));
		}
	};
	const incrementCounter = () => {
		setCount(count + 1);
	};
	const decrementCounter = () => {
		if (count !== 1) {
			setCount(count - 1);
		}
	};
	const AddWishList = (elem) => {
		dispatch(addWish(elem));
	};
	return (
		<div className="view-product" id="product">
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
			<div className="transition">
				<Link to={'/'}>HOME</Link> <FiChevronRight className="icon-chevron" />{' '}
				<span>{saleProduct.productName}</span>
			</div>
			<hr />
			<div className="product-view">
				<div className="product-view-img">
					{(saleProduct.productImages || []).length !== 0 ? (
						<Gallery className="gallery" />
					) : (
						<img src={saleProduct.img_url} className="imggg" alt="prodcutImg" />
					)}
				</div>
				<div className="product-view-info">
					<h1>{saleProduct.productName}</h1>
					<p className="productRatings-view">
						{saleProduct.productRatings} <a href="#review">Be The Review</a>
					</p>
					<p className="productPrice-view">${saleProduct.prodcutPrice}.00</p>
					<p className="productInfo-view">{saleProduct.productInfo}</p>
					<p className="avability-view">
						AVAILABILITY: <span>{saleProduct.discontinued ? 'IN STOCK' : 'NO STOCK'}</span>
					</p>
					{(saleProduct.productSize || []).length !== 0 ? (
						<div className="product-view-size">
							<p>Size:</p>
							<div className="size">
								{(saleProduct.productSize || []).map((elem, index) => <div key={index}>{elem}</div>)}
							</div>
						</div>
					) : null}

					<div className="product-view-colors">
						<p>Color:</p>
						<div className="colors-2">
							{(saleProduct.productColor || [])
								.map((elementt, index) => (
									<div key={index} className="color" style={{ backgroundColor: elementt }} />
								))}
						</div>
					</div>
					<hr />
					<div className="view-btn-group">
						<div className="minus-plus">
							<button onClick={() => decrementCounter(saleProduct)}>-</button>{' '}
							<input type="number" value={count} onChange={(e) => setCount(e.target.value)} />{' '}
							<button onClick={() => incrementCounter(saleProduct)}>+</button>
						</div>
						<button className="bag-btn" onClick={() => toBasket(saleProduct)}>
							<BsHandbag className="bag-icon-2" />ADD TO CART
						</button>
						<CiHeart className="heart-view" onClick={() => AddWishList(saleProduct)} />
					</div>
					<div className="view-icons">
						<FaFacebookF className="icon facebook" />
						<FaLinkedinIn className="icon linkedin" />
						<FaGithub className="icon github" />
						<FaInstagram className="icon instagram" />
					</div>
				</div>
			</div>
			<div className="user-review">
				<div className="review-title">
					<p
						onClick={getDetails}
						style={{
							color: details ? '#111111' : 'gray',
							textDecoration: details ? 'underline' : 'none'
						}}
					>
						Details
					</p>
					<p
						onClick={getReviews}
						style={{
							color: review ? '#111111' : 'gray',
							textDecoration: review ? 'underline' : 'none'
						}}
					>
						Reviews
					</p>
					<p
						onClick={getCustom}
						style={{
							color: custom ? '#111111' : 'gray',
							textDecoration: custom ? 'underline' : 'none'
						}}
					>
						Custom Tab
					</p>
				</div>
				<hr />
				{details ? (
					<div className="detaills">
						<p>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
							labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
							laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
							voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat.
						</p>

						<ul>
							<li>
								<BsFillCheckCircleFill className="check-icon" /> Any Product types that You want -
								Simple, Configurable
							</li>
							<li>
								<BsFillCheckCircleFill className="check-icon" /> Downloadable/Digital Products, Virtual
								Products
							</li>
							<li>
								<BsFillCheckCircleFill className="check-icon" /> Inventory Management with Backordered
								items
							</li>
						</ul>
						<p>
							Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
							quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
						</p>
					</div>
				) : null}
				{review ? (
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
								resetForm({ values: '' });
							}}
						>
							{({ errors, touched, values }) => (
								<Form className="form" onSubmit={() => window.location.reload()}>
									<Star name="star" />
									<div className="form-group">
										<label>
											Nick Name <span>*</span>
										</label>
										<Field name="nickName" />
										{errors.nickName && touched.nickName ? (
											<div className="err">{errors.nickName}</div>
										) : null}
									</div>
									<div className="form-group">
										<label>
											Summary <span>*</span>
										</label>
										<Field name="summary" />
										{errors.summary && touched.summary ? (
											<div className="err">{errors.summary}</div>
										) : null}
									</div>
									<div className="form-group">
										<label>
											Review <span>*</span>
										</label>
										<Field name="review" />
										{errors.review && touched.review ? (
											<div className="err">{errors.review}</div>
										) : null}
									</div>
									<button
										disabled={
											values.nickName && values.summary && values.review !== '' ? false : true
										}
										type="submit"
									>
										SUBMIT REVIEW
									</button>
								</Form>
							)}
						</Formik>
					</div>
				) : null}
				{custom ? (
					<div className="custom-tab">
						<h4>Clothing - Single Size Conversion (Continued)</h4>
						<TableContainer component={Paper} style={{ backgroundColor: '#f4f4f4' }}>
							<Table sx={{ minWidth: 650 }} aria-label="simple table">
								<TableBody>
									{rows.map((row) => (
										<TableRow
											key={row.name}
											sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
										>
											<TableCell component="th" scope="row">
												{row.name}
											</TableCell>
											<TableCell align="right">{row.first}</TableCell>
											<TableCell align="right">{row.second}</TableCell>
											<TableCell align="right">{row.third}</TableCell>
											<TableCell align="right">{row.fourth}</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
						</TableContainer>
					</div>
				) : null}
			</div>
			<CarouselForType />
		</div>
	);
}

export default Product;
