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
import ResetPassword from './pages/ResetPassword';
import ViewCart from './pages/ViewCart';
import ContactUs from './pages/ContactUs';
import About from './pages/AboutUs';
import Admin from './pages/Admin/Admin';
import AdminHome from './pages/Admin/pages/AdminHome';
import Products from './pages/Admin/pages/Products/Products';
import Update from './pages/Admin/pages/ProductUpdate/Update';
import Added from './pages/Admin/pages/CreateProduct/Added';
import Users from './pages/Admin/pages/Users/index';
import UserProfile from './pages/Admin/pages/UserProfile/index';
import UserCreate from './pages/Admin/pages/UserCreate/index';
import Customers from './pages/Admin/pages/Customers';
import CustomerCreate from './pages/Admin/pages/CustomerCreate';
import DetailsCustomers from './pages/Admin/pages/DetailsCustomers';
import CustomerCv from './pages/CutomerCv';
import ProductDetails from './pages/Admin/pages/ProductDetails';

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
			},

			{
				path: 'cart',
				element: <ViewCart />
			},
			{
				path: 'contactus',
				element: <ContactUs />
			},
			{
				path: 'aboutus',
				element: <About />
			},
			{
				path: 'aboutus/joinTeam',
				element: <CustomerCv />
			}
		]
	},
	{
		path: 'resetPassword/:token',
		element: <ResetPassword />
	},
	{
		path: 'admin',
		element: <Admin />,
		children: [
			{
				path: '/admin',
				element: <AdminHome />
			},
			{
				path: '/admin/products',
				element: <Products />
			},
			{
				path: '/admin/products/update/:id',
				element: <Update />
			},
			{
				path: '/admin/products/added',
				element: <Added />
			},
			{
				path: '/admin/users',
				element: <Users />
			},
			{
				path: '/admin/users/userProfile/:id',
				element: <UserProfile />
			},
			{
				path: '/admin/userCreate',
				element: <UserCreate />
			},
			{
				path: '/admin/customer',
				element: <Customers />
			},
			{
				path: '/admin/customerCreate',
				element: <CustomerCreate />
			},
			{
				path: '/admin/detailsCustomer/:id',
				element: <DetailsCustomers />
			},
			{
				path: '/admin/ProductDetails/:id',
				element: <ProductDetails />
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
