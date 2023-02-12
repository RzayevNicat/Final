import { configureStore } from '@reduxjs/toolkit';
import productsSlice from '../slice/dataSlice';
import basketReducer from '../slice/basketSlice';
export const store = configureStore({
	reducer: {
		data: productsSlice,
		baskett: basketReducer
	}
});
