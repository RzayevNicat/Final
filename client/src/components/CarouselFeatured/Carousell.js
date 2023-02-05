import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { useSelector } from 'react-redux';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-cards';

import './styles.css';

// import required modules
import { Autoplay, EffectCards } from 'swiper';

export default function CarouselFeatured() {
	const data = useSelector((state) => state.data.items);
	return (
		<div>
			<Swiper
				autoplay={{
					delay: 2500,
					disableOnInteraction: false
				}}
				rewind={true}
				effect={'cards'}
				grabCursor={true}
				modules={[ EffectCards, Autoplay ]}
				className="mySwiperr"
			>
				{data.map((elem, index) => {
					if (elem.type === 'featured') {
						return (
							<SwiperSlide className="swiperr-slide">
								<img src={elem.img_url} />
								<div>
									<h4>{elem.productName}</h4>
									<p>{elem.prodcutPrice}$</p>
								</div>
							</SwiperSlide>
						);
					}
				})}
			</Swiper>
		</div>
	);
}
