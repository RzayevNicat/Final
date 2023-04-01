import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchProducts = createAsyncThunk('products/getProducts', async () => {
	const res = await axios.get('https://finalldaaqaqa.herokuapp.com/products');
	return res.data.data;
});

export const productsSlice = createSlice({
	name: 'data',
	initialState: {
		items: [],
		status: 'idle',
		haspage: true
	},
	reducers: {},
	extraReducers: {
		[fetchProducts.pending]: (state, action) => {
			state.status = 'loading';
		},
		[fetchProducts.fulfilled]: (state, action) => {
			state.items = [ ...state.items, ...(action.payload || []) ];
			state.status = 'succeeded';
		},
		[fetchProducts.rejected]: (state, action) => {
			state.status = 'failed';
			state.error = action.error.message;
		}
	}
});

export default productsSlice.reducer;
