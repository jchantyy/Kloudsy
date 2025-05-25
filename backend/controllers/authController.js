const bcrypt = require('bcryptjs'); // Biblioteca pra criptografar senha
const jwt = require('jsonwebtoken'); // Pra gerar o token de login
const { PrismaClient } = require('@prisma/client'); // ORM para banco
const prisma = new PrismaClient(); // Instancia o Prisma

const register = async (req, res) => {
  const { email, password } = req.body;

  // Verifica se já existe usuário com o mesmo e-mail
  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) return res.status(400).json({ message: 'Usuário já existe' });

  // Criptografa a senha antes de salvar no banco
  const hashedPassword = await bcrypt.hash(password, 10);

  // Cria o usuário no banco
  const user = await prisma.user.create({
    data: { email, password: hashedPassword }
  });

  res.status(201).json({ message: 'Usuário criado com sucesso!' });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  // Busca o usuário pelo e-mail
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return res.status(400).json({ message: 'Usuário não encontrado' });

  // Compara senha digitada com a senha criptografada do banco
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(401).json({ message: 'Senha inválida' });

  // Gera um token JWT
  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
    expiresIn: '7d'
  });

  res.status(200).json({ token, userId: user.id, email: user.email });
};

module.exports = { register, login };

