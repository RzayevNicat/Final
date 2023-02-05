import React, { useState, useEffect } from 'react';
import Salest from '../../components/Salest';
import './Category.css';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts } from '../../redux/slice/dataSlice';
import { FiChevronRight } from 'react-icons/fi';
import { AiOutlineMinus } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import axios from 'axios';
import CarouselFeatured from '../../components/CarouselFeatured/Carousell';
function Category() {
	const data = useSelector((state) => state.data.items);
	const status = useSelector((state) => state.data.status);
	const [ filter, setFilter ] = useState([]);
	const [ black, setBlack ] = useState('black');
	const listenScrollEvent = () => {
		window.scrollY > 10 ? setBlack('white') : setBlack('black');
	};
	const dispatch = useDispatch();
	useEffect(
		() => {
			if (status === 'idle') {
				dispatch(fetchProducts());
				axios.get('http://localhost:3000/filters').then((res) => setFilter(res.data.data));
			}
			window.addEventListener('scroll', listenScrollEvent);
			return () => {
				window.removeEventListener('scroll', listenScrollEvent);
			};
		},
		[ dispatch, status ]
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
						<h2>All</h2>
						<ul>
							<li>Puma</li>
							<li>Nike</li>
							<li>Adidas</li>
							<li>Men</li>
							<li>Women</li>
						</ul>
					</div>
					<hr />
					<div className="filter-price">
						<div className="filter-title">
							<h2>Price</h2>
							<AiOutlineMinus />
						</div>
						<input className="filtered-price" placeholder="Price" type="number" />
						<button className="filter-btn">FILTER</button>
					</div>
					<hr />
					<div className="filter-color">
						<div className="filter-title">
							<h2>Color</h2>
							<AiOutlineMinus />
						</div>
						<div className="colors">
							{colorArr.map((ele, index) => (
								<div key={index} className="color" style={{ backgroundColor: ele }} />
							))}
						</div>
					</div>
					<hr />
					<div className="filter-size">
						<div className="filter-title">
							<h2>Size</h2>
							<AiOutlineMinus />
						</div>
						<div className="size">{sizeArr.map((ele, index) => <div key={index}>{ele}</div>)}</div>
					</div>
					<hr />
					<div className="filter-featured">
						<h2 className="crls">Featured</h2>
						<CarouselFeatured />
					</div>
				</div>
				<div className="category-products" />
			</div>
		</div>
	);
}

export default Category;
