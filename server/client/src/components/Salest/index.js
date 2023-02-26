import React from 'react';
import './Salest.css';
function Salest() {
	return (
		<div className="salest">
			<div className="sale">
				<img src="https://www.portotheme.com/magento2/porto/pub/media/wysiwyg/smartwave/porto/homepage/18/shop18_home_banner1.jpg" />
				<div className="sale-info">
					<div>
						<h1>Summer Sale</h1>
						<p>20% OFF</p>
					</div>
					<button className="btn-black">SHOP NOW</button>
				</div>
			</div>
			<div className="sale">
				<img src="https://www.portotheme.com/magento2/porto/pub/media/wysiwyg/smartwave/porto/homepage/18/shop18_home_banner2.jpg" />
				<div className="sale-info">
					<div>
						<h1 className="flash">Flash Sale</h1>
						<p className="flashh">30% OFF</p>
					</div>
					<button className="btn-white">SHOP NOW</button>
				</div>
			</div>
		</div>
	);
}

export default Salest;
