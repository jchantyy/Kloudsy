const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/authController');

// Rota para criar usuário
router.post('/register', register);

// Rota para login
router.post('/login', login);

module.exports = router;
