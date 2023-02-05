import React, { useEffect, useState } from 'react';
import Loading from '../../components/Loading/index';
import { fetchProducts } from '../../redux/slice/dataSlice';
import { useSelector, useDispatch } from 'react-redux';
import { BsSquare, BsSquareFill } from 'react-icons/bs';
import { useFilter } from '../../context/FilterContext';
import { CiHeart } from 'react-icons/ci';
import { BsHandbag, BsHeadset } from 'react-icons/bs';
function Products() {
	const { all, setAll } = useFilter();
	const { acsesories, setAcsesories } = useFilter();
	const { electronics, setElectronics } = useFilter();
	const { men, setMen } = useFilter();
	const { women, setWomen } = useFilter();
	const { shoes, setShoes } = useFilter();
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
				{numberOfItems === data.length - 8 ? null : (
					<button className="load" onClick={() => setIndex(index + 0.5)}>
						Load More
					</button>
				)}
			</div>
		</div>
	);
}

export default Products;
