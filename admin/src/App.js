import { Outlet } from 'react-router';
import './App.css';
import NavBar from './components/NavBar';

function App() {
	return (
		<div className="body">
			<NavBar />
			<Outlet />
		</div>
	);
}

export default App;
