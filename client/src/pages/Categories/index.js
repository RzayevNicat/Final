import React, { useState, useEffect } from 'react';
import Salest from '../../components/Salest';
import './Category.css';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts } from '../../redux/slice/dataSlice';
import { FiChevronRight } from 'react-icons/fi';

import { AiOutlineMinus, AiOutlineArrowUp, AiOutlineArrowDown } from 'react-icons/ai';
import { MdViewList, MdViewModule } from 'react-icons/md';
import { Link } from 'react-router-dom';
import axios from 'axios';
import CarouselFeatured from '../../components/CarouselFeatured/Carousell';
import Loading from '../../components/Loading';
import { CiHeart } from 'react-icons/ci';
import { BsHandbag } from 'react-icons/bs';
import { useFilter } from '../../context/FilterContext';
function Category() {
	const data = useSelector((state) => state.data.items);
	const status = useSelector((state) => state.data.status);
	const [ filter, setFilter ] = useState([]);
	const [ black, setBlack ] = useState('black');
	const [ visibleData, setVisibleData ] = useState([]);
	const [ index, setIndex ] = useState(0);
	const { all, setAll } = useFilter();
	const [ puma, setPuma ] = useState(false);
	const [ adidas, setAdidas ] = useState(false);
	const [ nike, setNike ] = useState(false);
	const { men, setMen } = useFilter();
	const [ view, setView ] = useState(15);
	const [ dataa, setDataa ] = useState(false);
	const [ arrow, setArrow ] = useState(false);
	const [ sort, setSort ] = useState('');
	const [ size, setSize ] = useState('');
	const [ color, setColor ] = useState('');
	const { women, setWomen } = useFilter();
	const [ price, setPrice ] = useState(0);

	let PAGE_SIZE = view;

	const listenScrollEvent = () => {
		window.scrollY > 10 ? setBlack('white') : setBlack('black');
	};
	const dispatch = useDispatch();
	let numberOfItems = PAGE_SIZE * (index + 1);
	useEffect(
		() => {
			const newArray = [];
			for (let i = 0; i < data.length; i++) {
				if (i <= numberOfItems + 1) newArray.push(data[i]);
			}
			axios.get('http://localhost:3000/filters').then((res) => setFilter(res.data.data));
			setVisibleData(newArray);
			if (status === 'idle') {
				dispatch(fetchProducts());
			}
			window.addEventListener('scroll', listenScrollEvent);
			return () => {
				window.removeEventListener('scroll', listenScrollEvent);
			};
		},
		[ dispatch, status, index, price, view ]
	);
	let sizeArr = [];
	for (let i = 0; i < filter.length; i++) {
		for (let j = 0; j < filter[i].size.length; j++) {
			sizeArr.push(filter[i].size[j]);
		}
	}
	let colorArr = [];
	for (let i = 0; i < filter.length; i++) {
		for (let j = 0; j < filter[i].color.length; j++) {
			colorArr.push(filter[i].color[j]);
		}
	}
	console.log(sort);
	let dataas = [];
	all === true ? (dataas = Object.values(visibleData)) : (dataas = Object.values(data));
	/* SORT ***************************************/
	function sorting(params) {
		if (sort === 'price' && arrow === false) {
			params.sort((a, b) => a.prodcutPrice - b.prodcutPrice);
		} else if (sort === 'price' && arrow === true) {
			params.sort((a, b) => b.prodcutPrice - a.prodcutPrice);
		} else if (sort === 'productName' && arrow === false) {
			return params.sort((a, b) => a.productName.localeCompare(b.productName));
		} else if (sort === 'productName' && arrow === true) {
			return params.sort((a, b) => b.productName.localeCompare(a.productName));
		}
	}
	sorting(dataas);
	/****************FILTER*********************/
	function filtered(params) {
		if (all === true) {
			let allColor = params.filter((x) => x.prodcutPrice >= price);
			if (color !== '') {
				let nwArr = [];
				allColor.forEach((element) => {
					for (let i = 0; i < element.productColor.length; i++) {
						if (element.productColor[i] === color) {
							nwArr.push(element);
						}
					}
				});
				if (size !== '') {
					let sizArr = [];
					nwArr.forEach((element) => {
						for (let i = 0; i < element.productSize.length; i++) {
							if (element.productSize[i] === size) {
								sizArr.push(element);
							}
						}
					});
					return sizArr;
				} else {
					return nwArr;
				}
			} else {
				if (size !== '') {
					let sizArr = [];
					allColor.forEach((element) => {
						for (let i = 0; i < element.productSize.length; i++) {
							if (element.productSize[i] === size) {
								sizArr.push(element);
							}
						}
					});
					return sizArr;
				} else {
					return allColor;
				}
			}
		} else if (puma === true) {
			let pumaa = params.filter((x) => x.brand === 'Puma');
			let pumaColor = pumaa.filter((x) => x.prodcutPrice >= price);
			if (color !== '') {
				let nwArr = [];
				pumaColor.forEach((element) => {
					for (let i = 0; i < element.productColor.length; i++) {
						if (element.productColor[i] === color) {
							nwArr.push(element);
						}
					}
				});
				if (size !== '') {
					let sizArr = [];
					nwArr.forEach((element) => {
						for (let i = 0; i < element.productSize.length; i++) {
							if (element.productSize[i] === size) {
								sizArr.push(element);
							}
						}
					});
					return sizArr;
				} else {
					return nwArr;
				}
			} else {
				if (size !== '') {
					let sizArr = [];
					pumaColor.forEach((element) => {
						for (let i = 0; i < element.productSize.length; i++) {
							if (element.productSize[i] === size) {
								sizArr.push(element);
							}
						}
					});
					return sizArr;
				} else {
					return pumaColor;
				}
			}
		} else if (nike === true) {
			let nikee = params.filter((x) => x.brand === 'Nike');
			let nikeColor = nikee.filter((x) => x.prodcutPrice >= price);
			if (color !== '') {
				let nwArr = [];
				nikeColor.forEach((element) => {
					for (let i = 0; i < element.productColor.length; i++) {
						if (element.productColor[i] === color) {
							nwArr.push(element);
						}
					}
				});
				if (size !== '') {
					let sizArr = [];
					nwArr.forEach((element) => {
						for (let i = 0; i < element.productSize.length; i++) {
							if (element.productSize[i] === size) {
								sizArr.push(element);
							}
						}
					});
					return sizArr;
				} else {
					return nwArr;
				}
			} else {
				if (size !== '') {
					let sizArr = [];
					nikeColor.forEach((element) => {
						for (let i = 0; i < element.productSize.length; i++) {
							if (element.productSize[i] === size) {
								sizArr.push(element);
							}
						}
					});
					return sizArr;
				} else {
					return nikeColor;
				}
			}
		} else if (adidas === true) {
			let adidass = params.filter((x) => x.brand === 'Adidas');
			let adidasColor = adidass.filter((x) => x.prodcutPrice >= price);
			if (color !== '') {
				let nwArr = [];
				adidasColor.forEach((element) => {
					for (let i = 0; i < element.productColor.length; i++) {
						if (element.productColor[i] === color) {
							nwArr.push(element);
						}
					}
				});
				if (size !== '') {
					let sizArr = [];
					nwArr.forEach((element) => {
						for (let i = 0; i < element.productSize.length; i++) {
							if (element.productSize[i] === size) {
								sizArr.push(element);
							}
						}
					});
					return sizArr;
				} else {
					return nwArr;
				}
			} else {
				if (size !== '') {
					let sizArr = [];
					adidasColor.forEach((element) => {
						for (let i = 0; i < element.productSize.length; i++) {
							if (element.productSize[i] === size) {
								sizArr.push(element);
							}
						}
					});
					return sizArr;
				} else {
					return adidasColor;
				}
			}
		} else if (men === true) {
			let neWarr = [];
			for (let i = 0; i < params.length; i++) {
				if (params[i].gender === 'Men' || params[i].gender === 'Unisex') {
					neWarr.push(params[i]);
				}
			}
			let menColor = neWarr.filter((x) => x.prodcutPrice >= price);
			if (color !== '') {
				let nwArr = [];
				menColor.forEach((element) => {
					for (let i = 0; i < element.productColor.length; i++) {
						if (element.productColor[i] === color) {
							nwArr.push(element);
						}
					}
				});
				if (size !== '') {
					let sizArr = [];
					nwArr.forEach((element) => {
						for (let i = 0; i < element.productSize.length; i++) {
							if (element.productSize[i] === size) {
								sizArr.push(element);
							}
						}
					});
					return sizArr;
				} else {
					return nwArr;
				}
			} else {
				if (size !== '') {
					let sizArr = [];
					menColor.forEach((element) => {
						for (let i = 0; i < element.productSize.length; i++) {
							if (element.productSize[i] === size) {
								sizArr.push(element);
							}
						}
					});
					return sizArr;
				} else {
					return menColor;
				}
			}
		} else if (women === true) {
			let neWarr = [];
			for (let i = 0; i < params.length; i++) {
				if (params[i].gender === 'Women' || params[i].gender === 'Unisex') {
					neWarr.push(params[i]);
				}
			}
			let womenColor = neWarr.filter((x) => x.prodcutPrice >= price);
			if (color !== '') {
				let nwArr = [];
				womenColor.forEach((element) => {
					for (let i = 0; i < element.productColor.length; i++) {
						if (element.productColor[i] === color) {
							nwArr.push(element);
						}
					}
				});
				if (size !== '') {
					let sizArr = [];
					nwArr.forEach((element) => {
						for (let i = 0; i < element.productSize.length; i++) {
							if (element.productSize[i] === size) {
								sizArr.push(element);
							}
						}
					});
					return sizArr;
				} else {
					return nwArr;
				}
			} else {
				if (size !== '') {
					let sizArr = [];
					womenColor.forEach((element) => {
						for (let i = 0; i < element.productSize.length; i++) {
							if (element.productSize[i] === size) {
								sizArr.push(element);
							}
						}
					});
					return sizArr;
				} else {
					return womenColor;
				}
			}
		}
	}
	const handleSubmit = (e) => {
		e.preventDefault();
	};
	const handleAll = () => {
		setAll(true);
		setPuma(false);
		setAdidas(false);
		setMen(false);
		setWomen(false);
		setNike(false);
		setIndex(0);
	};
	const handlePuma = () => {
		setAll(false);
		setPuma(true);
		setAdidas(false);
		setMen(false);
		setWomen(false);
		setNike(false);
		setIndex(0);
	};
	const handleAdidas = () => {
		setAll(false);
		setPuma(false);
		setAdidas(true);
		setMen(false);
		setWomen(false);
		setNike(false);
		setIndex(0);
	};
	const handleMen = () => {
		setAll(false);
		setPuma(false);
		setAdidas(false);
		setMen(true);
		setWomen(false);
		setNike(false);
		setIndex(0);
	};
	const handleWomen = () => {
		setAll(false);
		setPuma(false);
		setAdidas(false);
		setMen(false);
		setWomen(true);
		setNike(false);
		setIndex(0);
	};
	const handleNike = () => {
		setAll(false);
		setPuma(false);
		setAdidas(false);
		setMen(false);
		setWomen(false);
		setNike(true);
		setIndex(0);
	};

	return (
		<div className="categoriest">
			<div className={black} />
			<Salest className="category-salest" />
			<div className="transition">
				<Link to={'/'}>HOME</Link> <FiChevronRight className="icon-chevron" /> <span>ALL</span>
			</div>
			<hr />
			<div className="category">
				<div className="filters">
					<div className="filter-brand">
						<h2 onClick={handleAll} style={{ color: all ? 'black' : 'rgba(119,119,119)' }}>
							All
						</h2>
						<ul>
							<li onClick={handlePuma} style={{ color: puma ? 'black' : 'rgba(119,119,119)' }}>
								Puma
							</li>
							<li onClick={handleNike} style={{ color: nike ? 'black' : 'rgba(119,119,119)' }}>
								Nike
							</li>
							<li onClick={handleAdidas} style={{ color: adidas ? 'black' : 'rgba(119,119,119)' }}>
								Adidas
							</li>
							<li onClick={handleMen} style={{ color: men ? 'black' : 'rgba(119,119,119)' }}>
								Men
							</li>
							<li onClick={handleWomen} style={{ color: women ? 'black' : 'rgba(119,119,119)' }}>
								Women
							</li>
						</ul>
					</div>
					<hr />
					<div className="filter-price">
						<div className="filter-title">
							<h2>Price</h2>
							<AiOutlineMinus />
						</div>
						<form onSubmit={handleSubmit}>
							<input
								className="filtered-price"
								placeholder="Price"
								type="number"
								onChange={(e) => setPrice(e.target.value)}
							/>
							<button className="filter-btn">FILTER</button>
						</form>
					</div>
					<hr />
					<div className="filter-color">
						<div className="filter-title">
							<h2>Color</h2>
							<AiOutlineMinus />
						</div>
						<div className="colors">
							{colorArr.map((ele, index) => (
								<div
									key={index}
									className="color"
									style={{ backgroundColor: ele }}
									onClick={() => setColor(ele)}
								/>
							))}
							<button className="default color-default" onClick={() => setColor('')}>
								Default
							</button>
						</div>
					</div>
					<hr />
					<div className="filter-size">
						<div className="filter-title">
							<h2>Size</h2>
							<AiOutlineMinus />
						</div>
						<div className="size">
							{sizeArr.map((ele, index) => (
								<div key={index} onClick={() => setSize(ele)}>
									{ele}
								</div>
							))}
							<button className="default" onClick={() => setSize('')}>
								Default
							</button>
						</div>
					</div>
					<hr />
					<div className="filter-featured">
						<h2 className="crls">Featured</h2>
						<CarouselFeatured />
					</div>
					<hr />
					<div className="custom-block">
						<h1>CUSTOM HTML BLOCK</h1>
						<p>This is custom sub-title</p>
						<span>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras non placerat mi. Etiam non
							tellus
						</span>
					</div>
				</div>
				<div className="category-products">
					<div className="title-products">
						<div className="sort">
							<span>Sort By: </span>{' '}
							<select onClick={(e) => setSort(e.target.value)}>
								<option value="position">Position</option>
								<option value="productName">Product Name</option>
								<option value="price">Price</option>
							</select>
							{arrow === true ? (
								<AiOutlineArrowUp className="title-icon" onClick={() => setArrow(false)} />
							) : (
								<AiOutlineArrowDown className="title-icon" onClick={() => setArrow(true)} />
							)}
						</div>
						<div className="view">
							<span>Show: </span>{' '}
							<select onClick={(e) => setView(e.target.value)}>
								<option value="15">15</option>
								<option value="30">30</option>
								<option value="45">45</option>
							</select>
							{dataa === true ? (
								<MdViewModule className="title-icon" onClick={() => setDataa(false)} />
							) : (
								<MdViewList className="title-icon" onClick={() => setDataa(true)} />
							)}
						</div>
					</div>
					<div className="prods">
						<div className="categories-products">
							{status === 'loading' && <Loading className="loading" />}
							{dataa === false ? (
								filtered(dataas).map((ele, index) => {
									if (ele.sale !== true && ele.type !== 'featured') {
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
								})
							) : (
								filtered(dataas).map((ele, index) => {
									if (ele.sale !== true && ele.type !== 'featured') {
										return (
											<div className="category-products-2">
												<img src={ele.img_url} />
												<div className="category-cards-2">
													<h1>{ele.productName}</h1>
													<h4>Product Ratings: {ele.productRatings}</h4>
													<span>{ele.productInfo}Learn More</span>
													<p>${ele.prodcutPrice}.00</p>
													<div className="btn-group">
														<button>
															<BsHandbag className="bag-icon" />ADD TO CART
														</button>{' '}
														<CiHeart className="category-heart-2" />
													</div>
												</div>
											</div>
										);
									}
								})
							)}
						</div>
						{numberOfItems === data.length - 1.5 ? null : (
							<button className="load" onClick={() => setIndex(index + 0.5)}>
								{status === 'loading' ? 'Loading...' : 'Load More'}
							</button>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}

export default Category;
