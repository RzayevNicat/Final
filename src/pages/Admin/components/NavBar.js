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
		<div className="admin-sidebar">
			<div className="admin-bar-header">
				<div className="admin-me">
					<RiAdminFill className="admin-icon" />
					<h1>Admin</h1>
				</div>
				<div />
			</div>

			<div className="admin-bar-body">
				<Link className="admin-section " to={'/admin'}>
					<AiOutlineUser className="admin-icon-body" />
					<h5>Users</h5>
				</Link>
				<Link className="admin-section " to={'products'}>
					<MdProductionQuantityLimits className="admin-icon-body" />
					<h5>Products</h5>
				</Link>
				<Link className="admin-section " to={'customer'}>
					<BsFillPersonCheckFill className="admin-icon-body" />
					<h5>Customers</h5>
				</Link>
			</div>

			<div className="admin-bar-footer">
				<FiSettings className="admin-icon-body" />
			</div>
		</div>
	);
}

export default NavBar;
