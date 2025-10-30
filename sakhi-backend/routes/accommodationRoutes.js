const { submitAccommodationRequest, getAllAccommodations, getPendingAccommodations, assignAccommodationToNgo } = require('../controllers/accommodationController');
const { authenticate, authorize } = require('../middleware/auth');
const express = require('express');

const router = express.Router();

router.post("/submit", submitAccommodationRequest); // Submit a new request
router.get("/all", getAllAccommodations); // Retrieve all accommodation requests

router.get('/pending', authenticate, authorize('ngo'), getPendingAccommodations);
router.post('/:id/take', authenticate, authorize('ngo'), assignAccommodationToNgo);

router.post('/:id/take', authenticate, authorize('ngo'), assignAccommodationToNgo);

module.exports = router;
