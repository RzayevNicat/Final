import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/Home';
import Products from './pages/Products';
import Update from './pages/Update';
import Added from './pages/Added';
import 'bootstrap/dist/css/bootstrap.min.css';
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
				path: 'products',
				element: <Products />
			},
			{
				path: 'products/update/:prodId',
				element: <Update />
			},
			{
				path: 'products/added',
				element: <Added />
			}
		]
	}
]);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<RouterProvider router={router} />);
