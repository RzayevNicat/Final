import React, { useEffect, useState } from 'react';
import Login from '../../components/Login';
import UserProfile from '../../components/UerProfile';
import './Profile.css';
import { ToastContainer } from 'react-toastify';
function Profile() {
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
	let userLogin = JSON.parse(sessionStorage.getItem('userLogin'));
	return (
		<div className="profile-choose">
			<div className={black} />
			<ToastContainer
				position="top-right"
				autoClose={3000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				theme="light"
			/>
			{/* Same as */}
			<ToastContainer />
			{userLogin === true ? <UserProfile /> : <Login />}
		</div>
	);
}

export default Profile;
