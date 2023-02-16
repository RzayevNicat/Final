import { configureStore } from '@reduxjs/toolkit';
import productsSlice from '../slice/dataSlice';
import basketReducer from '../slice/basketSlice';
import wishListReducer from '../slice/wishListSlice';
export const store = configureStore({
	reducer: {
		data: productsSlice,
		baskett: basketReducer,
		wish: wishListReducer
	}
});
