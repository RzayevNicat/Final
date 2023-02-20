import { Outlet } from 'react-router';
import './App.css';
import NavBar from './components/NavBar';
import { UserProvider } from './context/userInfoContext';

function App() {
	return (
		<div className="body">
			<UserProvider>
				<NavBar />
				<Outlet />
			</UserProvider>
		</div>
	);
}

export default App;
