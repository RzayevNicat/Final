import axios from 'axios';
import React, { useEffect, useState } from 'react';
import CustomizedAccordions from '../../components/Accorion';
import EmployeSlider from '../../components/EmployeSlider';
import './About.css';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

function About() {
	const [ black, setBlack ] = useState('black');
	const [ customers, setCustomers ] = useState([]);
	const listenScrollEvent = () => {
		window.scrollY > 10 ? setBlack('black') : setBlack('black');
	};
	useEffect(() => {
		window.scrollTo(0, 0);
		axios.get('https://finalldaaqaqa.herokuapp.com/customers').then((res) => setCustomers(res.data.data));
		window.addEventListener('scroll', listenScrollEvent);
		return () => {
			window.removeEventListener('scroll', listenScrollEvent);
		};
	}, []);
	return (
		<div className="about-bg">
			<Helmet>
				<meta charSet="utf-8" />
				<title>About</title>
			</Helmet>
			<div className="black" />
			<div className="about-header">
				<h1>WHO WE ARE</h1>
			</div>
			<div className="about-section-2">
				<div className="about-info">
					<h2>ABOUT US</h2>
					<p>
						Lorem Ipsum is simply dummy text of the printing and typesetting industry. has been the
						industry's
					</p>
					<span>
						long established fact that a reader will be distracted by the readable content of a page when
						looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal
						distribution of letters, as opposed to using 'Content here, content here', making it look like
						readable English.
					</span>
				</div>
				<div className="ipad-resp">
					<div>
						<img src="https://www.portotheme.com/magento2/porto/pub/media/wysiwyg/smartwave/porto/aboutus/18/aboutus.jpg" />
					</div>
					<div>
						<CustomizedAccordions />
					</div>
				</div>
			</div>
			<div className="ourTeam">
				<h3>OUR TEAM</h3>

				<div className="employe-cards">
					{customers.map((elem, index) => {
						if (elem.isActive === true) {
							return (
								<div className="employe-card" key={index}>
									<img src={elem.customerSRC} alt={elem.customerName} />
									<p>
										{elem.customerName} {elem.customerSurname}
									</p>
								</div>
							);
						}
					})}
				</div>
				<div className="employes-button">
					<Link to={'joinTeam'}>JOIN OUR TEAM</Link>
				</div>
			</div>
			<div className="testimonials">
				<h2>TESTIMONIALS</h2>
				<EmployeSlider />
			</div>
		</div>
	);
}

export default About;
