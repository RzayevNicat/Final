import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineUser, AiOutlineHeart, AiOutlineSearch } from 'react-icons/ai';
import { BsHandbag } from 'react-icons/bs';
import './Navi.css';
function Navbar() {
	const [ money, setMoney ] = useState(true);
	const [ navSize, setnavSize ] = useState('5rem');
	const [ navColor, setnavColor ] = useState('transparent');
	const listenScrollEvent = () => {
		window.scrollY > 10 ? setnavColor('#111111') : setnavColor('transparent');
		window.scrollY > 10 ? setnavSize('7rem') : setnavSize('5rem');
	};
	useEffect(() => {
		window.addEventListener('scroll', listenScrollEvent);
		return () => {
			window.removeEventListener('scroll', listenScrollEvent);
		};
	}, []);
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
				<AiOutlineUser className="icon-nav" />
				<AiOutlineHeart className="icon-nav" />
				<AiOutlineSearch className="icon-nav" />
				<div className="count">
					<BsHandbag className="icon-nav" /> <span>0</span>
				</div>
			</div>
		</div>
	);
}

export default Navbar;
