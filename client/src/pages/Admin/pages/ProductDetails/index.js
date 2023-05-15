import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ReactStars from 'react-rating-stars-component';
function ProductDetails() {
	const [ data, setData ] = useState({});
	const [ review, setReview ] = useState([]);
	const { id } = useParams();

	useEffect(
		() => {
			axios.get(`https://final-back-nb64-67i2b0g9y-rzayevnicat.vercel.app/products/${id}`).then((res) => {
				setData(res.data.data);
				setReview(res.data.data.productReview);
			});
		},
		[ id ]
	);

	// let star = 0;
	// let starr = 0;
	// review.forEach((elem) => {
	// 	starr = starr + elem.star;
	// 	star = starr / review?.length;
	// });
	const handlDelete = (elem) => {
		let copy = (review || []).filter((x) => x.nickName !== elem.nickName);
		setReview(copy);
		axios.put(`https://final-back-nb64-67i2b0g9y-rzayevnicat.vercel.app/products/${id}`, {
			productReview: [ ...copy ]
		});
	};
	return (
		<div className="admin-reviews">
			<div className="admin-reviews-img">
				<h1>{data.productName}</h1>
				<img src={data.img_url} />
				<div>
					<p>
						Stock: <span>{data.productStock}</span>
					</p>
					<p>
						Price: <span>${data.prodcutPrice}.00</span>
					</p>
				</div>
				<div>
					<p>
						Brand: <span>{data.brand}</span>
					</p>
					<p>
						Type: <span>{data.type}</span>
					</p>
				</div>

				<div>
					<div>Color: {(data.productColor || []).map((ele, inde) => <p key={inde}>{ele}</p>)}</div>
					<div>Size: {(data.productSize || []).map((ele, inde) => <p key={inde}>{ele}</p>)}</div>
				</div>
			</div>
			{review.length !== 0 ? (
				<div className="admin-review-scroll">
					<h1>Product Reviews</h1>
					{(review || []).map((elem, index) => (
						<div key={index}>
							<h5>{elem.nickName}</h5>
							<ReactStars
								count={elem.star}
								size={20}
								required={true}
								isHalf={true}
								emptyIcon={<i className="far fa-star" />}
								halfIcon={<i className="fa fa-star-half-alt" />}
								fullIcon={<i className="fa fa-star" />}
								activeColor="#ffd700"
							/>
							<p>{elem.summary}</p>
							<p>{elem.review}</p>
							<button onClick={() => handlDelete(elem)}>delete</button>
							<hr />
						</div>
					))}
				</div>
			) : (
				<h1>Not Review</h1>
			)}
		</div>
	);
}

export default ProductDetails;
