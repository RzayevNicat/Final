import React from 'react';
import Slider from 'react-slick';
import '../../../node_modules/slick-carousel/slick/slick.css';
import '../../../node_modules/slick-carousel/slick/slick-theme.css';
import './styles.css';
export default function EmpoleSlider() {
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
	return (
		<div>
			<Slider {...settings}>
				<div className="slider-employe">
					<p>
						" Long established fact that a reader will be distracted by the readable content of a page when
						looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal
						distribution of letters, as opposed to using 'Content here, content here "
					</p>
					<img src="https://www.portotheme.com/magento2/porto/pub/media/wysiwyg/smartwave/porto/aboutus/4/client2.png" />
					<h3>Brenda DOE</h3>
					<span>Porto Founder</span>
				</div>
				<div className="slider-employe">
					<p>
						" Long established fact that a reader will be distracted by the readable content of a page when
						looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal
						distribution of letters, as opposed to using 'Content here, content here "
					</p>
					<img src="https://www.portotheme.com/magento2/porto/pub/media/wysiwyg/smartwave/porto/aboutus/4/client1.png" />
					<h3>John Doe</h3>
					<span>Porto SEO</span>
				</div>
			</Slider>
		</div>
	);
}
