import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import tsmService from './tsmService';

//get user from local storage
const user = JSON.parse(localStorage.getItem('user'));
const tsmApiKey = JSON.parse(localStorage.getItem('tsmApiKey'));

const initialState = {
	tsmApiKey: tsmApiKey ? tsmApiKey : null,
	isError: false,
	isSuccess: false,
	isLoading: false,
	message: '',
};

export const getApiKey = createAsyncThunk(
	'tsm/getApiKey',
	async (user, thunkAPI) => {
		try {
			const token = thunkAPI.getState().auth.user.token;
			return await tsmService.getApiKey(user, token);
		} catch (err) {
			const message =
				(err.response && err.response.data && err.response.data.message) ||
				err.message ||
				err.toString();
			return thunkAPI.rejectWithValue(message);
		}
	}
);

export const tsmSlice = createSlice({
	name: 'tsm',
	initialState,
	reducers: {
		reset: (state) => {
			state.isLoading = false;
			state.isError = false;
			state.isSuccess = false;
			state.message = '';
		},
	},
	extraReducers: (builder) => {
		builder
			//GET API KEY CASES
			.addCase(getApiKey.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getApiKey.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.tsmApiKey = action.payload;
			})
			.addCase(getApiKey.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
				state.tsmApiKey = null;
			});
	},
});

export const { reset } = tsmSlice.actions;
export default tsmSlice.reducer;
