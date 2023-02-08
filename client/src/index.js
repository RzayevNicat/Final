import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import Category from './pages/Categories';
import Home from './pages/Home';
import { Provider } from 'react-redux';
import { store } from './redux/config/store';
import Product from './pages/Product';
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
