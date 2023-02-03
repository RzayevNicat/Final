import React, { useState } from 'react';
import './SideBar.css';
import { RiAdminFill } from 'react-icons/ri';
import { AiOutlineClose, AiOutlineHome } from 'react-icons/ai';
import { ImStatsBars } from 'react-icons/im';
import { BsFillCalendarCheckFill, BsFillPersonCheckFill } from 'react-icons/bs';
import { MdProductionQuantityLimits } from 'react-icons/md';
import { FiSettings } from 'react-icons/fi';
import { Link } from 'react-router-dom';
function NavBar() {
	const [ home, setHome ] = useState(true);
	const [ dasboard, setDashboard ] = useState(false);
	const [ orders, setOrders ] = useState(false);
	const [ products, setProducts ] = useState(false);
	const [ customer, setCustomer ] = useState(false);
	const handleHome = () => {
		setHome(true);
		setDashboard(false);
		setCustomer(false);
		setOrders(false);
		setProducts(false);
	};
	const handleCustomer = () => {
		setHome(false);
		setDashboard(false);
		setCustomer(true);
		setOrders(false);
		setProducts(false);
	};
	const handleDashboard = () => {
		setHome(false);
		setDashboard(true);
		setCustomer(false);
		setOrders(false);
		setProducts(false);
	};
	const handleOrders = () => {
		setHome(false);
		setDashboard(false);
		setCustomer(false);
		setOrders(true);
		setProducts(false);
	};
	const handleProduct = () => {
		setHome(false);
		setDashboard(false);
		setCustomer(false);
		setOrders(false);
		setProducts(true);
	};
	return (
		<div className="sidebar">
			<div className="bar-header">
				<div className="me">
					<RiAdminFill className="icon" />
					<h1>E-Commerce</h1>
				</div>
				<div>
					<AiOutlineClose className="icon close" />
				</div>
			</div>
			<span />
			<div className="bar-body">
				<Link className={home ? 'section active' : 'section'} to={'/'} onClick={handleHome}>
					<AiOutlineHome className="icon-body" />
					<h5>Home</h5>
				</Link>
				<Link className={dasboard ? 'section active' : 'section'} to={'dashboard'} onClick={handleDashboard}>
					<ImStatsBars className="icon-body" />
					<h5>Dashboard</h5>
				</Link>
				<Link className={orders ? 'section active' : 'section'} to={'orders'} onClick={handleOrders}>
					<BsFillCalendarCheckFill className="icon-body" />
					<h5>Orders</h5>
				</Link>
				<Link className={products ? 'section active' : 'section'} to={'products'} onClick={handleProduct}>
					<MdProductionQuantityLimits className="icon-body" />
					<h5>Products</h5>
				</Link>
				<Link className={customer ? 'section active' : 'section'} to={'customer'} onClick={handleCustomer}>
					<BsFillPersonCheckFill className="icon-body" />
					<h5>Customers</h5>
				</Link>
			</div>

			<div className="bar-footer">
				<FiSettings className="icon-body" />
				<h5>Settings</h5>
			</div>
		</div>
	);
}

export default NavBar;
