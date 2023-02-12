import { createSlice } from '@reduxjs/toolkit';

const dataas = JSON.parse(localStorage.getItem('user'));
let counter = 0;
(dataas?.userCheckOut || []).forEach((element) => {
	counter += element.count;
});
const initialState = {
	value: dataas?.userCheckOut || [],
	count: counter
};

const basketSlice = createSlice({
	name: 'baskett',
	initialState,
	reducers: {
		addBasket: (state, actions) => {
			if (state.value.some((x) => x.elem._id === actions.payload._id)) {
				state.value.forEach((element) => {
					if (element.elem._id === actions.payload._id) {
						element.count = element.count + 1;
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
							userCheckOut: state.value,
							userWishlist: dataas.userWishlist
						};

						localStorage.setItem('user', JSON.stringify(user));
					}
				});
			} else {
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
					userCheckOut: state.value,
					userWishlist: dataas.userWishlist
				};
				state.value.push({ count: 1, elem: actions.payload });
				localStorage.setItem('user', JSON.stringify(user));
			}
			state.count += 1;
		},
		removeBasket: (state,actions)=>{
			let copy = state.value.filter(x=>x.elem._id !==actions.payload)
			let userCopy = {
				_id: dataas._id,
				name: dataas.name,
				surname: dataas.surname,
				email: dataas.email,
				gender: dataas.gender,
				src:dataas.src,
				options: dataas.options,
				password: dataas.password,
				userCard: dataas.userCard,
				userCheckOut: copy,
				userWishlist: dataas.userWishlist
			};
			localStorage.setItem('user',JSON.stringify(userCopy))
		},
		deleteBasket: (state, actions) => {
			state.value.forEach((element) => {
				if (element.elem._id === actions.payload._id) {
					element.count = element.count - 1;
					if (element.count === 0) {
						state.value = state.value.filter((x) => x.elem._id !== actions.payload._id);
					}
				}
			});
			state.count -= 1;
		}
	}
});

export const { addBasket, deleteBasket,removeBasket } = basketSlice.actions;

export default basketSlice.reducer;
