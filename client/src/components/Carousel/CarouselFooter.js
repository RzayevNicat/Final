import React, { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { BsHandbag } from 'react-icons/bs';
import { AiFillStar } from 'react-icons/ai';
import { CiHeart } from 'react-icons/ci';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import './styles.css';
import { Autoplay, Navigation } from 'swiper';

export default function CarouselFooter() {
	const data = useSelector((state) => state.data.items);
	return (
		<div className="ftr">
			<h3>FEATURED PRODUCTS</h3>
			<Swiper
				slidesPerView={6}
				spaceBetween={30}
				rewind={true}
				autoplay={{
					delay: 2500,
					disableOnInteraction: false
				}}
				navigation={true}
				modules={[ Autoplay, Navigation ]}
				className="mySwiper"
			>
				{data.map((ele, index) => {
					if (ele.sale !== true) {
						return (
							<SwiperSlide>
								<div className="featured-card" key={index}>
									<div className="featured-card-img ">
										<img src={ele.img_url} />

										<BsHandbag className="img-icon" />

										<h4>QUIK VIEW</h4>
									</div>
									<div className="featured-card-info">
										<div className="featured-infoo">
											<h6>{ele.productName}</h6>

											<p>${ele.prodcutPrice}.00</p>
										</div>
										<CiHeart className="heart-card" />
									</div>
								</div>
							</SwiperSlide>
						);
					}
				})}
			</Swiper>
		</div>
	);
}
