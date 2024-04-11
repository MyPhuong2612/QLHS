const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

// Hàm đăng ký người dùng
async function register(req, res) {
    try {
        const { username, password } = req.body;
        // Kiểm tra xem người dùng đã tồn tại chưa
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: "Username already exists" });
        }
        // Mã hóa mật khẩu
        const hashedPassword = await bcrypt.hash(password, 10);
        // Tạo người dùng mới
        const newUser = new User({
            username,
            password: hashedPassword
        });
        await newUser.save();
        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Hàm đăng nhập
async function login(req, res) {
    try {
        const { username, password } = req.body;
        // Kiểm tra xem người dùng tồn tại và mật khẩu có đúng không
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(401).json({ message: "Invalid username or password" });
        }
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ message: "Invalid username or password" });
        }
        // Tạo token JWT
        const token = jwt.sign({ username: user.username }, process.env.JWT_SECRET);
        res.json({ token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Hàm lấy thông tin người dùng hiện tại
function getCurrentUser(req, res) {
    res.json(req.user); // Thông tin người dùng được lưu trong req.user khi xác thực token
}

// Hàm cập nhật thông tin người dùng hiện tại
async function updateCurrentUser(req, res) {
    try {
        const { username } = req.user; // Lấy username của người dùng từ req.user
        const { newPassword } = req.body;
        // Mã hóa mật khẩu mới
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        // Cập nhật mật khẩu mới cho người dùng
        await User.updateOne({ username }, { password: hashedPassword });
        res.json({ message: "Password updated successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = { register, login, getCurrentUser, updateCurrentUser };
