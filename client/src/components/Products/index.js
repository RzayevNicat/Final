import React, { useEffect, useState } from 'react';
import { BsSquare, BsHandbag } from 'react-icons/bs';
import { AiFillStar } from 'react-icons/ai';
import { CiHeart } from 'react-icons/ci';
import Loading from '../../components/Loading/index';
import { fetchProducts } from '../../redux/slice/dataSlice';
import { useSelector, useDispatch } from 'react-redux';
import './Products.css';
function Products() {
	const PAGE_SIZE = 8; // or whatever you like

	const [ index, setIndex ] = useState(0);

	const [ visibleData, setVisibleData ] = useState([]);
	const data = useSelector((state) => state.data.items);
	const status = useSelector((state) => state.data.status);
	const dispatch = useDispatch();
	useEffect(
		() => {
			const numberOfItems = PAGE_SIZE * (index + 1);
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
	return (
		<div className="products">
			<div className="cards">
				{status === 'loading' && <Loading className="loading" />}
				{visibleData.map((ele, index) => {
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
										<AiFillStar /> <AiFillStar /> <AiFillStar /> <AiFillStar />
										<AiFillStar />
										<p>${ele.prodcutPrice}.00</p>
									</div>
									<CiHeart className="heart-card" />
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
	);
}

export default Products;
