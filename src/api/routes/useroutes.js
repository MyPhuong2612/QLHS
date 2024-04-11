const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');
const usermodel = require('../models/usermodel');
// Route đăng ký người dùng
router.post('/register', userController.register);

// Route đăng nhập
router.post('/login', userController.login);

// Route lấy thông tin người dùng hiện tại
router.get('/me', authMiddleware.authenticateToken, userController.getCurrentUser);

// Route cập nhật thông tin người dùng
router.put('/me', authMiddleware.authenticateToken, userController.updateCurrentUser);

module.exports = router;
module.exports = usermodel;