const express = require('express');
const router = express.Router();
const User = require('../models/User');
const authController = require('../controllers/authController');

// User management
router.post('/user', authController.createUser);
router.get('/user/:email', authController.getUserData);
router.put('/user/:email', authController.updateUser);

// Orders
router.post('/order', authController.createOrder);

module.exports = router;