import { Outlet } from 'react-router-dom';
import './App.css';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import { FilterProvider } from './context/FilterContext';

function App() {
	return (
		<div className="App">
			<FilterProvider>
				<Navbar />
				<Outlet />
			</FilterProvider>

			<Footer />
		</div>
	);
}

export default App;
