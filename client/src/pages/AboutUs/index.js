import React, { useEffect, useState } from 'react';
import CustomizedAccordions from '../../components/Accorion';
import EmployeSlider from '../../components/EmployeSlider';
import './About.css';

function About() {
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
		<div className="about-bg">
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
					<div className="employe-card">
						<img src="https://www.portotheme.com/magento2/porto/pub/media/wysiwyg/smartwave/porto/aboutus/3/member-1.jpg" />
						<p>JANE DOE</p>
					</div>
					<div className="employe-card">
						<img src="https://www.portotheme.com/magento2/porto/pub/media/wysiwyg/smartwave/porto/aboutus/3/member-2.jpg" />
						<p>JOHN DOE</p>
					</div>
					<div className="employe-card">
						<img src="https://www.portotheme.com/magento2/porto/pub/media/wysiwyg/smartwave/porto/aboutus/3/member-3.jpg" />
						<p>GEORGE DOE</p>
					</div>
					<div className="employe-card">
						<img src="https://www.portotheme.com/magento2/porto/pub/media/wysiwyg/smartwave/porto/aboutus/3/member-4.jpg" />
						<p>ALICE DOE</p>
					</div>
				</div>
				<div className="employes-button">
					<button>JOIN OUR TEAM</button>
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
