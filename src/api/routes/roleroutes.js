// roleRoutes.js
const express = require('express');
const router = express.Router();
const roleController = require('../controllers/roleController');

// Define routes
router.post('/', roleController.createRole);
router.get('/', roleController.getRoles);

module.exports = router;
