const express = require('express');
const router = express.Router();
const {
  createTicket,
  getTickets,
  updateTicket,
  deleteTicket
} = require('../controllers/ticketController');
const authMiddleware = require('../middleware/authMiddleware');

// Todas as rotas abaixo exigem token de autenticação
router.use(authMiddleware);

// CRUD de tickets
router.post('/', createTicket);         // Criar
router.get('/', getTickets);            // Listar
router.put('/:id', updateTicket);       // Atualizar
router.delete('/:id', deleteTicket);    // Deletar

module.exports = router;
