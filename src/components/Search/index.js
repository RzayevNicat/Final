import React, { useEffect, useRef, useState } from 'react';
import { BiSearchAlt } from 'react-icons/bi';
import './styles.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
function Search() {
	const [ product, setProduct ] = useState([]);
	const [ q, setQ ] = useState('');
	const [ visible, setVisible ] = useState(false);
	const navigate = useNavigate();
	useEffect(() => {
		axios.get('https://finalldaaqaqa.herokuapp.com/products').then((res) => setProduct(res.data.data));
	}, []);
	const datas = Object.values(product);
	function search(params) {
		let copy = params.filter(
			(item) => (item.productName || item.type).toLowerCase().indexOf(q.toLocaleLowerCase()) > -1
		);
		if (copy.length === 0) {
			return params.filter((item) => item.type.toLocaleLowerCase().indexOf(q.toLocaleLowerCase()) > -1);
		} else {
			return copy;
		}
	}
	const handleChange = (e) => {
		setQ(e.target.value);
		setVisible(true);
		if (e.target.value === '') {
			setVisible(false);
		}
	};
	const handleClick = (element) => {
		navigate(`/product/${element._id}`);
	};
	return (
		<div className="search">
			<form className="search-input">
				<input placeholder="Search" onChange={handleChange} />

				<BiSearchAlt className="search-icon" />
			</form>
			{visible ? (
				<div className="serch-outputs">
					{search(datas).map((element) => (
						<div className="product-detailss" onClick={() => handleClick(element)}>
							<h5>{element.productName}</h5>
							<p>${element.prodcutPrice}.00</p>
							<p>{element.type}</p>
							<hr />
						</div>
					))}
				</div>
			) : null}
		</div>
	);
}

export default Search;
