import { configureStore } from '@reduxjs/toolkit';
import productsSlice from '../slice/dataSlice';

export const store = configureStore({
	reducer: {
		data: productsSlice
	}
});
