import { Outlet } from 'react-router-dom';
import './App.css';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import { useSelector } from 'react-redux';
import Loading from './components/Loading';
import { FilterProvider } from './context/FilterContext';
import { QuickProvider } from './context/QuickView';
import { Helmet } from 'react-helmet';
function App() {
	const status = useSelector((state) => state.data.status);
	// http://4.bp.blogspot.com/-UnGUHrE1a2A/Ut0ypU8lVaI/AAAAAAAAABY/qqNsfMYpO0U/s1600/e-commerce+logo.png
	return (
		<div className="App">
			<Helmet>
				<meta charSet="utf-8" />
				<title>Home</title>
				<link rel="icon" href="https://tse3.mm.bing.net/th?id=OIP.eEe6EyjypQNNMmMgKKLU5wHaHa&pid=Api&P=0" />
			</Helmet>
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
