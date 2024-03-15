const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');

const { getTsmApiKey } = require('../controllers/tsmController');

router.post('/', protect, getTsmApiKey);

module.exports = router;
