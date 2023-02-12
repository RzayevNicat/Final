import { Outlet } from 'react-router-dom';
import './App.css';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import { useSelector } from 'react-redux';
import Loading from './components/Loading';
import { FilterProvider } from './context/FilterContext';
import { QuickProvider } from './context/QuickView';

function App() {
	const status = useSelector((state) => state.data.status);
	return (
		<div className="App">
			{status === 'loading' ? (
				<Loading className="loading" />
			) : (
				<FilterProvider>
					<Navbar />
					<QuickProvider>
						<Outlet />
					</QuickProvider>
					<Footer />
				</FilterProvider>
			)}
		</div>
	);
}

export default App;
