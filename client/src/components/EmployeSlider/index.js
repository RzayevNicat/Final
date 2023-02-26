import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import '../../../node_modules/slick-carousel/slick/slick.css';
import '../../../node_modules/slick-carousel/slick/slick-theme.css';
import './styles.css';
import axios from 'axios';
export default function EmpoleSlider() {
	const [ employers, setEmployers ] = useState([]);
	const settings = {
		dots: false,
		infinite: true,
		slidesToShow: 1,
		slidesToScroll: 1,
		autoplay: true,
		speed: 3000,
		autoplaySpeed: 5000,
		cssEase: 'linear'
	};
	useEffect(() => {
		axios.get('http://localhost:3000/customers').then((res) => setEmployers(res.data.data));
	}, []);
	return (
		<div>
			<Slider {...settings}>
				{employers.map((elem, index) => {
					if (elem.isActive === true) {
						return (
							<div className="slider-employe" key={index}>
								<p>" {elem.customerInfo} "</p>
								<img src={elem.customerSRC} alt={elem.customerName} />
								<h3>
									{elem.customerName} {elem.customerSurname}
								</h3>
								<span>{elem.workingPosition}</span>
							</div>
						);
					}
				})}
			</Slider>
		</div>
	);
}
