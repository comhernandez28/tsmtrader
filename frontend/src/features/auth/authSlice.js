import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authService from './authService';

//get user from local storage
const user = JSON.parse(localStorage.getItem('user'));

const initialState = {
	user: user ? user : null,
	isError: false,
	isSuccess: false,
	isLoading: false,
	message: '',
};

//Register User
export const register = createAsyncThunk(
	'auth/register',
	async (user, thunkAPI) => {
		try {
			return await authService.register(user);
		} catch (err) {
			const message =
				(err.response && err.response.data && err.response.data.message) ||
				err.message ||
				err.toString();
			return thunkAPI.rejectWithValue(message);
		}
	}
);

//Login
export const login = createAsyncThunk('auth/login', async (user, thunkAPI) => {
	try {
		return await authService.login(user);
	} catch (err) {
		const message =
			(err.response && err.response.data && err.response.data.message) ||
			err.message ||
			err.toString();
		return thunkAPI.rejectWithValue(message);
	}
});

//Logout
export const logout = createAsyncThunk('auth/logout', async () => {
	await authService.logout();
});

//Update User
export const update = createAsyncThunk(
	'auth/update',
	async (user, thunkAPI) => {
		try {
			return await authService.update(user, user.id);
		} catch (err) {
			const message =
				(err.response && err.response.data && err.response.data.message) ||
				err.message ||
				err.toString();
			return thunkAPI.rejectWithValue(message);
		}
	}
);

export const authSlice = createSlice({
	name: 'auth',
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
			//REGISTER CASES
			.addCase(register.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(register.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.user = action.payload;
			})
			.addCase(register.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
				state.user = null;
			})
			//LOGIN CASES
			.addCase(login.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(login.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.user = action.payload;
			})
			.addCase(login.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
				state.user = null;
			})
			//LOGOUT CASE
			.addCase(logout.fulfilled, (state) => {
				state.user = null;
			})
			//UPDATE CASES
			.addCase(update.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.user = action.payload;
			})
			.addCase(update.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			})
			.addCase(update.pending, (state) => {
				state.isLoading = true;
			});
	},
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
