// authorizationMiddleware.js
const jwt = require('jsonwebtoken');

const authorizationMiddleware = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) return res.status(401).json({ message: 'Access denied. No token provided.' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;

        // Kiểm tra vai trò của người dùng
        if (req.user.role === 'admin') {
            // Nếu là admin, cho phép truy cập
            next();
        } else {
            // Nếu không phải admin, từ chối truy cập
            return res.status(403).json({ message: 'Access denied. You do not have permission to access this resource.' });
        }
    } catch (error) {
        res.status(400).json({ message: 'Invalid token.' });
    }
};

module.exports = authorizationMiddleware;
