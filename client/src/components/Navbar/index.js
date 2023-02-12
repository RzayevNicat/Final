import React, { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AiOutlineUser, AiOutlineHeart, AiOutlineSearch } from 'react-icons/ai';
import { BsHandbag } from 'react-icons/bs';
import { ImCross } from 'react-icons/im';
import { useDispatch,useSelector } from 'react-redux';
import { removeBasket } from '../../redux/slice/basketSlice';
import './Navi.css';

function Navbar() {
	const [ money, setMoney ] = useState(true);
	const [ navSize, setnavSize ] = useState('5rem');
	const [ navColor, setnavColor ] = useState('transparent');
	const [checkCard,setCheckCard] = useState(false)
	const dispatch = useDispatch()
	const navigate = useNavigate();
	const listenScrollEvent = () => {
		window.scrollY > 10 ? setnavColor('#111111') : setnavColor('transparent');
		window.scrollY > 10 ? setnavSize('7rem') : setnavSize('5rem');
	};
	const count = useSelector((state) => state.baskett.count);
	let user = JSON.parse(localStorage.getItem('user'));
	let subTotal = 0;
	(user?.userCheckOut || []).forEach((element) => {
		let cnt = element.count * element.elem.prodcutPrice;
		subTotal += cnt;
	});
	const handleDelete = (id)=>{
		 dispatch(removeBasket(id))
		 window.location.reload()
   }
	useEffect(() => {
		window.addEventListener('scroll', listenScrollEvent);
		return () => {
			window.removeEventListener('scroll', listenScrollEvent);
		};
	}, [count]);
	const handleUser = () => {
		navigate('/profile');
	};

	return (
		<div
			className="nav"
			style={{
				backgroundColor: navColor,
				height: navSize,
				transition: 'all 1s'
			}}
		>
			<img src="https://www.portotheme.com/magento2/porto/pub/media/logo/stores/11/logo_ecomwhite_lg.png" />
			<ul>
				<li>
					<Link to={'/'}>Home</Link>
				</li>
				<li>
					<Link to={'categories'}>Categroies</Link>
				</li>
				<li>
					<Link to={'/'}>About Us</Link>
				</li>
				<li>
					<Link to={'/'}>Blog</Link>
				</li>
				<li>
					<Link to={'/'}>Contact Us</Link>
				</li>
			</ul>
			<div className="nav-btns">
				<button onClick={() => (money ? setMoney(false) : setMoney(true))}>
					{money === true ? 'USD' : 'EUR'}
				</button>
				<AiOutlineUser className="icon-nav" onClick={handleUser} />
				<AiOutlineSearch className="icon-nav" />
				<div className="count">
					<BsHandbag className="icon-nav" onClick={()=> checkCard? setCheckCard(false): setCheckCard(true)}/> <span>{count}</span>
				</div>
			</div>
			{
				checkCard?<div className="checkOut-card">
				<div className="item-count">
					<p>{count} ITEM</p>
					<Link to={'cart'}>VIEW CART</Link>
				</div>
				<hr />
				<div className="check-card">
					{count === 0 ? (
						<p>You have no items in your shopping cart.</p>
					) : (
						<div className="check-products">
							{(user?.userCheckOut || []).map((element, index) => (
								<div className="check-product" key={index}>
									<div className="check-name">
										<h5>{element.elem.productName}</h5>
										<ImCross className="check-cross" onClick={()=> handleDelete(element.elem._id)}/>
									</div>
									<div className="check-img">
										<div className="check-info">
											<p>${element.elem.prodcutPrice * element.count}.00</p>
											<div className="count-input">
												<label>Count: </label>
												<input value={element.count} />
											</div>
										</div>
										<img src={element.elem.img_url} />
									</div>
									<hr />
								</div>
							))}
							<div className="total">
								<h4>SUB TOTAL: </h4>
								<h4>${subTotal}.00</h4>
							</div>
						</div>
					)}
				</div>
				<button className="btn-check">
					<Link to={'/checkout'} onClick={()=> setCheckCard(false)}>GO TO CHECKOUT</Link>
				</button>
			</div>:null
			}
			
		</div>
	);
}

export default Navbar;
