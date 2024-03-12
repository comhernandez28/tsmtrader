import axios from 'axios';
const API_URL = '/api/user/';

//Register User
const register = async (userData) => {
	const res = await axios.post(API_URL, userData);

	if (res.data) {
		localStorage.setItem('user', JSON.stringify(res.data));
	}

	return res.data;
};

//Update User
const update = async (userData, userId) => {
	const res = await axios.put(API_URL + userId, userData);

	if (res.data) {
		localStorage.setItem('user', JSON.stringify(res.data));
	}

	return res.data;
};

//Login User
const login = async (userData) => {
	const res = await axios.post(API_URL + 'login', userData);

	if (res.data) {
		localStorage.setItem('user', JSON.stringify(res.data));
	}

	return res.data;
};

//Logout User
const logout = () => {
	localStorage.removeItem('user');
};

const authService = {
	register,
	login,
	logout,
	update,
};

export default authService;
