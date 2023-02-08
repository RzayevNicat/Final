import React from 'react';
import { useQuick } from '../../context/QuickView';
import './quickView.css';
import { BsHandbag } from 'react-icons/bs';
import { RxCross1 } from 'react-icons/rx';
function QuickView() {
	const { details, setDetails } = useQuick();
	console.log(details);
	return (
		<div className="quick-view">
			<div className="quick">
				<div className="quick-img">
					<img src={details.img_url} />
				</div>
				<div className="quick-title">
					<div className="title-kres">
						<h1>{details.productName}</h1>
						<RxCross1 className="kres" onClick={() => setDetails({})} />
					</div>

					<p className="quick-ratings">{details.productRatings}</p>
					<span className="quick-line" />
					<p className="quick-price">${details.prodcutPrice}.00</p>
					<p className="quick-info">{details.productInfo}</p>
					<p className="quick-avability">
						AVAILABILITY: <span>{details.discontinued ? 'IN STOCK' : 'NO STOCK'}</span>{' '}
					</p>
					<hr />
					<div className="quick-btn-group">
						<button className="math">-</button> <span>1</span> <button className="math">+</button>{' '}
						<button className="bag-btn">
							<BsHandbag className="bag-icon-2" />ADD TO CART
						</button>
					</div>
					<hr />
					<p className="goTo">GO TO PRODUCT</p>
				</div>
			</div>
		</div>
	);
}

export default QuickView;
