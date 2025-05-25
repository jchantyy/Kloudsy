// backend/index.js
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => res.send("API funcionando!"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));

const authRoutes = require('./routes/authRoutes'); // Importa as rotas de auth
app.use('/api/auth', authRoutes); // Usa elas no caminho /api/auth

const ticketRoutes = require('./routes/ticketRoutes');
app.use('/api/tickets', ticketRoutes);
