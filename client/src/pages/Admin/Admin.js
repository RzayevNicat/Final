import { useEffect } from 'react';
import { Outlet } from 'react-router';
import AdminLogin from './components/AdminLogin';
import NavBar from './components/NavBar';
import { UserProvider } from './context/userInfoContext';
const activee = JSON.parse(sessionStorage.getItem('adminLogin'));
function Admin() {
	useEffect(() => {
		if (activee !== true) {
			sessionStorage.setItem('adminLogin', JSON.stringify(false));
		}
	});
	let admin = JSON.parse(sessionStorage.getItem('adminLogin'));
	return (
		<div className="body">
			{admin ? (
				<UserProvider>
					<NavBar />
					<Outlet />
				</UserProvider>
			) : (
				<AdminLogin />
			)}
		</div>
	);
}

export default Admin;
