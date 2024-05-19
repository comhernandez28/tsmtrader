const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { limiter } = require('../middleware/rateLimitMiddleware');

const { getTsmApiKey, getRealms } = require('../controllers/tsmController');

router.post('/', protect, getTsmApiKey);
router.post('/realms', protect, limiter, getRealms);

module.exports = router;
