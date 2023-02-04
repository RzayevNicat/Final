import React, { useEffect, useState } from 'react';
import './Home.css';
import '../../components/Products/Products.css';
import Carousel from '../../components/HomeCarousel/Carousel';
import CarouselFooter from '../../components/Carousel/CarouselFooter';
import { BsHandbag, BsHeadset } from 'react-icons/bs';
import { MdPayment } from 'react-icons/md';
import { CiHeart } from 'react-icons/ci';
import { GiReturnArrow } from 'react-icons/gi';
import { FaShippingFast } from 'react-icons/fa';
import Loading from '../../components/Loading/index';
import { fetchProducts } from '../../redux/slice/dataSlice';
import { useSelector, useDispatch } from 'react-redux';
import { BsSquare, BsSquareFill } from 'react-icons/bs';

function Home() {
	const [ all, setAll ] = useState(true);
	const [ acsesories, setAcsesories ] = useState(false);
	const [ electronics, setElectronics ] = useState(false);
	const [ men, setMen ] = useState(false);
	const [ women, setWomen ] = useState(false);
	const [ shoes, setShoes ] = useState(false);
	const PAGE_SIZE = 8;

	const [ index, setIndex ] = useState(0);

	const [ visibleData, setVisibleData ] = useState([]);
	const data = useSelector((state) => state.data.items);
	const status = useSelector((state) => state.data.status);
	const dispatch = useDispatch();
	let numberOfItems = PAGE_SIZE * (index + 1);
	useEffect(
		() => {
			const newArray = [];
			for (let i = 0; i < data.length; i++) {
				if (i <= numberOfItems + 1) newArray.push(data[i]);
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
	return (
		<div className="home">
			<Carousel />

			<div className="shop">
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
							{men === true ? (
								<BsSquareFill className="shop-icon" />
							) : (
								<BsSquare className="shop-icon" />
							)}{' '}
							Men
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
				<hr />
				<div className="products">
					<div className="cards">
						{status === 'loading' && <Loading className="loading" />}
						{filter(dataas).map((ele, index) => {
							if (ele.sale !== true) {
								return (
									<div className="card" key={index}>
										<div className="card-img">
											<img src={ele.img_url} />

											<BsHandbag className="img-icon" />

											<h4>QUIK VIEW</h4>
										</div>
										<div className="card-info">
											<div className="infoo">
												<h6>{ele.productName}</h6>

												<p>${ele.prodcutPrice}.00</p>
											</div>
											<CiHeart className="heart-card" />
										</div>
									</div>
								);
							}
						})}
					</div>
					{numberOfItems === data.length - 2 ? null : (
						<button className="load" onClick={() => setIndex(index + 0.5)}>
							Load More
						</button>
					)}
				</div>
			</div>
			<div className="ultra">
				<div className="ultra-img">
					<img src="https://www.portotheme.com/magento2/porto/pub/media/wysiwyg/smartwave/porto/homepage/18/shop18_home_banner4.jpg" />
				</div>
				<div className="ultra-info">
					<h1>ULTRA BOOST</h1>
					<img src="https://www.portotheme.com/magento2/porto/pub/media/wysiwyg/smartwave/porto/homepage/18/shoes.png" />
					<button>SHOP NOW</button>
				</div>
			</div>

			<CarouselFooter />
			<div className="salest">
				<div className="sale">
					<img src="https://www.portotheme.com/magento2/porto/pub/media/wysiwyg/smartwave/porto/homepage/18/shop18_home_banner1.jpg" />
					<div className="sale-info">
						<div>
							<h1>Summer Sale</h1>
							<p>20% OFF</p>
						</div>
						<button className="btn-black">SHOP NOW</button>
					</div>
				</div>
				<div className="sale">
					<img src="https://www.portotheme.com/magento2/porto/pub/media/wysiwyg/smartwave/porto/homepage/18/shop18_home_banner2.jpg" />
					<div className="sale-info">
						<div>
							<h1 className="flash">Flash Sale</h1>
							<p className="flashh">30% OFF</p>
						</div>
						<button className="btn-white">SHOP NOW</button>
					</div>
				</div>
			</div>
			<div className="explore">
				<h1>EXPLORE THE BEST OF YOU</h1>
				<button className="btn-white">SHOP NOW</button>
			</div>
			<div className="info-section">
				<div className="info-card">
					<BsHeadset className="info-icon" />
					<h1>CUSTOMER SUPPORT</h1>
					<h5>Need Assistence?</h5>
					<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis nec vestibulum magna, et dapib.</p>
				</div>
				<div className="info-card">
					<MdPayment className="info-icon" />
					<h1>SECURED PAYMENT</h1>
					<h5>Sale & Fast</h5>
					<p>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis nec vestibulum magna, et dapibus
						lacus. Lorem ipsum dolor sit amet.
					</p>
				</div>
				<div className="info-card">
					<GiReturnArrow className="info-icon" />
					<h1>FREE RETURNS</h1>
					<h5>Free & Easy</h5>
					<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis nec vestibulum magna, et dapib.</p>
				</div>
				<div className="info-card">
					<FaShippingFast className="info-icon" />
					<h1>FREE SHIPPING</h1>
					<h5>Orders Over $99</h5>
					<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis nec vestibulum magna, et dapib.</p>
				</div>
			</div>
		</div>
	);
}

export default Home;
