import React, { useEffect, useState } from 'react';
import './DetailsCustomer.css';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { ImCheckmark2, ImCancelCircle } from 'react-icons/im';
import Button from '@mui/material/Button';
import { Helmet } from 'react-helmet';
function DetailsCustomers() {
	const [ details, setDetails ] = useState({});
	var x = new Date();
	var y = x.getFullYear();
	const { id } = useParams();
	const navigate = useNavigate();
	useEffect(
		() => {
			axios
				.get(`https://final-back-nb64-67i2b0g9y-rzayevnicat.vercel.app/customers/${id}`)
				.then((res) => setDetails(res.data.data));
		},
		[ id, details ]
	);
	const handleDelete = (id) => {
		axios.delete(`https://final-back-nb64-67i2b0g9y-rzayevnicat.vercel.app/customers/${id}`);

		navigate('/admin/customer');
	};
	const handleCheck = (id) => {
		axios.put(`https://final-back-nb64-67i2b0g9y-rzayevnicat.vercel.app/customers/${id}`, {
			isActive: true,
			workStarted: y
		});
	};

	return (
		<div className="customer-details-bg">
			<Helmet>
				<meta charSet="utf-8" />
				<title>Customers Details</title>
			</Helmet>
			<div className="customer-details">
				<div className="details-header">
					<img src={details.customerSRC} alt={details.customerName} />
					<div>
						<h3>
							{details.customerName} {details.customerSurname}
						</h3>
						<p>{details.workingPosition}</p>
						<p>{details.customerEmail}</p>
					</div>
				</div>
				<div className="details-body">
					<h3>Customer Info</h3>
					<hr />
					<div className="details-customer-col">
						<div className="details-customer-row">
							<div>
								<p className="title-customer">Phone Number: </p>
								<p>{details.customerPhone}</p>
							</div>
							<div>
								<p className="title-customer">Age: </p>
								<p>{details.customerAge} old</p>
							</div>
						</div>
						{details.isActive ? (
							<div className="details-customer-row">
								<div>
									<p className="title-customer">Experience: </p>
									<p>{y - details.workStarted} year</p>
								</div>

								<div>
									<p className="title-customer">Started: </p>
									<p>{details.workStarted}</p>
								</div>
							</div>
						) : null}

						<div className="details-customer-row">
							<div>
								<p className="title-customer">City: </p>
								<p>{details.customerCity}</p>
							</div>
							<div>
								<p className="title-customer">Country: </p>
								<p>{details.customerCountry}</p>
							</div>
						</div>
						<div className="details-customer-operations">
							<a href={details.customerCV} download>
								Download CV
							</a>
							{details.isActive === false ? (
								<div>
									<ImCheckmark2 className="check-customer" onClick={() => handleCheck(details._id)} />
									<ImCancelCircle
										className="cancel-customer"
										onClick={() => handleDelete(details._id)}
									/>
								</div>
							) : (
								<div>
									<Button
										size="small"
										variant="outlined"
										color="error"
										className="btn-user"
										onClick={() => handleDelete(details._id)}
									>
										Delete
									</Button>
								</div>
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default DetailsCustomers;
