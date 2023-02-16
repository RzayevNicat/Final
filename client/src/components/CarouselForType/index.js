import React, { useRef, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { BsHandbag } from 'react-icons/bs';
import { AiFillStar } from 'react-icons/ai';
import { CiHeart } from 'react-icons/ci';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import './carouselForType.css';
import { Autoplay, Navigation } from 'swiper';
import { useQuick } from '../../context/QuickView';
import { fetchProducts } from '../../redux/slice/dataSlice';
import Loading from '../Loading';
import { useNavigate } from 'react-router-dom';
export default function CarouselForType() {
	const dataas = useSelector((state) => state.data.items);
	const status = useSelector((state) => state.data.status);
	const { saleProduct } = useQuick();
	const dispatch = useDispatch();

	useEffect(
		() => {
			window.scrollTo(0, 0);
			if (status === 'idle') {
				dispatch(fetchProducts());
			}
		},
		[ dispatch, status ]
	);
	const navigate = useNavigate();
	const getProduct = (id) => {
		navigate(`/product/${id}`);
		window.location.reload();
	};
	return (
		<div className="ftr" style={{ padding: '0px 4% 5% 4%' }}>
			<h3 style={{ marginBottom: '10px', textAlign: 'start' }}>WE FOUND OTHER PRODUCTS YOU MIGHT LIKE!</h3>
			<hr style={{ marginBottom: '30px' }} />
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
				{' '}
				{status === 'loading' ? (
					<Loading />
				) : (
					dataas.map((ele, index) => {
						if (ele.sale !== true && ele.type === saleProduct.type && ele._id !== saleProduct._id) {
							return (
								<SwiperSlide key={index}>
									<div className="featured-card">
										<div className="featured-card-img ">
											<img
												src={ele.img_url}
												onClick={() => getProduct(ele._id)}
												style={{ cursor: 'pointer' }}
											/>
										</div>
										<div
											className="featured-card-info"
											style={{ textAlign: 'center', display: 'block' }}
										>
											<div className="featured-infoo">
												<h6 style={{ marginTop: '20px' }} onClick={() => getProduct(ele._id)}>
													{ele.productName}
												</h6>

												<p>${ele.prodcutPrice}.00</p>
											</div>
										</div>
									</div>
								</SwiperSlide>
							);
						}
					})
				)}
			</Swiper>
		</div>
	);
}
