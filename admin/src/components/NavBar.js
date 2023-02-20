import React, { useState } from 'react';
import './SideBar.css';
import { RiAdminFill } from 'react-icons/ri';
import { AiOutlineClose, AiOutlineHome, AiOutlineUser } from 'react-icons/ai';
import { ImStatsBars } from 'react-icons/im';
import { BsFillPersonCheckFill } from 'react-icons/bs';
import { MdProductionQuantityLimits } from 'react-icons/md';
import { FiSettings } from 'react-icons/fi';
import { Link } from 'react-router-dom';
function NavBar() {
	return (
		<div className="sidebar">
			<div className="bar-header">
				<div className="me">
					<RiAdminFill className="icon" />
					<h1>Admin</h1>
				</div>
				<div />
			</div>

			<div className="bar-body">
				<Link className="section " to={'/'}>
					<AiOutlineHome className="icon-body" />
					<h5>Home</h5>
				</Link>
				<Link className="section " to={'dashboard'}>
					<ImStatsBars className="icon-body" />
					<h5>Dashboard</h5>
				</Link>
				<Link className="section " to={'users'}>
					<AiOutlineUser className="icon-body" />
					<h5>Users</h5>
				</Link>
				<Link className="section " to={'products'}>
					<MdProductionQuantityLimits className="icon-body" />
					<h5>Products</h5>
				</Link>
				<Link className="section " to={'customer'}>
					<BsFillPersonCheckFill className="icon-body" />
					<h5>Customers</h5>
				</Link>
			</div>

			<div className="bar-footer">
				<FiSettings className="icon-body" />
			</div>
		</div>
	);
}

export default NavBar;
