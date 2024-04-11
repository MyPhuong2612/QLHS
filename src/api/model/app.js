const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const userRoutes = require('./src/api/routes/useroutes');
const productRoutes = require('./src/api/routes/roleroutes');
const errorMiddleware = require('./src/middleware/errorMiddleware');

// Load biến môi trường từ file .env
dotenv.config();

// Kết nối đến cơ sở dữ liệu MongoDB
connectDB();

// Khởi tạo Express app
const app = express();

// Middleware để xử lý JSON request body
app.use(express.json());

// Routes cho các tính năng liên quan đến người dùng
app.use('/api/users', useroutes);

// Routes cho các tính năng liên quan đến sản phẩm
app.use('/api/products', roleeoutes);

// Middleware xử lý lỗi tập trung
app.use(errorMiddleware);

// Port mặc định hoặc từ biến môi trường
const PORT = process.env.PORT || 3000;

// Khởi động server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
