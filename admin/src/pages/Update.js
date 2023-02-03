import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Formik, Form, Field } from 'formik';
function Update() {
	const [ products, setProducts ] = useState({});
	let { prodId } = useParams();
	useEffect(() => {
		axios.get(`http://localhost:3001/products/update/${prodId}`).then((res) => setProducts(res.data));
		console.log(products);
	}, []);
	return (
		<div>
			<Formik
				initialValues={{
					email: '',
					password: ''
				}}
				onSubmit={(values, { resetform }) => {
					console.log(values);
				}}
			>
				{({ isSubmitting }) => (
					<Form>
						<Field type="email" name="email" />

						<Field type="password" name="password" />

						<button type="submit" disabled={isSubmitting}>
							Submit
						</button>
					</Form>
				)}
			</Formik>
		</div>
	);
}

export default Update;
