const asyncHandler = require('express-async-handler');

// @desc Get Current User
// @route GET /api/user
// @access Private
const getUser = asyncHandler(async (req, res) => {
	res.status(200).json(req.user);
});
