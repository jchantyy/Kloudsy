const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Criar novo ticket
const createTicket = async (req, res) => {
  const { title, description } = req.body;
  const userId = req.userId;

  try {
    const ticket = await prisma.ticket.create({
      data: { title, description, userId }
    });
    res.status(201).json(ticket);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao criar ticket' });
  }
};

// Listar tickets do usuário
const getTickets = async (req, res) => {
  const userId = req.userId;

  try {
    const tickets = await prisma.ticket.findMany({
      where: { userId }
    });
    res.status(200).json(tickets);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar tickets' });
  }
};

// Atualizar status do ticket
const updateTicket = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const ticket = await prisma.ticket.update({
      where: { id: parseInt(id) },
      data: { status }
    });
    res.status(200).json(ticket);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar ticket' });
  }
};

// Deletar ticket
const deleteTicket = async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.ticket.delete({ where: { id: parseInt(id) } });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: 'Erro ao deletar ticket' });
  }
};

module.exports = {
  createTicket,
  getTickets,
  updateTicket,
  deleteTicket
};
