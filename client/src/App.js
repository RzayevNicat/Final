import { Outlet } from 'react-router-dom';
import './App.css';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import { FilterProvider } from './context/FilterContext';
import { QuickProvider } from './context/QuickView';

function App() {
	return (
		<div className="App">
			<FilterProvider>
				<Navbar />
				<QuickProvider>
					<Outlet />
				</QuickProvider>
			</FilterProvider>

			<Footer />
		</div>
	);
}

export default App;
