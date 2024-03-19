const asyncHandler = require('express-async-handler');
const axios = require('axios');
const TSM_AUTH_URL = 'https://auth.tradeskillmaster.com/oauth2/token';
const TSM_REALM_URL = 'https://realm-api.tradeskillmaster.com/';

// @desc Get TSM API Key
// @route POST /api/tsm
// @access Private
const getTsmApiKey = asyncHandler(async (req, res) => {
	if (!req.body.tsmToken) {
		res.status(400);
		throw new Error('User token not found');
	} else {
		const tsmRes = await axios({
			method: 'post',
			url: TSM_AUTH_URL,
			data: {
				client_id: 'c260f00d-1071-409a-992f-dda2e5498536',
				grant_type: 'api_token',
				scope: 'app:realm-api app:pricing-api',
				token: req.body.tsmToken,
			},
		});
		return res.status(200).json(tsmRes.data);
	}
});

// @desc Get Realms
// @route POST /api/tsm/realms
// @access Private
const getRealms = asyncHandler(async (req, res) => {
	if (!req.body.tsmApiKey) {
		res.status(400);
		throw new Error('TSM Api Key not found');
	} else {
		const tsmRes = await axios({
			method: 'get',
			url: TSM_REALM_URL + 'realms',
			headers: {
				Authorization: `Bearer ${req.body.tsmApiKey}`,
			},
		});
		return res.status(200).json(tsmRes.data);
	}
});

module.exports = {
	getTsmApiKey,
	getRealms,
};
