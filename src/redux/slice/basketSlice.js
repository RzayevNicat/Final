import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
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
			const data = JSON.parse(localStorage.getItem('user'));
			if (state.value.some((x) => x.elem._id === actions.payload._id)) {
				state.value.forEach((element) => {
					if (element.elem._id === actions.payload._id) {
						if (element.count === actions.payload.productStock) {
							toast.error(' No Stock!', {
								position: 'bottom-right',
								autoClose: 3000,
								hideProgressBar: false,
								closeOnClick: true,
								pauseOnHover: true,
								draggable: true,
								progress: undefined,
								theme: 'dark'
							});
						} else {
				
							element.count = element.count + 1;
							let user = {
								_id: data._id,
								name: data.name,
								surname: data.surname,
								email: data.email,
								gender: data.gender,
								src: data.src,
								options: data.options,
								password: data.password,
								userCard: data.userCard,
								userCheckOut: state.value,
								userWishlist: [...data.userWishlist],
								country: data.country,
								mmyy: data.mmyy,
								cvv: data.cvv,
								postalCode: data.postalCode,
								cardNumber: data.cardNumber,
								phoneNumber: data.phoneNumber
							};
							toast.success(' Added Basket!', {
								position: 'bottom-right',
								autoClose: 3000,
								hideProgressBar: false,
								closeOnClick: true,
								pauseOnHover: true,
								draggable: true,
								progress: undefined,
								theme: 'dark'
							});
							localStorage.setItem('user', JSON.stringify(user));
							state.count += 1;
						}
					}
				});
			} else {
				let user = {
					_id: data._id,
					name: data.name,
					surname: data.surname,
					email: data.email,
					gender: data.gender,
					src: data.src,
					options: data.options,
					password: data.password,
					userCard: data.userCard,
					userCheckOut: state.value,
					userWishlist: [...data.userWishlist],
					country: data.country,
					mmyy: data.mmyy,
					cvv: data.cvv,
					postalCode: data.postalCode,
					cardNumber: data.cardNumber,
					phoneNumber: data.phoneNumber
				};
				state.value.push({ count: 1, elem: actions.payload });
				localStorage.setItem('user', JSON.stringify(user));
				state.count += 1;
				toast.success(' Added Basket!', {
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
		removeBasket: (state, actions) => {
			const data = JSON.parse(localStorage.getItem('user'));
			state.value = state.value.filter((x) => x.elem._id !== actions.payload.elem._id);
			state.count -= actions.payload.count;
			let userCopy = {
				_id: data._id,
				name: data.name,
				surname: data.surname,
				email: data.email,
				gender: data.gender,
				src: data.src,
				options: data.options,
				password: data.password,
				userCard: data.userCard,
				userCheckOut: state.value,
				userWishlist: data.userWishlist,
				country: data.country,
				mmyy: data.mmyy,
				cvv: data.cvv,
				postalCode: data.postalCode,
				cardNumber: data.cardNumber,
				phoneNumber: data.phoneNumber
			};
			toast.info(' Removed Basket!', {
				position: 'bottom-right',
				autoClose: 3000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: 'dark'
			});
			localStorage.setItem('user', JSON.stringify(userCopy));
		},
		productAdd: (state, actions) => {
			const data = JSON.parse(localStorage.getItem('user'));
			if (state.value.some((x) => x.elem._id === actions.payload.elem._id)) {
				state.value.forEach((element) => {
					if (element.elem._id === actions.payload.elem._id) {
						let copy = element.count + actions.payload.count;

						if (copy > actions.payload.elem.productStock) {
							toast.error(' No Stock!', {
								position: 'bottom-right',
								autoClose: 3000,
								hideProgressBar: false,
								closeOnClick: true,
								pauseOnHover: true,
								draggable: true,
								progress: undefined,
								theme: 'dark'
							});
						} else {
							let user = {
								_id: data._id,
								name: data.name,
								surname: data.surname,
								email: data.email,
								gender: data.gender,
								src: data.src,
								options: data.options,
								password: data.password,
								userCard: data.userCard,
								userCheckOut: state.value,
								userWishlist: data.userWishlist,
								country: data.country,
								mmyy: data.mmyy,
								cvv: data.cvv,
								postalCode: data.postalCode,
								cardNumber: data.cardNumber,
								phoneNumber: data.phoneNumber
							};
							element.count += actions.payload.count;
							localStorage.setItem('user', JSON.stringify(user));

							state.count += actions.payload.count;
							toast.success(' Added Basket!', {
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
					}
				});
			} else {
				if (actions.payload.elem.productStock < actions.payload.count) {
					toast.error(' No Stock!', {
						position: 'bottom-right',
						autoClose: 3000,
						hideProgressBar: false,
						closeOnClick: true,
						pauseOnHover: true,
						draggable: true,
						progress: undefined,
						theme: 'dark'
					});
				} else {
					let user = {
						_id: data._id,
						name: data.name,
						surname: data.surname,
						email: data.email,
						gender: data.gender,
						src: data.src,
						options: data.options,
						password: data.password,
						userCard: data.userCard,
						userCheckOut: state.value,
						userWishlist: data.userWishlist,
						country: data.country,
						mmyy: data.mmyy,
						cvv: data.cvv,
						postalCode: data.postalCode,
						cardNumber: data.cardNumber,
						phoneNumber: data.phoneNumber
					};
					state.value.push({ count: actions.payload.count, elem: actions.payload.elem });
					localStorage.setItem('user', JSON.stringify(user));
					state.count += actions.payload.count;
					toast.success(' Added Basket!', {
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
			}
		},
		viewAdd: (state, actions) => {
			const data = JSON.parse(localStorage.getItem('user'));
			let newArr = []
			state.value.forEach((ele) => {
				actions.payload.forEach((element) => {
					if (ele.elem._id === element.elem._id) {
						if (ele.elem.productStock < element.count) {
							
							toast.error(`${element.count} pieces from the${ele.elem.productName}are out of stock `, {
								position: 'bottom-right',
								autoClose: 3000,
								hideProgressBar: false,
								closeOnClick: true,
								pauseOnHover: true,
								draggable: true,
								progress: undefined,
								theme: 'dark'
							});
							newArr.push(ele)
						} else {
							
							newArr.push(element)
							state.value = [ ...newArr ];
							console.log(state.value);
							let user = {
								_id: data._id,
								name: data.name,
								surname: data.surname,
								email: data.email,
								gender: data.gender,
								src: data.src,
								options: data.options,
								password: data.password,
								userCard: data.userCard,
								userCheckOut: state.value,
								userWishlist: data.userWishlist,
								country: data.country,
								mmyy: data.mmyy,
								cvv: data.cvv,
								postalCode: data.postalCode,
								cardNumber: data.cardNumber,
								phoneNumber: data.phoneNumber
							};

							localStorage.setItem('user', JSON.stringify(user));
							window.location.reload()
						}
					}
				});
			});
		},
		deleteBasket: (state, actions) => {
			const data = JSON.parse(localStorage.getItem('user'));
			state.value.forEach((element) => {
				if (element.elem._id === actions.payload._id) {
					element.count = element.count - 1;
					if (element.count === 0) {
						state.value = state.value.filter((x) => x.elem._id !== actions.payload._id);
					}
					let user = {
						_id: data._id,
						name: data.name,
						surname: data.surname,
						email: data.email,
						gender: data.gender,
						src: data.src,
						options: data.options,
						password: data.password,
						userCard: data.userCard,
						userCheckOut: state.value,
						userWishlist: data.userWishlist,
						country: data.country,
						mmyy: data.mmyy,
						cvv: data.cvv,
						postalCode: data.postalCode,
						cardNumber: data.cardNumber,
						phoneNumber: data.phoneNumber
					};
					toast.info('Remove Basket!', {
						position: 'bottom-right',
						autoClose: 3000,
						hideProgressBar: false,
						closeOnClick: true,
						pauseOnHover: true,
						draggable: true,
						progress: undefined,
						theme: 'dark'
					});
					localStorage.setItem('user', JSON.stringify(user));
				}
			});
			state.count -= 1;
		}
	}
});

export const { addBasket, deleteBasket, removeBasket, productAdd, viewAdd } = basketSlice.actions;

export default basketSlice.reducer;
