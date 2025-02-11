const express = require('express');
const { submitHelpRequest, getAllHelpRequests } = require('../controllers/helpController');
const router = express.Router();

router.post('/submit', submitHelpRequest);
router.get('/all', getAllHelpRequests);

module.exports = router;
