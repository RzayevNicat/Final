import ReactStars from 'react-rating-stars-component';
import React from 'react';
import { render } from 'react-dom';

const ratingChanged = (newRating) => {
	console.log(newRating);
};
export default function StarRating(params) {
	return (
		<ReactStars
			count={5}
			onChange={ratingChanged}
			size={50}
			required={true}
			isHalf={true}
			emptyIcon={<i className="far fa-star" />}
			halfIcon={<i className="fa fa-star-half-alt" />}
			fullIcon={<i className="fa fa-star" />}
			activeColor="#ffd700"
		/>
	);
}
