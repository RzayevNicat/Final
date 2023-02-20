import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
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
						alert('This product is on the Wishlist')
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
					userWishlist: state.wishList
				};
				localStorage.setItem('user',JSON.stringify(user))
				axios.put(`http://localhost:3000/users/${dataas._id}`,user)
				alert('Added Wishlist')
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
				userWishlist: state.wishList
			};
			localStorage.setItem('user',JSON.stringify(user))
			axios.put(`http://localhost:3000/users/${dataas._id}`,user)
			
		}
	}
});
export const { addWish, removeWish } = wishListSlice.actions;

export default wishListSlice.reducer;
