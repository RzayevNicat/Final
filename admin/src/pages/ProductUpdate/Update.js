import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { Formik, Form, Field } from 'formik';
import './ProductUpdate.css';
import { RxCross2 } from 'react-icons/rx';
function Update() {
	const [ products, setProducts ] = useState({});
	const [ productNamee, setProductName ] = useState('');
	const [ productPricee, setProductPricee ] = useState(0);
	const [ productStock, setProductStock ] = useState(0);
	const [ img_url, setImg_url ] = useState('');
	const [ productSale, setSale ] = useState(false);
	const [ brand, setBrand ] = useState('');
	const [ productRatings, setProductRatings ] = useState([]);
	const [ productInfo, setProductInfo ] = useState('');
	const [ productSize, setProductSize ] = useState([]);
	const [ discontinued, setDiscontinued ] = useState(false);
	const [ productColor, setProductColor ] = useState([]);
	const [ filter, setFilter ] = useState([]);
	const [ type, setType ] = useState('');
	const [ gender, setGender ] = useState('');
	let { id } = useParams();
	const navigate = useNavigate();
	useEffect(() => {
		axios.get(`http://localhost:3000/products/${id}`).then((res) => {
			setProducts(res.data.data);
			setProductName(res.data.data.productName);
			setProductPricee(res.data.data.prodcutPrice);
			setProductStock(res.data.data.productStock);
			setImg_url(res.data.data.img_url);
			setSale(res.data.data.sale);
			setDiscontinued(res.data.data.discontinued);
			setBrand(res.data.data.brand);
			setProductRatings(res.data.data.productRatings);
			setProductInfo(res.data.data.productInfo);
			setProductSize(res.data.data.productSize);
			setProductColor(res.data.data.productColor);
			setType(res.data.data.type);
			setGender(res.data.data.gender);
		});
		axios.get('http://localhost:3000/filters').then((res) => setFilter(res.data.data));
	}, []);
	let colorArr = [];
	filter.forEach((element) => {
		element.color.forEach((elem) => {
			colorArr.push(elem);
		});
	});
	let sizeArr = [];
	filter.forEach((element) => {
		element.size.forEach((elem) => {
			sizeArr.push(elem);
		});
	});
	const handleColor = (elem) => {
		if (productColor.some((x) => x === elem)) {
			productColor.forEach((element) => {
				if (elem === element) {
					return alert('already color');
				}
			});
		} else {
			return setProductColor([ ...productColor, elem ]);
		}
	};
	const handleSize = (elem) => {
		if (productSize.some((x) => x === elem)) {
			productSize.forEach((element) => {
				if (elem === element) {
					return alert('already size');
				}
			});
		} else {
			return setProductSize([ ...productSize, elem ]);
		}
	};
	const deleteColor = (elem) => {
		let copy = productColor.filter((x) => x !== elem);
		setProductColor(copy);
	};
	const deleteSize = (elem) => {
		let copy = productSize.filter((x) => x !== elem);
		setProductSize(copy);
	};
	return (
		<div className="update">
			<Formik
				initialValues={{
					productName: '',
					type: '',
					discontinued: false,
					gender: '',
					prodcutPrice: 0,
					productStock: 0,
					img_url: '',
					sale: productSale,
					brand: '',
					productRatings: 0,
					productInfo: '',
					productSize: [],
					productColor: []
				}}
				onSubmit={(values, { resetform }) => {
					axios.put(`http://localhost:3000/products/${id}`, {
						productName: productNamee,
						prodcutPrice: productPricee,
						productStock: productStock,
						img_url: img_url,
						discontinued: discontinued,
						sale: productSale,
						brand: brand,
						productRatings: productRatings,
						productInfo: productInfo,
						productSize: productSize,
						productColor: productColor,
						type: type,
						gender: gender
					});
					navigate('/');
				}}
			>
				{({ isSubmitting }) => (
					<Form className="update-form">
						<div className="product-name-price">
							<div className="update-form-group">
								<label>Product Name</label>
								<Field
									type="text"
									name="productName"
									placeholder="Product Name"
									value={productNamee}
									onChange={(e) => setProductName(e.target.value)}
								/>
							</div>
							<div className="update-form-group">
								<label>Product Price</label>
								<Field
									type="number"
									name="prodcutPrice"
									placeholder="Product Price"
									value={productPricee}
									onChange={(e) => setProductPricee(e.target.value)}
								/>
							</div>
						</div>

						<div className="product-name-price">
							<div className="update-form-group">
								<label>Product Stock</label>
								<Field
									type="number"
									name="productStock"
									placeholder="Product Stock"
									value={productStock}
									onChange={(e) => setProductStock(e.target.value)}
								/>
							</div>
							<div className="update-form-group">
								<label>Product Img</label>
								<Field
									type="text"
									name="img_url"
									placeholder="SRC"
									value={img_url}
									onChange={(e) => setImg_url(e.target.value)}
								/>
							</div>
						</div>

						<div className="product-name-price">
							<div className="update-form-group">
								<label>Product Brand</label>
								<Field
									type="text"
									name="brand"
									value={brand}
									onChange={(e) => setBrand(e.target.value)}
								/>
							</div>
							<div className="update-form-group">
								<label>Product Ratings</label>

								<Field
									type="number"
									name="productRatings"
									placeholder="Product Ratings"
									value={productRatings}
									onChange={(e) => setProductRatings(e.target.value)}
								/>
							</div>
						</div>

						<div className="product-name-price">
							<div className="update-form-group">
								<label>Product Info</label>
								<Field
									type="text"
									name="productInfo"
									placeholder="Info"
									value={productInfo}
									onChange={(e) => setProductInfo(e.target.value)}
								/>
							</div>
							<div className="update-form-group">
								<label>Product Type</label>

								<Field
									type="text"
									name="type"
									placeholder="type"
									value={type}
									onChange={(e) => setType(e.target.value)}
								/>
							</div>
						</div>
						<div className="product-name-price">
							<div className="sale-update">
								<label>Stock</label>
								<Field
									type="checkbox"
									name="discontinued"
									onClick={() =>
										discontinued === false ? setDiscontinued(true) : setDiscontinued(false)}
								/>
							</div>

							<div className="sale-update">
								<label>Sale</label>
								<Field
									type="checkbox"
									name="sale"
									onClick={() => (productSale === false ? setSale(true) : setSale(false))}
								/>
							</div>
						</div>
						<div className="product-filter-update">
							<div className="product-size-update">
								<h6>Product Size</h6>
								{productSize.length === 0 ? (
									<h5>Not Size</h5>
								) : (
									productSize.map((elem, index) => (
										<div key={index} className="filter-updatee">
											{elem}
											<RxCross2 onClick={() => deleteSize(elem)} />
										</div>
									))
								)}
							</div>
							<div className="product-color-update">
								<h6>Product Color</h6>
								{productColor.map((elem, index) => (
									<div key={index} className="filter-updatee" style={{ color: elem }}>
										{elem}
										<RxCross2 onClick={() => deleteColor(elem)} />
									</div>
								))}
							</div>
						</div>
						<div className="update-gender">
							<label>
								<Field
									type="radio"
									name="gender"
									value="Men"
									onClick={(e) => setGender(e.target.value)}
								/>
								Men
							</label>
							<label>
								<Field
									type="radio"
									name="gender"
									value="Women"
									onClick={(e) => setGender(e.target.value)}
								/>
								Women
							</label>
							<label>
								<Field
									type="radio"
									name="gender"
									value="Unisex"
									onClick={(e) => setGender(e.target.value)}
								/>
								Unisex
							</label>
						</div>

						<button type="submit">Submit</button>
					</Form>
				)}
			</Formik>
			<div className="update-colors">
				<h5>Choose Color</h5>
				{colorArr.map((elem) => (
					<div
						className="update-color"
						style={{ width: '30px', height: '30px', backgroundColor: elem }}
						onClick={() => handleColor(elem)}
					/>
				))}
			</div>
			<div className="update-sizes">
				<h5>Choose Size</h5>
				<div>
					{sizeArr.map((elem) => (
						<p className="update-size" onClick={() => handleSize(elem)}>
							{elem}
						</p>
					))}
				</div>
			</div>
		</div>
	);
}

export default Update;
