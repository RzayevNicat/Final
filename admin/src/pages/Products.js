import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Products() {
	const navigate = useNavigate();
	const [ data, setData ] = useState([]);
	useEffect(() => {
		axios.get('http://localhost:3000/products').then((res) => setData(res.data.data));
	}, []);
	const handleDelete = (id) => {
		axios.delete(`http://localhost:3000/products/${id}`);
		const copy = data.filter((x) => x._id !== id);
		setData(copy);
	};
	const handleUpdate = (id) => {
		navigate(`update/${id}`);
	};
	return (
		<div className="products">
			<div className="add">
				<h1>Products</h1>
				<Link className="btn text-light link1" to={'added'}>
					Add Product
				</Link>
			</div>
			<div className="tablee">
				{data.map((ele, index) => (
					<Card className="card" key={index} style={{ width: '18rem' }}>
						<Link to={'details'}>
							<Card.Img variant="top" src={ele.img_url} />
							<Card.Body>
								<Card.Title className="card-title">{ele.productName}</Card.Title>
							</Card.Body>
						</Link>

						<ListGroup className="list-group-flush">
							<ListGroup.Item>Price : {ele.prodcutPrice} M</ListGroup.Item>
							<ListGroup.Item>Rating : {ele.productRatings}</ListGroup.Item>
							<ListGroup.Item>Memory : {ele.productInfo}</ListGroup.Item>
						</ListGroup>
						<Card.Body>
							<Card.Link
								href="#"
								className="btn btn-success me-2 text-light"
								onClick={() => handleUpdate(ele._id)}
							>
								Update
							</Card.Link>
							<Card.Link
								className="btn btn-danger text-light"
								href="#"
								onClick={() => handleDelete(ele._id)}
							>
								Delete
							</Card.Link>
						</Card.Body>
					</Card>
				))}
			</div>
		</div>
	);
}

export default Products;
