import React, { useEffect, useState } from 'react';
import CustomerCreate from '../Admin/pages/CustomerCreate';
import { Helmet } from 'react-helmet';
function CustomerCv() {
	const [ black, setBlack ] = useState('black');
	const listenScrollEvent = () => {
		window.scrollY > 10 ? setBlack('black') : setBlack('black');
	};
	useEffect(() => {
		window.scrollTo(0, 0);

		window.addEventListener('scroll', listenScrollEvent);
		return () => {
			window.removeEventListener('scroll', listenScrollEvent);
		};
	}, []);
	return (
		<div>
			<Helmet>
				<meta charSet="utf-8" />
				<title>CV</title>
			</Helmet>
			<div className="black" />
			<CustomerCreate />
		</div>
	);
}

export default CustomerCv;
