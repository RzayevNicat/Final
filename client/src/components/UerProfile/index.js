import React, { useEffect, useState } from 'react';
import './User.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';
import { Formik, Field, Form } from 'formik';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { removeWish } from '../../redux/slice/wishListSlice';
import { RxCross2 } from 'react-icons/rx';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';

const editSchema = Yup.object().shape({
	name: Yup.string()
		.matches(/^[A-Za-z]+/, 'Please provide valid name')
		.min(3, 'Short name')
		.max(15, 'Long name')
		.required('Please provide name'),
	surname: Yup.string()
		.matches(/^[A-Za-z]+/, 'Please provide valid surname')
		.min(3, 'Short Surname')
		.max(20, 'Long Surname')
		.required('Please provide surname'),
	email: Yup.string()
		.matches(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please provide valid email')
		.required('Please provide email'),
	password: Yup.string().required('Please provide password').min(6, 'Short password')
});
function UserProfile() {
	const navigate = useNavigate();
	const user = JSON.parse(localStorage.getItem('user'));
	const [ userr, setUser ] = useState({});
	const [ wishh, setWish ] = useState(false);
	const [ info, setInfo ] = useState(true);
	const [ card, setCard ] = useState(false);
	const [ edit, setEdit ] = useState(false);
	const dispatch = useDispatch();
	const handleLogOut = () => {
		axios.get('http://localhost:3000/logout');
		sessionStorage.setItem('userLogin', JSON.stringify(false));
		localStorage.removeItem('user');
		navigate('/');
		window.location.reload();
	};
	useEffect(
		() => {
			axios.get(`http://localhost:3000/users/${user._id}`).then((res) => {
				setUser(res.data.data);
			});
		},
		[ user ]
	);
	const handleWish = () => {
		setCard(false);
		setWish(true);
		setInfo(false);
	};
	const handleInfo = () => {
		setCard(false);
		setWish(false);
		setInfo(true);
	};
	const handleCard = () => {
		setWish(false);
		setCard(true);
		setInfo(false);
	};
	const handleDelete = (row) => {
		dispatch(removeWish(row));
		let copy = userr.userWishlist.filter((x) => x._id !== row._id);
		setUser(copy);
	};
	return (
		<div className="userProfile">
			<div className="user-info">
				<div className="user-img">
					<img src={userr.src} />
				</div>

				<div className="user-infos">
					<h1>
						{userr.name} {userr.surname}
					</h1>
				</div>
			</div>
			<div className="userWishAndCard">
				<div className="wish-card-title">
					<h2>
						Info{' '}
						{info === true ? (
							<FiChevronUp onClick={() => setInfo(false)} />
						) : (
							<FiChevronDown onClick={handleInfo} />
						)}
					</h2>
					<h2>
						Wishlist{' '}
						{wishh === true ? (
							<FiChevronUp onClick={() => setWish(false)} />
						) : (
							<FiChevronDown onClick={handleWish} />
						)}
					</h2>
					<h2>
						CheckOut{' '}
						{card === true ? (
							<FiChevronUp onClick={() => setCard(false)} />
						) : (
							<FiChevronDown onClick={handleCard} />
						)}
					</h2>
				</div>
				{wishh ? (
					<div className="user-wish">
						<TableContainer>
							<Table aria-label="simple table" className="table-wish">
								<TableHead className="table-head">
									<TableRow>
										<TableCell>Product Image</TableCell>
										<TableCell align="center">Product Name</TableCell>
										<TableCell align="center">Product Price</TableCell>
										<TableCell align="center">Product Brand</TableCell>
										<TableCell align="center">Product Ratings</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{(userr.userWishlist || []).map((row) => (
										<TableRow
											key={row._id}
											sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
											className="row-wish"
										>
											<TableCell component="th" scope="row">
												<img src={row.img_url} />
											</TableCell>
											<TableCell align="center">{row.productName}</TableCell>
											<TableCell align="center">${row.prodcutPrice}.00</TableCell>
											<TableCell align="center">{row.brand}</TableCell>
											<TableCell align="center" className="deleteWish">
												{row.productRatings}{' '}
												<RxCross2 className="wish-cross" onClick={() => handleDelete(row)} />
											</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
						</TableContainer>
					</div>
				) : null}
				{card ? (
					<div className="user-wish">
						<TableContainer>
							<Table aria-label="simple table" className="table-wish">
								<TableHead className="table-head">
									<TableRow>
										<TableCell>Product Image</TableCell>
										<TableCell align="center">Product Name</TableCell>
										<TableCell align="center">Product Price</TableCell>
										<TableCell align="center">Product Brand</TableCell>
										<TableCell align="center">Product Count</TableCell>
										<TableCell align="center">Total</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{(userr.userCard || []).map((row) => (
										<TableRow
											key={row.elem._id}
											sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
										>
											<TableCell component="th" scope="row">
												<img src={row.elem.img_url} />
											</TableCell>
											<TableCell align="center">{row.elem.productName}</TableCell>
											<TableCell align="center">${row.elem.prodcutPrice}.00</TableCell>
											<TableCell align="center">{row.elem.brand}</TableCell>
											<TableCell align="center">{row.count}</TableCell>
											<TableCell align="center">
												-${row.count * row.elem.prodcutPrice}.00
											</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
						</TableContainer>
					</div>
				) : null}
				{info ? (
					<div className="userr-infoo">
						<div className="user-info-name">
							<h5>
								Name: <span>{userr.name}</span>
							</h5>
							<h5>
								Surname: <span>{userr.surname}</span>
							</h5>
						</div>
						<div className="email-password-info">
							<h5>
								Email: <span>{userr.email}</span>
							</h5>
							<h5>
								Password: <span>{userr.password}</span>
							</h5>
						</div>
						<div className="gender-info">
							<h5>
								Gender: <span>{userr.gender}</span>
							</h5>
						</div>
						<div className="info-btns">
							<button onClick={() => setEdit(true)}>Edit</button>
							<button className="logOut" onClick={handleLogOut}>
								Log Out
							</button>
						</div>
					</div>
				) : null}
			</div>
			{edit ? (
				<div className="edit-bg">
					<div className="edit">
						<div className="edit-title">
							<h3>Edit Profile</h3>
							<RxCross2 className="edit-cross" onClick={() => setEdit(false)} />
						</div>
						<Formik
							initialValues={{
								name: '',
								surname: '',
								email: '',
								password: '',
								src: ''
							}}
							validationSchema={editSchema}
							onSubmit={(values) => {
								console.log(values);
								axios
									.put(`http://localhost:3000/users/${userr._id}`, {
										name: values.name,
										surname: values.surname,
										email: values.email,
										password: values.password,
										src: values.src
									})
									.then((res) => {
										console.log(res);
									})
									.catch((err) => {
										alert(err.response.data.message);
									});
								setEdit(false);
							}}
						>
							{({ errors, touched, values }) => (
								<Form className="edit-form">
									<div>
										<label>
											NAME <span>*</span>
										</label>
										<Field
											name="name"
											placeholder={errors.name && touched.name ? errors.name : ''}
										/>
									</div>
									<div>
										<label>
											SURNAME <span>*</span>
										</label>
										<Field
											name="surname"
											placeholder={errors.surname && touched.surname ? errors.surname : ''}
										/>
									</div>
									<div>
										<label>
											EMAIL <span>*</span>
										</label>
										<Field
											name="email"
											type="email"
											placeholder={errors.email && touched.email ? errors.email : ''}
										/>
									</div>
									<div>
										<label>
											PASSWORD <span>*</span>
										</label>
										<Field
											name="password"
											type="password"
											placeholder={errors.password && touched.password ? errors.password : ''}
										/>
									</div>
									<div>
										<label>IMAGE UPLOAD</label>
										<Field type="text" name="src" />
									</div>
									<button type="submit">Submit</button>
								</Form>
							)}
						</Formik>
					</div>
				</div>
			) : null}
		</div>
	);
}

export default UserProfile;