import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import Category from './pages/Categories';
import Home from './pages/Home';
import { Provider } from 'react-redux';
import { store } from './redux/config/store';
import Product from './pages/Product';
import Login from './components/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import CheckOut from './pages/CheckOut';
const router = createBrowserRouter([
	{
		path: '/',
		element: <App />,
		children: [
			{
				path: '/',
				element: <Home />
			},
			{
				path: 'categories',
				element: <Category />
			},
			{
				path: 'product/:id',
				element: <Product />
			},
			{
				path: 'profile',
				element: <Profile />
			},
			{
				path: 'profile/sfjsjfkjfksfjkjkfj',
				element: <Register />
			},
			{
				path: 'checkout',
				element: <CheckOut />
			}
		]
	}
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<Provider store={store}>
		<RouterProvider router={router} />
	</Provider>
);
