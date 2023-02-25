import React, { useEffect, useState } from 'react';
import { fetchProducts } from '../../redux/slice/dataSlice';
import { useSelector, useDispatch } from 'react-redux';
import { BsSquare, BsSquareFill } from 'react-icons/bs';
import { useFilter } from '../../context/FilterContext';
import { CiHeart } from 'react-icons/ci';
import { AiFillHeart } from 'react-icons/ai';
import { BsHandbag } from 'react-icons/bs';
import { useQuick } from '../../context/QuickView';
import QuickView from '../quickView';
import { addBasket } from '../../redux/slice/basketSlice';
import { useNavigate } from 'react-router-dom';
import { addWish } from '../../redux/slice/wishListSlice';
import { ToastContainer, toast } from 'react-toastify';
import '../../../node_modules/react-toastify/dist/ReactToastify.css';
function Products() {
	const { all, setAll } = useFilter();
	const { acsesories, setAcsesories } = useFilter();
	const { electronics, setElectronics } = useFilter();
	const { men, setMen } = useFilter();
	const { women, setWomen } = useFilter();
	const { shoes, setShoes } = useFilter();
	const [ index, setIndex ] = useState(0);
	const [ visibleData, setVisibleData ] = useState([]);
	const data = useSelector((state) => state.data.items);
	const status = useSelector((state) => state.data.status);
	const { details, setDetails } = useQuick();
	const PAGE_SIZE = 8;
	const dispatch = useDispatch();
	let numberOfItems = PAGE_SIZE * (index + 1);
	const navigate = useNavigate();
	const activee = JSON.parse(sessionStorage.getItem('userLogin'));
	useEffect(
		() => {
			if (activee !== true) {
				sessionStorage.setItem('userLogin', JSON.stringify(false));
			}

			const newArray = [];
			for (let i = 0; i < data.length; i++) {
				if (i <= numberOfItems) newArray.push(data[i]);
			}

			setVisibleData(newArray);
			if (status === 'idle') {
				dispatch(fetchProducts());
			}
		},
		[ dispatch, status, index ]
	);
	let dataas = [];
	all === true ? (dataas = Object.values(visibleData)) : (dataas = Object.values(data));

	function filter(params) {
		if (all === true) {
			return params;
		} else if (acsesories === true) {
			return params.filter((x) => x.type === 'Acsesories');
		} else if (electronics === true) {
			return params.filter((x) => x.type === 'Electronics');
		} else if (men === true) {
			let neWarr = [];
			for (let i = 0; i < params.length; i++) {
				if (params[i].gender === 'Men' || params[i].gender === 'Unisex') {
					neWarr.push(params[i]);
				}
			}
			return neWarr;
		} else if (women === true) {
			let neWarr = [];
			for (let i = 0; i < params.length; i++) {
				if (params[i].gender === 'Women' || params[i].gender === 'Unisex') {
					neWarr.push(params[i]);
				}
			}
			return neWarr;
		} else if (shoes === true) {
			return params.filter((x) => x.type === 'Shoes');
		}
	}
	const handleAll = () => {
		setAll(true);
		setAcsesories(false);
		setElectronics(false);
		setMen(false);
		setWomen(false);
		setShoes(false);
		setIndex(0);
	};
	const handleAsesories = () => {
		setAll(false);
		setAcsesories(true);
		setElectronics(false);
		setMen(false);
		setWomen(false);
		setShoes(false);
		setIndex(0);
	};
	const handleElectronics = () => {
		setAll(false);
		setAcsesories(false);
		setElectronics(true);
		setMen(false);
		setWomen(false);
		setShoes(false);
		setIndex(0);
	};
	const handleMen = () => {
		setAll(false);
		setAcsesories(false);
		setElectronics(false);
		setMen(true);
		setWomen(false);
		setShoes(false);
		setIndex(0);
	};
	const handleWomen = () => {
		setAll(false);
		setAcsesories(false);
		setElectronics(false);
		setMen(false);
		setWomen(true);
		setShoes(false);
		setIndex(0);
	};
	const handleShoes = () => {
		setAll(false);
		setAcsesories(false);
		setElectronics(false);
		setMen(false);
		setWomen(false);
		setShoes(true);
		setIndex(0);
	};
	const getProduct = (id) => {
		navigate(`/product/${id}`);
		window.location.reload();
	};
	const toBasket = (elem) => {
		if (activee === false) {
			navigate('/profile');
		} else if (elem.discontinued === false) {
			toast.error('No Stock!', {
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
			dispatch(addBasket(elem));
		}
	};
	const AddWishList = (elem) => {
		dispatch(addWish(elem));
	};
	return (
		<div className="shop">
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
			<div className="shop-by">
				<h3>SHOP BY : </h3>
				<ul>
					<li onClick={handleAll}>
						{all === true ? <BsSquareFill className="shop-icon" /> : <BsSquare className="shop-icon" />}
						All
					</li>
					<li onClick={handleAsesories}>
						{acsesories === true ? (
							<BsSquareFill className="shop-icon" />
						) : (
							<BsSquare className="shop-icon" />
						)}{' '}
						Acsesories
					</li>
					<li onClick={handleElectronics}>
						{electronics === true ? (
							<BsSquareFill className="shop-icon" />
						) : (
							<BsSquare className="shop-icon" />
						)}{' '}
						Electronics
					</li>
					<li onClick={handleMen}>
						{men === true ? <BsSquareFill className="shop-icon" /> : <BsSquare className="shop-icon" />} Men
					</li>
					<li onClick={handleWomen}>
						{women === true ? (
							<BsSquareFill className="shop-icon" />
						) : (
							<BsSquare className="shop-icon" />
						)}{' '}
						Women
					</li>
					<li onClick={handleShoes}>
						{shoes === true ? (
							<BsSquareFill className="shop-icon" />
						) : (
							<BsSquare className="shop-icon" />
						)}{' '}
						Shoes
					</li>
				</ul>
			</div>
			<hr className="shop-by-line" />
			<div className="products">
				<div className="cards">
					{filter(dataas).map((ele, index) => {
						if (ele.sale !== true && ele.type !== 'featured') {
							return (
								<div className="card" key={index}>
									<div className="card-img">
										<img
											src={ele.img_url}
											onClick={() => getProduct(ele._id)}
											style={{ cursor: 'pointer' }}
											alt="img"
										/>

										<BsHandbag className="img-icon" onClick={() => toBasket(ele)} />

										<h4 onClick={() => setDetails(ele)}>QUICK VIEW</h4>
									</div>
									<div className="card-info">
										<div className="infoo">
											<h6 onClick={() => getProduct(ele._id)}>
												{ele.productName.substr(0, 15)}...
											</h6>

											<p>${ele.prodcutPrice}.00</p>
										</div>
										<CiHeart className="heart-card" onClick={() => AddWishList(ele)} />
									</div>
								</div>
							);
						}
					})}
				</div>

				<button className="load" onClick={() => setIndex(index + 0.5)}>
					Load More
				</button>
			</div>
			{details._id === undefined ? null : <QuickView />}
		</div>
	);
}

export default Products;
