// userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Define routes
router.post('/', userController.createUser);
router.get('/', userController.getUsers);

module.exports = router;
