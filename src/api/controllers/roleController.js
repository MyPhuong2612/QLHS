const Product = require('../models/productModel');

// Hàm lấy danh sách sản phẩm
async function getAllProducts(req, res) {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Hàm lấy thông tin chi tiết sản phẩm
async function getProductById(req, res) {
    try {
        const product = await Product.findById(req.params.productId);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Hàm tạo sản phẩm mới
async function createProduct(req, res) {
    try {
        const newProduct = new Product({
            name: req.body.name,
            price: req.body.price,
            image: req.file.path // Đường dẫn của hình ảnh sau khi được upload
        });
        await newProduct.save();
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Hàm cập nhật thông tin sản phẩm
async function updateProduct(req, res) {
    try {
        const product = await Product.findById(req.params.productId);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        product.name = req.body.name || product.name;
        product.price = req.body.price || product.price;
        if (req.file) {
            product.image = req.file.path; // Cập nhật hình ảnh nếu có
        }
        await product.save();
        res.json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Hàm xóa sản phẩm
async function deleteProduct(req, res) {
    try {
        const product = await Product.findById(req.params.productId);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        await product.remove();
        res.json({ message: "Product deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = { getAllProducts, getProductById, createProduct, updateProduct, deleteProduct };
