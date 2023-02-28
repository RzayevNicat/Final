import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import axios from 'axios';
import './Products.css';
function Products() {
	const navigate = useNavigate();
	const [ data, setData ] = useState([]);
	useEffect(() => {
		axios.get('https://finalldaaqaqa.herokuapp.com/products').then((res) => setData(res.data.data));
	}, []);
	const handleDelete = (id) => {
		axios.delete(`https://finalldaaqaqa.herokuapp.com/products/${id}`);
		const copy = data.filter((x) => x._id !== id);
		setData(copy);
	};
	const handleUpdate = (id) => {
		navigate(`update/${id}`);
	};
	const handleDetails = (id) => {
		navigate(`/admin/productDetails/${id}`);
	};
	return (
		<div className="admin-products">
			<Helmet>
				<meta charSet="utf-8" />
				<title>Products</title>
			</Helmet>
			<div className="admin-add">
				<h1>Products</h1>
				<Link className="btn text-light admin-link1" to={'added'}>
					Add Product
				</Link>
			</div>
			<div className="tablee">
				{data.map((ele, index) => (
					<Card className="admin-card">
						<CardMedia component="img" alt="green iguana" className="admin-card-img" image={ele.img_url} />
						<CardContent>
							<Typography gutterBottom variant="h5" component="div">
								{ele.productName}
							</Typography>
							<Typography variant="body2" color="text.secondary">
								Price : {ele.prodcutPrice} M
							</Typography>
							<Typography variant="body2" color="text.secondary">
								Stock : {ele.productStock}
							</Typography>
						</CardContent>
						<CardActions>
							<Button size="small" onClick={() => handleUpdate(ele._id)}>
								Edit
							</Button>
							<Button size="small" onClick={() => handleDetails(ele._id)}>
								Learn More
							</Button>
						</CardActions>
					</Card>
				))}
			</div>
		</div>
	);
}

export default Products;
