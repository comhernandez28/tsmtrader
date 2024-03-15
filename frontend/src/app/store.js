import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import authReducer from '../features/auth/authSlice';
import tsmReducer from '../features/tsm/tsmSlice';

export const store = configureStore({
	reducer: {
		counter: counterReducer,
		auth: authReducer,
		tsm: tsmReducer,
	},
});
