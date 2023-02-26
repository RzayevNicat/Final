import React, { useEffect, useState } from 'react';
import './Footer.css';
import { FaFacebookF, FaGithub, FaLinkedinIn } from 'react-icons/fa';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
function Footer() {
	const [ email, setEmail ] = useState('');
	const [ user, setUser ] = useState({});
	const [ dataUser, setDataUser ] = useState({});
	const [ active, setActive ] = useState(false);
	const navigate = useNavigate();
	useEffect(
		() => {
			let userId = JSON.parse(localStorage.getItem('user'));
			setUser(userId);
			axios.get(`http://localhost:3000/users/${user?._id}`).then((res) => setDataUser(res.data.data));
			const userlogin = JSON.parse(sessionStorage.getItem('userLogin'));
			setActive(userlogin);
		},
		[ user?._id, dataUser ]
	);

	const handleSubmit = (e) => {
		e.preventDefault();
		if (active === false) {
			toast.info('Please, login', {
				position: 'bottom-right',
				autoClose: 3000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: 'dark'
			});
		} else {
			if (dataUser.subscribe !== false) {
				toast.info('You are already subscribed', {
					position: 'bottom-right',
					autoClose: 3000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
					theme: 'dark'
				});
			} else if (dataUser.email !== email) {
				toast.error('The email is incorrect', {
					position: 'bottom-right',
					autoClose: 3000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
					theme: 'dark'
				});
			} else {
				axios.put(`http://localhost:3000/users/${user?._id}`, {
					subscribe: true
				});
				toast.success('You are subscribed', {
					position: 'bottom-right',
					autoClose: 3000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
					theme: 'dark'
				});
			}
		}
		setEmail('');
	};
	return (
		<div className="footer">
			<div className="subscribe-line">
				<div className="subscribe">
					<div className="subs-info">
						<h3>SUBSCRIBE NEWSLETTER</h3>
						<p>Get all the latest information on Events, Sales and Offers.</p>
					</div>
					<div className="subs-input">
						<form onSubmit={handleSubmit}>
							<input
								value={email}
								type="email"
								placeholder="Email Address"
								onChange={(e) => setEmail(e.target.value)}
							/>{' '}
							<button>SUBSCRIBE</button>
						</form>
					</div>
					<div className="subs-icon">
						<a href="https://www.facebook.com/rzayev.018/" target="_blank">
							<FaFacebookF className="footer-icon facebook" />
						</a>
						<a href="https://github.com/RzayevNicat" target="_blank">
							<FaGithub className="footer-icon github" />
						</a>
						<a href="https://www.linkedin.com/in/nicat-rzayev-374463219/" target="_blank">
							<FaLinkedinIn className="footer-icon linkedin" />
						</a>
					</div>
				</div>
				<hr />
			</div>
			<div className="porto-footer">
				<div className="footer-logo">
					<img src="https://www.portotheme.com/magento2/porto/pub/media/logo/default/logo_ecomwhite_lg.png" />
					<p>Lorem ipsum dolor sit amet, consectetur adipis.</p>
					<h1>QUESTIONS?</h1>
					<span>+994 70 728 38 64</span>
				</div>
				<div className="footer-list">
					<div>
						<h1>Account</h1>
						<div className="account">
							<ul>
								<li>About us</li>
								<li>Contact us</li>
								<li>My Account</li>
								<li>Payment Methods</li>
							</ul>
							<ul>
								<li>Order history</li>
								<li>Advanced search</li>
								<li>Login</li>
							</ul>
						</div>
					</div>
					<div className="abt">
						<h1>About</h1>
						<div className="about">
							<ul>
								<li>About Porto</li>
								<li>Our Guarantees</li>
								<li>Terms And Conditions</li>
								<li>Privacy Policy</li>
							</ul>
							<ul>
								<li>Return Policy</li>
								<li>Intellectual Property</li>
								<li>Claims</li>
								<li>Site Map</li>
							</ul>
						</div>
					</div>
				</div>
				<div className="footer-featured">
					<h1>Features</h1>
					<ul>
						<li>Powerful Admin Panel</li>
						<li>Mobile & Retina Optimized</li>
						<li>Super Fast WordPress Theme</li>
					</ul>
				</div>
			</div>
			<hr />
			<div className="copy-right">© Porto Magento 2023. All Rights Reserved</div>
		</div>
	);
}

export default Footer;
