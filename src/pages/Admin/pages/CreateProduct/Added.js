import React, { useEffect, useState } from 'react';
import { Formik, Field, Form } from 'formik';
import { RxCross2 } from 'react-icons/rx';
import axios from 'axios';
import { Helmet } from 'react-helmet';
import { toast } from 'react-toastify';
function Added() {
	const [ productColor, setProductColor ] = useState([]);
	const [ filter, setFilter ] = useState([]);
	const [ productSize, setProductSize ] = useState([]);
	useEffect(() => {
		axios.get('https://finalldaaqaqa.herokuapp.com/filters').then((res) => setFilter(res.data.data));
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
		<div className="admin-update">
			<Helmet>
				<meta charSet="utf-8" />
				<title>Create Product</title>
			</Helmet>
			<h1>Create Product</h1>
			<Formik
				initialValues={{
					productName: '',
					type: '',
					gender: '',
					prodcutPrice: 0,
					productStock: 0,
					img_url: '',
					sale: false,
					brand: '',
					productRatings: 0,
					productInfo: '',
					productSize: productSize,
					productColor: productColor
				}}
				onSubmit={(values, { resetForm }) => {
					axios
						.post('https://finalldaaqaqa.herokuapp.com/products', {
							productName: values.productName,
							type: values.type,
							gender: values.gender,
							prodcutPrice: values.prodcutPrice,
							productStock: values.productStock,
							img_url: values.img_url,
							sale: values.sale,
							brand: values.brand,
							productRatings: values.productRatings,
							productInfo: values.productInfo,
							productSize: productSize,
							productColor: productColor
						})
						.catch((error) => {
							toast.error(`${error.response.data.message}`, {
								position: 'bottom-right',
								autoClose: 5000,
								hideProgressBar: false,
								closeOnClick: true,
								pauseOnHover: true,
								draggable: true,
								progress: undefined,
								theme: 'dark'
							});
						});
					resetForm({ values: '' });
				}}
			>
				{({ isSubmitting }) => (
					<Form className="admin-update-form">
						<div className="admin-product-name-price">
							<div className="admin-update-form-group">
								<label>Product Name</label>
								<Field type="text" name="productName" placeholder="Product Name" />
							</div>
							<div className="admin-update-form-group">
								<label>Product Price</label>
								<Field type="number" name="prodcutPrice" placeholder="Product Price" />
							</div>
						</div>

						<div className="admin-product-name-price">
							<div className="admin-update-form-group">
								<label>Product Stock</label>
								<Field type="number" name="productStock" placeholder="Product Stock" />
							</div>
							<div className="admin-update-form-group">
								<label>Product Img</label>
								<Field type="text" name="img_url" placeholder="SRC" />
							</div>
						</div>

						<div className="admin-product-name-price">
							<div className="admin-update-form-group">
								<label>Product Brand</label>
								<Field type="text" name="brand" />
							</div>
							<div className="admin-update-form-group">
								<label>Product Ratings</label>

								<Field type="number" name="productRatings" placeholder="Product Ratings" />
							</div>
						</div>

						<div className="admin-product-name-price">
							<div className="admin-update-form-group">
								<label>Product Info</label>
								<Field type="text" name="productInfo" placeholder="Info" />
							</div>
							<div className="admin-update-form-group">
								<label>Product Type</label>

								<Field type="text" name="type" placeholder="type" />
							</div>
						</div>
						<div className="admin-product-name-price">
							<div className="admin-sale-update">
								<label>Sale</label>
								<Field type="checkbox" name="sale" />
							</div>
						</div>
						<div className="admin-product-filter-update">
							<div className="admin-product-size-update">
								<h6>Product Size</h6>
								{productSize.length === 0 ? (
									<h5>Not Size</h5>
								) : (
									productSize.map((elem, index) => (
										<div key={index} className="admin-filter-updatee">
											{elem}
											<RxCross2 onClick={() => deleteSize(elem)} />
										</div>
									))
								)}
							</div>
							<div className="admin-product-color-update">
								<h6>Product Color</h6>
								{productColor.map((elem, index) => (
									<div key={index} className="admin-filter-updatee" style={{ color: elem }}>
										{elem}
										<RxCross2 onClick={() => deleteColor(elem)} />
									</div>
								))}
							</div>
						</div>
						<div className="admin-update-gender">
							<label>
								<Field type="radio" name="gender" value="Men" />
								Men
							</label>
							<label>
								<Field type="radio" name="gender" value="Women" />
								Women
							</label>
							<label>
								<Field type="radio" name="gender" value="Unisex" />
								Unisex
							</label>
						</div>

						<button type="submit">Submit</button>
					</Form>
				)}
			</Formik>
			<div className="admin-update-colors">
				<h5>Choose Color</h5>
				{colorArr.map((elem, index) => (
					<div
						key={index}
						className="admin-update-color"
						style={{ width: '30px', height: '30px', backgroundColor: elem }}
						onClick={() => handleColor(elem)}
					/>
				))}
			</div>
			<div className="admin-update-sizes">
				<h5>Choose Size</h5>
				<div>
					{sizeArr.map((elem, index) => (
						<p className="admin-update-size" onClick={() => handleSize(elem)} key={index}>
							{elem}
						</p>
					))}
				</div>
			</div>
		</div>
	);
}

export default Added;
