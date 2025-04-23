const express = require('express');
const { saveGameData, fetchGameData } = require('../controllers/memoryController');
const router = express.Router();

// Route to save game data
router.post('/save', saveGameData);

router.get('/results', fetchGameData);

module.exports = router;
