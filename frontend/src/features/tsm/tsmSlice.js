import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import tsmService from './tsmService';

//get user from local storage
//const user = JSON.parse(localStorage.getItem('user'));
const tsmApiAuth = JSON.parse(localStorage.getItem('tsmApiKey'));
const tsmApiKey = { tsmApiKey: tsmApiAuth.access_token };

const initialState = {
	tsmApiKey: tsmApiKey ? tsmApiKey : null,
	tsmRealms: null,
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

export const getRealms = createAsyncThunk(
	'tsm/getRealms',
	async (user, thunkAPI) => {
		try {
			const token = thunkAPI.getState().auth.user.token;
			return await tsmService.getRealms(tsmApiKey, token);
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
			})
			//GET REALMS KEY CASES
			.addCase(getRealms.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getRealms.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.tsmRealms = action.payload;
			})
			.addCase(getRealms.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
				state.tsmRealms = null;
			});
	},
});

export const { reset } = tsmSlice.actions;
export default tsmSlice.reducer;
