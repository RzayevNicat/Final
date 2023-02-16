import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import './HeaderCarousel.css';
function SimpleSlider() {
	const [ datas, setData ] = useState([]);
	useEffect(() => {
		axios.get('http://localhost:3000/products').then((res) => setData(res.data.data));
	}, []);

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
										<button>SHOP NOW</button>
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
