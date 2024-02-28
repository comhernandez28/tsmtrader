const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/userModel');

//Generate JWT
const generateToken = (id) => {
	return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

// @desc Get Current User
// @route GET /api/user
// @access Private
const getUser = asyncHandler(async (req, res) => {
	res.status(200).json(req.user);
});

// @desc Register New User
// @route POST /api/user
// @access Public
const registerUser = asyncHandler(async (req, res) => {
	const { username, email, password } = req.body;

	if (!username || !email || !password) {
		res.status(400);
		throw new Error('Please fill in all fields');
	}

	const userExists = await User.findOne({ email });

	if (userExists) {
		res.status(400);
		throw new Error('User already exists');
	}

	const salt = await bcrypt.genSalt(10);
	const hashedPassword = await bcrypt.hash(password, salt);

	const user = await User.create({
		username,
		email,
		password: hashedPassword,
		token: generateToken(user._id),
	});

	if (user) {
		res.status(201).json({
			_id: user.id,
			username: user.username,
			email: user.email,
		});
	} else {
		res.status(400);
		throw new Error('Invalid user data');
	}
});

// @desc Login User
// @route POST /api/user/login
// @access Public
const loginUser = asyncHandler(async (req, res) => {
	const { email, password } = req.body;

	const user = await User.findOne({ email });

	if (user && (await bcrypt.compare(password, user.password))) {
		res.status(201).json({
			_id: user.id,
			username: user.username,
			email: user.email,
			token: generateToken(user._id),
		});
	} else {
		res.status(400);
		throw new Error('Invalid credentials');
	}
	res.status(200).json({ user: 'login user' });
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
	registerUser,
	loginUser,
	updateUser,
	deleteUser,
};
