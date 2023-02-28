import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';
const dataas = JSON.parse(localStorage.getItem('user'));

const initialState = {
	wishList: dataas?.userWishlist || []
};

const wishListSlice = createSlice({
	name: 'wish',
	initialState,
	reducers: {
		addWish: (state, actions) => {
			if (state.wishList.some((x) => x._id === actions.payload._id)) {
				state.wishList.forEach((element) => {
					if (element._id === actions.payload._id) {
						toast.error('This product already wishlist!', {
							position: 'bottom-right',
							autoClose: 3000,
							hideProgressBar: false,
							closeOnClick: true,
							pauseOnHover: true,
							draggable: true,
							progress: undefined,
							theme: 'dark'
						});
					}
				})
			}else{
				state.wishList = [ ...state.wishList,actions.payload ];
				let user = {
					_id: dataas._id,
					name: dataas.name,
					surname: dataas.surname,
					email: dataas.email,
					gender: dataas.gender,
					src:dataas.src,
					options: dataas.options,
					password: dataas.password,
					userCard: dataas.userCard,
					userCheckOut: dataas.userCheckOut,
					userWishlist: state.wishList,
					country:dataas.country,
								mmyy:dataas.mmyy,
								cvv:dataas.cvv,
								postalCode:dataas.postalCode,
								cardNumber:dataas.cardNumber,
								phoneNumber:dataas.phoneNumber
				};
				localStorage.setItem('user',JSON.stringify(user))
				axios.put(`https://finalldaaqaqa.herokuapp.com/users/${dataas._id}`,user)
				toast.success('Added Wishlist!', {
					position: 'bottom-right',
					autoClose: 3000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
					theme: 'dark'
				});
			}

		},
		removeWish: (state, actions) => {
			state.wishList = state.wishList.filter((x) => x._id !== actions.payload._id);
			let user = {
				_id: dataas._id,
				name: dataas.name,
				surname: dataas.surname,
				email: dataas.email,
				gender: dataas.gender,
				src:dataas.src,
				options: dataas.options,
				password: dataas.password,
				userCard: dataas.userCard,
				userCheckOut: dataas.userCheckOut,
				userWishlist: state.wishList,
				country:dataas.country,
								mmyy:dataas.mmyy,
								cvv:dataas.cvv,
								postalCode:dataas.postalCode,
								cardNumber:dataas.cardNumber,
								phoneNumber:dataas.phoneNumber
			};
			localStorage.setItem('user',JSON.stringify(user))
			axios.put(`https://finalldaaqaqa.herokuapp.com/users/${dataas._id}`,user)
			
		}
	}
});
export const { addWish, removeWish } = wishListSlice.actions;

export default wishListSlice.reducer;
