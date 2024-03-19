import axios from 'axios';
const API_URL = '/api/tsm/';

//Get TSM API KEY
const getApiKey = async (user, token) => {
	const res = await axios.post(API_URL, user, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});

	if (res.data) {
		localStorage.setItem('tsmApiKey', JSON.stringify(res.data));
	}

	return res.data;
};

//Get Realms
const getRealms = async (tsmApiKey, token) => {
	const res = await axios.post(API_URL + 'realms', tsmApiKey, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});

	return res.data;
};

const tsmService = { getApiKey, getRealms };

export default tsmService;
