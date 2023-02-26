import React, { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AiOutlineUser, AiOutlineMenu, AiOutlineSearch } from 'react-icons/ai';
import { BsHandbag } from 'react-icons/bs';
import { ImCross } from 'react-icons/im';
import { useDispatch,useSelector } from 'react-redux';
import { removeBasket } from '../../redux/slice/basketSlice';
import './Navi.css';
import { addBasket,deleteBasket } from '../../redux/slice/basketSlice';
import Search from '../Search';
import SideBar from '../SideBar';
import { useFilter } from '../../context/FilterContext';


function Navbar() {
	const { money, setMoney } = useFilter();
	const [ navSize, setnavSize ] = useState('5rem');
	const [ navColor, setnavColor ] = useState('transparent');
	const [checkCard,setCheckCard] = useState(false)
	const [search,setSearch] = useState(false)
	const {side, setSide} = useFilter()
	const dispatch = useDispatch()
	const navigate = useNavigate();
	const [userCheck,setUserCheck] = useState([])
	const listenScrollEvent = () => {
		window.scrollY > 10 ? setnavColor('#111111') : setnavColor('transparent');
		window.scrollY > 10 ? setnavSize('7rem') : setnavSize('5rem');
	};
	const count = useSelector((state) => state.baskett.count);
	

	let subTotal = 0;
	(userCheck||[]).forEach((element) => {
		let cnt = element.count * element.elem.prodcutPrice;
		subTotal += cnt;
	});
	const handleDelete = (element)=>{
		let usr = userCheck.filter(x=> x.elem._id !== element.elem._id)
		setUserCheck([...usr])
		 dispatch(removeBasket(element))
		 
   }
	useEffect(() => {
		let user = JSON.parse(localStorage.getItem('user'));
		setUserCheck(user?.userCheckOut)
		window.addEventListener('scroll', listenScrollEvent);
		return () => {
			window.removeEventListener('scroll', listenScrollEvent);
		};
	}, [count]);
	const handleUser = () => {
		navigate('/profile');
	};
	const toBasket = (elem) => {
 if (elem.discontinued === false) {
			alert('no stock');
		} else {
			dispatch(addBasket(elem));
		}
	};
	const deletedFromBasket = (elem)=>{
		dispatch(deleteBasket(elem))
	}
	const getProduct = (id) => {
		navigate(`/product/${id}`);
		window.location.reload();
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
			{
				side?<SideBar/>:null
			}
			
			<img src="https://www.portotheme.com/magento2/porto/pub/media/logo/stores/11/logo_ecomwhite_lg.png" />
			<ul>
				<li>
					<Link to={'/'}>Home</Link>
				</li>
				<li>
					<Link to={'categories'} onClick={()=> window.scrollTo(0, 0)}>Categroies</Link>
				</li>
				<li>
					<Link to={'/aboutus'}>About Us</Link>
				</li>
		
				<li>
					<Link to={'contactus'}>Contact Us</Link>
				</li>
			</ul>
			<div className="nav-btns">
				<button className='money' onClick={() => (money ? setMoney(false) : setMoney(true))}>
					{money === true ? 'USD' : 'EUR'}
				</button>
				<AiOutlineMenu className='icon-nav menu-nav' onClick={()=> setSide(true)}/>
				<AiOutlineUser className="icon-nav" onClick={handleUser} />
				<AiOutlineSearch className="icon-nav" onClick={()=> search ===false?setSearch(true):setSearch(false)}/>
				<div className="count">
					<BsHandbag className="icon-nav" onClick={()=> checkCard? setCheckCard(false): setCheckCard(true)}/> <span>{count}</span>
				</div>
			</div>
			{
				checkCard?<div className="checkOut-card">
				<div className="item-count">
					<p>{count} ITEM</p>
					<Link to={'cart'} onClick={()=> setCheckCard(false)}>VIEW CART</Link>
				</div>
				<hr />
				<div className="check-card">
					{count === 0 ? (
						<p>You have no items in your shopping cart.</p>
					) : (
						<div className="check-products">
							{(userCheck||[]).map((element, index) => (
								<div className="check-product" key={index}>
									<div className="check-name">
										<h5>{element.elem.productName}</h5>
										<ImCross className="check-cross" onClick={()=> handleDelete(element)}/>
									</div>
									<div className="check-img">
										<div className="check-info">
											<p>${element.elem.prodcutPrice * element.count}.00</p>
											<div className="count-input">
												<label>Count: </label>
												<button className='increment-nav' onClick={()=> toBasket(element.elem)}>+</button>
												<input value={element.count} />
												<button className='decrement-nav' onClick={()=> deletedFromBasket(element.elem)}>-</button>
											</div>
										</div>
										<img src={element.elem.img_url} onClick={() => getProduct(element.elem._id)}/>
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
			{
				search?<Search/>:null
			}
			
		</div>
	);
}

export default Navbar;
