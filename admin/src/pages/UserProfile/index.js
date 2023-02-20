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
import {useNavigate} from 'react-router-dom'
function UserProfile() {
	const [ details, setDetails ] = useState({});
	const { id } = useParams();
	const { info } = useQuick();
    const {wishList} = useQuick();
    const {card} = useQuick();
    const navigate = useNavigate()
	useEffect(
		() => {
			axios.get(`http://localhost:3000/users/${id}`).then((res) => setDetails(res.data.data));
		},
		[ id, details ]
	);
    const handleDelete=(id)=>{
        axios.delete(`http://localhost:3000/users/${id}`)
        navigate('/users')
        window.location.reload()
    }
	return (
		<div className="user-profile">
			<div className="user-title">
				<Avatar alt="Remy Sharp" src={details.src} sx={{ width: 164, height: 164 }} />
				<h1>
					{details.name} {details.surname}
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
								Password: <span>{details.password}</span>
							</h5>
						</div>
						<div className="gender-info">
							<h5>
								Gender: <span>{details.gender}</span>
							</h5>
						</div>
						<div className="info-btns">
							<button>Edit</button>
							<button className="logOut" onClick={()=> handleDelete(details._id)}>Delete</button>
						</div>
					</div>
				) : null}
    {
        wishList?<div className="user-wishlist">
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
                    {details.userWishlist?.map((row) => (
                        <TableRow key={row._id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
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
    </div>:null
    }
			{
                card?<div className="user-wishlist">
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
                                <TableCell align='center'>Total</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {details.userCard?.map((row) => (
                                <TableRow key={row.elem._id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                    <TableCell component="th" scope="row" className="user-product-img">
                                        <img src={row.elem.img_url} />
                                    </TableCell>
                                    <TableCell align="center">{row.elem.productName}</TableCell>
                                    <TableCell align="center">${row.elem.prodcutPrice}.00</TableCell>
                                    <TableCell align="center">{row.elem.productStock}</TableCell>
                                    <TableCell align="center">{row.elem.brand}</TableCell>
                                    <TableCell align="center">{row.count}</TableCell>
                                    <TableCell align="center">+${row.count * row.elem.prodcutPrice}.00</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>:null
            }
			</div>
		</div>
	);
}

export default UserProfile;
