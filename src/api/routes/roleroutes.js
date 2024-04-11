const express = require('express'); 
const router = express.Router();
const productController = require('../controllers/productController');
const authMiddleware = require('../middleware/authMiddleware');
const uploadMiddleware = require('../middleware/uploadMiddleware');

// Route lấy danh sách sản phẩm
router.get('/', productController.getAllProducts);

// Route lấy thông tin chi tiết sản phẩm
router.get('/:productId', productController.getProductById);

// Route tạo sản phẩm mới
router.post('/', authMiddleware.authenticateToken, uploadMiddleware.upload.single('image'), productController.createProduct);

// Route cập nhật thông tin sản phẩm
router.put('/:productId', authMiddleware.authenticateToken, uploadMiddleware.upload.single('image'), productController.updateProduct);

// Route xóa sản phẩm
router.delete('/:productId', authMiddleware.authenticateToken, productController.deleteProduct);

module.exports = router;
