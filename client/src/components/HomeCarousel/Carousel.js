import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Slider from 'react-slick';
import './HeaderCarousel.css';
function SimpleSlider() {
	const [ datas, setData ] = useState([]);
	useEffect(() => {
		axios
			.get('https://final-back-nb64-67i2b0g9y-rzayevnicat.vercel.app/products')
			.then((res) => setData(res.data.data));
	}, []);
	const navigate = useNavigate();
	const settings = {
		dots: true,
		infinite: true,
		speed: 2000,
		slidesToShow: 1,
		slidesToScroll: 1,
		scrollX: true,
		autoplay: false,
		autoplaySpeed: 2000
	};
	const handleSale = (id) => {
		navigate(`/product/${id}`);
	};
	return (
		<div className="carousel">
			<Slider {...settings}>
				{datas.map((ele, index) => {
					if (ele.sale === true) {
						return (
							<div className="header" key={index}>
								<div className="header-info">
									<h1>Spring / Summer Season</h1>
									<div className="spans">
										<span className="up">
											up <br /> to
										</span>
										<span className="sale">50% OFF</span>
									</div>
									<div className="starting">
										<h1>
											STARTING AT <span className="dollor">$</span>{' '}
											<span className="payment">{ele.prodcutPrice}</span>
										</h1>
										<button onClick={() => handleSale(ele._id)}>SHOP NOW</button>
									</div>
								</div>
								<div className="header-img">
									<img src={ele.img_url} />
								</div>
							</div>
						);
					}
				})}
			</Slider>
		</div>
	);
}
export default SimpleSlider;
