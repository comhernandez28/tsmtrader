const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');

const { getTsmApiKey, getRealms } = require('../controllers/tsmController');

router.post('/', protect, getTsmApiKey);
router.post('/realms', protect, getRealms);

module.exports = router;
