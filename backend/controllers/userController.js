const asyncHandler = require('express-async-handler');

// @desc Get User
// @route GET /api/user
// @access Private
const getUser = asyncHandler(async (req, res) => {
	res.status(200).json({ user: 'get user' });
});

// @desc Set User
// @route POST /api/user
// @access Private
const setUser = asyncHandler(async (req, res) => {
	console.log(req.body.test);
	if (!req.body.test) {
		res.status(400);
		throw new Error('Please fill in details');
	}
	res.status(200).json({ user: 'set user' });
});

// @desc Update User
// @route PUT /api/user/:id
// @access Private
const updateUser = asyncHandler(async (req, res) => {
	res.status(200).json({ user: 'updated user' });
});

// @desc Delete User
// @route DELETE /api/user/:id
// @access Private
const deleteUser = asyncHandler(async (req, res) => {
	res.status(200).json({ user: 'deleted user' });
});

module.exports = {
	getUser,
	setUser,
	updateUser,
	deleteUser,
};
