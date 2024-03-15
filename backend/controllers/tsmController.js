const asyncHandler = require('express-async-handler');
const axios = require('axios');
const TSM_AUTH_URL = 'https://auth.tradeskillmaster.com/oauth2/token';

// @desc Get TSM API Key
// @route POST /api/tsm
// @access Private
const getTsmApiKey = asyncHandler(async (req, res) => {
	if (!req.body.user.tsmToken) {
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
				token: req.body.user.tsmToken,
			},
		});
		console.log(tsmRes.data);

		return res.status(200).json(tsmRes.data);
	}
});

module.exports = {
	getTsmApiKey,
};
