import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Formik, Form, Field } from 'formik';
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
	const [ productColor, setProductColor ] = useState([]);
	const [ type, setType ] = useState('');
	const [ gender, setGender ] = useState('');
	let { id } = useParams();
	useEffect(() => {
		axios.get(`http://localhost:3000/products/${id}`).then((res) => {
			setProducts(res.data.data);
			setProductName(res.data.data.productName);
			setProductPricee(res.data.data.prodcutPrice);
			setProductStock(res.data.data.productStock);
			setImg_url(res.data.data.img_url);
			setSale(res.data.data.sale);
			setBrand(res.data.data.brand);
			setProductRatings(res.data.data.productRatings);
			setProductInfo(res.data.data.productInfo);
			setProductSize(res.data.data.productSize);
			setProductColor(res.data.data.productColor);
			setType(res.data.data.type);
			setGender(res.data.data.gender);
		});
	}, []);

	return (
		<div>
			<Formik
				initialValues={{
					productName: '',
					type: '',
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
						sale: productSale,
						brand: brand,
						productRatings: productRatings,
						productInfo: productInfo,
						productSize: productSize,
						productColor: productColor,
						type: type,
						gender: gender
					});
				}}
			>
				{({ isSubmitting }) => (
					<Form>
						<Field
							type="text"
							name="productName"
							placeholder="Product Name"
							value={productNamee}
							onChange={(e) => setProductName(e.target.value)}
						/>

						<Field
							type="number"
							name="prodcutPrice"
							placeholder="Product Price"
							value={productPricee}
							onChange={(e) => setProductPricee(e.target.value)}
						/>
						<Field
							type="number"
							name="productStock"
							placeholder="Product Stock"
							value={productStock}
							onChange={(e) => setProductStock(e.target.value)}
						/>
						<Field
							type="text"
							name="img_url"
							placeholder="SRC"
							value={img_url}
							onChange={(e) => setImg_url(e.target.value)}
						/>
						<Field
							type="checkbox"
							name="sale"
							onClick={() => (productSale === false ? setSale(true) : setSale(false))}
						/>
						<Field type="text" name="brand" value={brand} onChange={(e) => setBrand(e.target.value)} />
						<Field
							type="number"
							name="productRatings"
							placeholder="Product Ratings"
							value={productRatings}
							onChange={(e) => setProductRatings(e.target.value)}
						/>
						<Field
							type="text"
							name="productInfo"
							placeholder="Info"
							value={productInfo}
							onChange={(e) => setProductInfo(e.target.value)}
						/>

						<Field component="select" name="productSize" multiple={true}>
							{productSize.map((ele, index) => (
								<option key={index} value={ele}>
									{ele}
								</option>
							))}
						</Field>
						<Field component="select" name="productColor" multiple={true}>
							{productColor.map((ele, index) => (
								<option key={index} value={ele}>
									{ele}
								</option>
							))}
						</Field>
						<Field
							type="text"
							name="type"
							placeholder="type"
							value={type}
							onChange={(e) => setType(e.target.value)}
						/>
						<label>
							<Field type="radio" name="gender" value="Men" onClick={(e) => setGender(e.target.value)} />
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
						<button type="submit">Submit</button>
					</Form>
				)}
			</Formik>
		</div>
	);
}

export default Update;
