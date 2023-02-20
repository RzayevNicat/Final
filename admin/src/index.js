import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/Home';
import Products from './pages/Products/Products';
import Update from './pages/ProductUpdate/Update';
import Added from './pages/CreateProduct/Added';
import 'bootstrap/dist/css/bootstrap.min.css';
import Users from './pages/Users';
import UserProfile from './pages/UserProfile';
import UserEdit from './pages/UserCreate';
import UserCreate from './pages/UserCreate';
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
				path: 'products/update/:id',
				element: <Update />
			},
			{
				path: 'products/added',
				element: <Added />
			},
			{
				path: 'users',
				element: <Users />
			},
			{
				path: 'userProfile/:id',
				element: <UserProfile />
			},
			{
				path: 'userCreate',
				element: <UserCreate />
			}
		]
	}
]);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<RouterProvider router={router} />);
