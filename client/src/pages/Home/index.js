import React, { useEffect, useState } from 'react';
import './Home.css';

import Carousel from '../../components/Carousel';

import { BsSquare } from 'react-icons/bs';
import Products from '../../components/Products';
function Home() {
	return (
		<div className="home">
			<Carousel />

			<div className="shop">
				<div className="shop-by">
					<h3>SHOP BY : </h3>
					<ul>
						<li>
							<BsSquare className="shop-icon" /> All
						</li>
						<li>
							<BsSquare className="shop-icon" /> Acsesories
						</li>
						<li>
							<BsSquare className="shop-icon" /> Electronics
						</li>
						<li>
							<BsSquare className="shop-icon" /> Men
						</li>
						<li>
							<BsSquare className="shop-icon" /> Women
						</li>
						<li>
							<BsSquare className="shop-icon" /> Shoes
						</li>
					</ul>
				</div>
				<hr />
				<Products />
			</div>
		</div>
	);
}

export default Home;
