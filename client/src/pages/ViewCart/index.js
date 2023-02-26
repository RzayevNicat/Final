import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { BsHandbag } from 'react-icons/bs';
import { RxCross2 } from 'react-icons/rx';
import { AiOutlineArrowRight } from 'react-icons/ai';
import { viewAdd } from '../../redux/slice/basketSlice';
import { Link, useNavigate } from 'react-router-dom';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { removeBasket } from '../../redux/slice/basketSlice';
import { Helmet } from 'react-helmet';
import { ToastContainer } from 'react-toastify';
import './ViewCart.css';
function ViewCart() {
	const [ black, setBlack ] = useState('black');
	const [ data, setDataa ] = useState([]);
	const count = useSelector((state) => state.baskett.count);
	const activee = JSON.parse(sessionStorage.getItem('userLogin'));
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const listenScrollEvent = () => {
		window.scrollY > 10 ? setBlack('black') : setBlack('black');
	};
	useEffect(() => {
		window.scrollTo(0, 0);
		let user = JSON.parse(localStorage.getItem('user'));
		setDataa(user?.userCheckOut||[]);
		window.addEventListener('scroll', listenScrollEvent);
		return () => {
			window.removeEventListener('scroll', listenScrollEvent);
		};
	}, []);

	let subTotal = 0;

	data.forEach((element) => {
		let cnt = element.count * element.elem.prodcutPrice;
		subTotal += cnt;
	});
	const toBasket = () => {
		dispatch(viewAdd(data))
		
	};
	const incrementCounter = (id) => {
		data.forEach(element=>{
			if (element.elem._id === id) {
				element.count += 1
				let copy = {count: element.count, elem: element.elem}
				setDataa([...data],copy)
			
			}
		})
	};
	const handleDelete = (id)=>{
		dispatch(removeBasket(id))
		window.location.reload()
  }
	const decrementCounter = (id) => {
		
			data.forEach(element=>{
				if (element.count !==1) {
					if (element.elem._id === id) {
						element.count -= 1
						let copy = {count: element.count, elem: element.elem}
						setDataa([...data],copy)
						
					}
				}
				
			})
		
	};
	return (
		<div className="view-cart">
				<Helmet>
				<meta charSet="utf-8" />
				<title>Cart</title>
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
			<div className={black} />
			{count === 0 ? (
				<div className="shoping-empty">
					<h3>Shopping Cart</h3>
					<div className="empty">
						<BsHandbag className="empty-icon" />
						<p>You have no items in your shopping cart.</p>
						<button>
							<Link to={'/'}>CONTINUE SHOPPING</Link>
						</button>
					</div>
				</div>
			) : (
				<div className="view-cart-title">
					<h3>Shopping Cart</h3>
					<div className="view-cart-section">
						<div className="view-table">
							<TableContainer>
								<Table aria-label="simple table" className="table-view">
									<TableHead className="table-head">
										<TableRow>
											<TableCell className="tbl-header">Items</TableCell>
											<TableCell className="tbl-header" align="center">
												Price
											</TableCell>
											<TableCell className="tbl-header" align="center">
												QTY
											</TableCell>
											<TableCell className="tbl-header" align="center">
												SubTotal
											</TableCell>
										</TableRow>
									</TableHead>
									<TableBody>
										{data.map((row) => (
											<TableRow
												key={row.elem._id}
												sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
												className="row-view"
											>
												<TableCell component="th" scope="row" className="view-name">
													<img src={row.elem.img_url} />
													<h5>{row.elem.productName}</h5>
												</TableCell>
												<TableCell align="center" className="view-price">
													${row.elem.prodcutPrice}.00
												</TableCell>
												<TableCell align="center" className="view-count">
													<button onClick={()=> decrementCounter(row.elem._id)}>-</button>
													<span> {row.count}</span>
													<button onClick={()=> incrementCounter(row.elem._id)}>+</button>
												</TableCell>
												<TableCell align="center" className="view-total">
													<p>${row.count * row.elem.prodcutPrice}.00</p>
													<RxCross2 className="cross-view" onClick={()=> handleDelete(row.elem._id)}/>
												</TableCell>
											</TableRow>
										))}
									</TableBody>
								</Table>
							</TableContainer>
							<hr />
							<div className="discount-update">
								<div>
									<input placeholder="Enter discount code" />
									<button>Apply Discount</button>
								</div>
								<button onClick={toBasket}>Update Cart</button>
							</div>
						</div>
						<div className="view-summary">
							<h2>SUMMARY</h2>
							<hr />
							<div className="summary-total">
								<p>SUBTOTAL</p>
								<p>${subTotal}.00</p>
							</div>
							<div className="summary-tax">
								<p>TAX</p>
								<p>$0.00</p>
							</div>
							<hr />
							<div className="summary-order">
								<p>Order Total</p>
								<p className="order">${subTotal}.00</p>
							</div>
							<Link to={'/checkout'}>
								GO TO CHECKOUT <AiOutlineArrowRight />
							</Link>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}

export default ViewCart;
