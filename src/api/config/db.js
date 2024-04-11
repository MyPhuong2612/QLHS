module.exports = {
  // Cấu hình kết nối MongoDB
  mongoURI: process.env.MONGO_URI || 'mongodb://localhost:27017/profile_management_db',
  
  // Cấu hình JWT
  jwtSecret: process.env.JWT_SECRET || 'jwtSecretKey',
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '7d'
};