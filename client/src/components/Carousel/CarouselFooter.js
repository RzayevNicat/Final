import React from 'react';
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
import { useQuick } from '../../context/QuickView';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addBasket } from '../../redux/slice/basketSlice';
export default function CarouselFooter() {
	const dispatch = useDispatch();
	const data = useSelector((state) => state.data.items);
	const { setDetails } = useQuick();
	const navigate = useNavigate();
	const activee = JSON.parse(sessionStorage.getItem('userLogin'));
	const getProduct = (id) => {
		navigate(`/product/${id}`);
		window.location.reload();
	};
	const toBasket = (elem) => {
		if (activee === false) {
			navigate('/profile');
		} else if (elem.discontinued === false) {
			alert('no stock');
		} else {
			dispatch(addBasket(elem));
		}
	};
	console.log(data);
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
							<SwiperSlide key={index}>
								<div className="featured-card">
									<div className="featured-card-img ">
										<img
											src={ele.img_url}
											onClick={() => getProduct(ele._id)}
											style={{ cursor: 'pointer' }}
										/>

										<BsHandbag className="img-icon" onClick={() => toBasket(ele)} />

										<h4 onClick={() => setDetails(ele)}>QUIK VIEW</h4>
									</div>
									<div className="featured-card-info">
										<div className="featured-infoo">
											<h6 onClick={() => getProduct(ele._id)}>{ele.productName}</h6>

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
