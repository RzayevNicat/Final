import React from 'react';
import './User.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
function UserProfile() {
	const navigate = useNavigate();
	const user = JSON.parse(localStorage.getItem('user'));
	const handleLogOut = () => {
		axios.get('http://localhost:3000/logout');
		sessionStorage.setItem('userLogin', JSON.stringify(false));
		localStorage.removeItem('user');
		navigate('/');
		window.location.reload();
	};
	return (
		<div className="userProfile">
			<div className="user-info">
				<div className="user-img">
					<img src={user.src} />
					<button>Edit</button>
				</div>

				<div className="user-infos">
					<h1>
						{user.name} {user.surname}
					</h1>
					<p>{user.email}</p>
				</div>
				<button className="logOut" onClick={handleLogOut}>
					Log Out
				</button>
			</div>
		</div>
	);
}

export default UserProfile;
