import { useEffect } from 'react';
import { Outlet } from 'react-router';
import AdminLogin from './components/AdminLogin';
import NavBar from './components/NavBar';
import { UserProvider } from './context/userInfoContext';
import { ToastContainer } from 'react-toastify';
import { Helmet } from 'react-helmet';
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
			<Helmet>
				<meta charSet="utf-8" />
				<title>Admin</title>
				<link rel="icon" href="https://tse3.mm.bing.net/th?id=OIP.eEe6EyjypQNNMmMgKKLU5wHaHa&pid=Api&P=0" />
			</Helmet>
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
