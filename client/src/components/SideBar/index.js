import React, { useState } from 'react';
import './SideBar.css';
import { AiOutlineMenu } from 'react-icons/ai';
import { ImCross } from 'react-icons/im';
import { Link, useNavigate } from 'react-router-dom';
import { useFilter } from '../../context/FilterContext';
function SideBar() {
	const [ money, setMoney ] = useState(true);
	const navigate = useNavigate();
	const [ name, setName ] = useState(true);
	const [ account, setAccount ] = useState(false);
	const [ usd, setUsd ] = useState(false);
	const { setSide } = useFilter();
	const handleUser = () => {
		navigate('/profile');
		setSide(false);
	};
	const forName = () => {
		setName(true);
		setAccount(false);
		setUsd(false);
	};
	const forAccount = () => {
		setName(false);
		setAccount(true);
		setUsd(false);
	};
	const forMoney = () => {
		setName(false);
		setAccount(false);
		setUsd(true);
	};
	return (
		<div className="sidebar">
			<div className="side-head">
				<h1
					onClick={forName}
					style={{
						color: name ? '#111111' : 'white',
						background: name ? 'white' : '#111111'
					}}
				>
					<AiOutlineMenu />Menu
				</h1>
				<h1
					onClick={forAccount}
					style={{
						color: account ? '#111111' : 'white',
						background: account ? 'white' : '#111111'
					}}
				>
					Account
				</h1>
				<h1
					onClick={forMoney}
					style={{
						color: usd ? '#111111' : 'white',
						background: usd ? 'white' : '#111111'
					}}
				>
					Settings
				</h1>
				<ImCross className="side-icon" onClick={() => setSide(false)} />
			</div>
			{name ? (
				<div className="menu-side">
					<ul>
						<li>
							<Link to={'/'} onClick={() => setSide(false)}>
								Home
							</Link>
							<hr />
						</li>
						<li>
							<Link to={'categories'} onClick={() => setSide(false)}>
								Categroies
							</Link>
							<hr />
						</li>
						<li>
							<Link to={'/aboutus'} onClick={() => setSide(false)}>
								About Us
							</Link>
							<hr />
						</li>
						<li>
							<Link to={'contactus'} onClick={() => setSide(false)}>
								Contact Us
							</Link>
							<hr />
						</li>
					</ul>
				</div>
			) : null}
			{account ? (
				<div className="account-side">
					<ul>
						<li onClick={handleUser}>Login</li>
					</ul>
				</div>
			) : null}
			{usd ? (
				<div className="usd-side">
					<ul className="money" onClick={() => (money ? setMoney(false) : setMoney(true))}>
						<li>{money === true ? 'USD' : 'EUR'}</li>
					</ul>
				</div>
			) : null}
		</div>
	);
}

export default SideBar;
