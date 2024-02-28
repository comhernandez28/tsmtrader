const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');

const {
	getUser,
	registerUser,
	loginUser,
	updateUser,
	deleteUser,
} = require('../controllers/userController');

router.get('/', protect, getUser);
router.post('/', registerUser);
router.post('/login', loginUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

module.exports = router;
