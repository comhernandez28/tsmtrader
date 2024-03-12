import axios from 'axios';
const API_URL = '/api/tsm/';

//Get TSM API KEY
const getApiKey = async () => {
	const res = await axios.get(API_URL);
};
const tsmService = {};

export default tsmService;
