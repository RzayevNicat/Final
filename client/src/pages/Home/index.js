import React, { useEffect } from 'react';
import './Home.css';
import '../../components/Products/Products.css';
import Carousel from '../../components/HomeCarousel/Carousel';
import CarouselFooter from '../../components/Carousel/CarouselFooter';
import { BsHeadset } from 'react-icons/bs';
import { MdPayment } from 'react-icons/md';
import { GiReturnArrow } from 'react-icons/gi';
import { FaShippingFast } from 'react-icons/fa';
import Products from '../../components/Products';
import Salest from '../../components/Salest';

function Home() {
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);
	return (
		<div className="home">
			<Carousel />
			<Products />

			<div className="ultra">
				<div className="ultra-img">
					<img src="https://www.portotheme.com/magento2/porto/pub/media/wysiwyg/smartwave/porto/homepage/18/shop18_home_banner4.jpg" />
				</div>
				<div className="ultra-info">
					<h1>ULTRA BOOST</h1>
					<img src="https://www.portotheme.com/magento2/porto/pub/media/wysiwyg/smartwave/porto/homepage/18/shoes.png" />
					<button>SHOP NOW</button>
				</div>
			</div>

			<CarouselFooter />
			<Salest />
			<div className="explore">
				<h1>EXPLORE THE BEST OF YOU</h1>
				<button className="btn-white">SHOP NOW</button>
			</div>
			<div className="info-section">
				<div className="info-card">
					<BsHeadset className="info-icon" />
					<h1>CUSTOMER SUPPORT</h1>
					<h5>Need Assistence?</h5>
					<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis nec vestibulum magna, et dapib.</p>
				</div>
				<div className="info-card">
					<MdPayment className="info-icon" />
					<h1>SECURED PAYMENT</h1>
					<h5>Sale & Fast</h5>
					<p>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis nec vestibulum magna, et dapibus
						lacus. Lorem ipsum dolor sit amet.
					</p>
				</div>
				<div className="info-card">
					<GiReturnArrow className="info-icon" />
					<h1>FREE RETURNS</h1>
					<h5>Free & Easy</h5>
					<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis nec vestibulum magna, et dapib.</p>
				</div>
				<div className="info-card">
					<FaShippingFast className="info-icon" />
					<h1>FREE SHIPPING</h1>
					<h5>Orders Over $99</h5>
					<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis nec vestibulum magna, et dapib.</p>
				</div>
			</div>
		</div>
	);
}

export default Home;
