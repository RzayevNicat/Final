import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import './UserProfile.css';
import Avatar from '@mui/material/Avatar';
import UserAccordion from '../../components/UserAccordion';
import './UserProfile.css';
import { useQuick } from '../../context/userInfoContext';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useNavigate } from 'react-router-dom';
import {ImCheckmark2} from 'react-icons/im'
import { Helmet } from 'react-helmet';
function UserProfile() {
	const [ details, setDetails ] = useState({});
	const { id } = useParams();
	const { info } = useQuick();
	const [ userAdmin, setUserAdmin ] = useState('');
	const [ render, setRender ] = useState(0);
	const { wishList } = useQuick();
	const [ edit, setEdit ] = useState(false);
	const { card } = useQuick();
	const navigate = useNavigate();
	useEffect(
		() => {
			axios.get(`https://final-back-nb64-67i2b0g9y-rzayevnicat.vercel.app/users/${id}`).then((res) => {
				setDetails(res.data.data);
				setUserAdmin(res.data.data.role);
			});
		},
		[ id,render ]
	);
	const handleDelete = (id) => {
		axios.delete(`https://final-back-nb64-67i2b0g9y-rzayevnicat.vercel.app/users/${id}`);
		navigate('/admin/users');
		window.location.reload();
	};
	const handleEdit = () => {
		setEdit(true);
	};
	const handleUpdate = () => {
		setEdit(false);
		axios.put(`https://final-back-nb64-67i2b0g9y-rzayevnicat.vercel.app/users/${id}`, {
			role: userAdmin
		}).then(res=>{
			setRender(Math.random());
		})
		
		
		
		
	};
	return (
		<div className="user-profile">
					<Helmet>
				<meta charSet="utf-8" />
				<title>User Profile</title>
			</Helmet>
			<div className="user-title">
				<Avatar alt="Remy Sharp" src={details.src} sx={{ width: 164, height: 164 }} />
				<h1>
					{details.name} {details.surname} {
						details.subscribe ===true?<ImCheckmark2
						className="check-customer"
						style={{color:'blue'}}
					/>:null
					}
				</h1>
			</div>
			<div className="user-info-admin">
				<div className="user-accordion">
					<UserAccordion />
				</div>
				{info ? (
					<div className="userr-infoo">
						<div className="user-info-name">
							<h5>
								Name: <span>{details.name}</span>
							</h5>
							<h5>
								Surname: <span>{details.surname}</span>
							</h5>
						</div>
						<div className="email-password-info">
							<h5>
								Email: <span>{details.email}</span>
							</h5>
							<h5>
								Role:{' '}
								{edit === false ? (
									<span>{details.role}</span>
								) : (
									<select
										value={userAdmin}
										className="select-admin"
										onChange={(e) => setUserAdmin(e.target.value)}
									>
										<option>user</option>
										<option>Admin</option>
									</select>
								)}
							</h5>
						</div>
						<div className="gender-info">
							<h5>
								Gender: <span>{details.gender}</span>
							</h5>
						</div>
						<div className="info-btns">
							{edit === false ? (
								<button onClick={handleEdit}>Edit</button>
							) : (
								<button onClick={handleUpdate}>Update</button>
							)}

							<button className="logOut" onClick={() => handleDelete(details._id)}>
								Delete
							</button>
						</div>
					</div>
				) : null}
				{wishList ? (
					<div className="user-wishlist">
						<TableContainer component={Paper}>
							<Table sx={{ minWidth: 650 }} aria-label="simple table">
								<TableHead>
									<TableRow>
										<TableCell>Img</TableCell>
										<TableCell align="center">Name</TableCell>
										<TableCell align="center">Price</TableCell>
										<TableCell align="center">Stock</TableCell>
										<TableCell align="center">Brand</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{details?.userWishlist.map((row) => (
										<TableRow
											key={row._id}
											sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
										>
											<TableCell component="th" scope="row" className="user-product-img">
												<img src={row.img_url} />
											</TableCell>
											<TableCell align="center">{row.productName}</TableCell>
											<TableCell align="center">{row.prodcutPrice}</TableCell>
											<TableCell align="center">{row.productStock}</TableCell>
											<TableCell align="center">{row.brand}</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
						</TableContainer>
					</div>
				) : null}
				{card ? (
					<div className="user-wishlist">
						<TableContainer component={Paper}>
							<Table sx={{ minWidth: 650 }} aria-label="simple table">
								<TableHead>
									<TableRow>
										<TableCell>Img</TableCell>
										<TableCell align="center">Name</TableCell>
										<TableCell align="center">Price</TableCell>
										<TableCell align="center">Stock</TableCell>
										<TableCell align="center">Brand</TableCell>
										<TableCell align="center">Count</TableCell>
										<TableCell align="center">Total</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{details?.userCard.map((row) => (
										<TableRow
											key={row.elem._id}
											sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
										>
											<TableCell component="th" scope="row" className="user-product-img">
												<img src={row.elem.img_url} />
											</TableCell>
											<TableCell align="center">{row.elem.productName}</TableCell>
											<TableCell align="center">${row.elem.prodcutPrice}.00</TableCell>
											<TableCell align="center">{row.elem.productStock}</TableCell>
											<TableCell align="center">{row.elem.brand}</TableCell>
											<TableCell align="center">{row.count}</TableCell>
											<TableCell align="center">
												+${row.count * row.elem.prodcutPrice}.00
											</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
						</TableContainer>
					</div>
				) : null}
			</div>
		</div>
	);
}

export default UserProfile;
