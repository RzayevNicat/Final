import React from 'react';
import { Helmet } from 'react-helmet';
function Home() {
	return (
		<div>
			<Helmet>
				<meta charSet="utf-8" />
				<title>Admin</title>
			</Helmet>
			<h1>DasgBoard</h1>
		</div>
	);
}

export default Home;
