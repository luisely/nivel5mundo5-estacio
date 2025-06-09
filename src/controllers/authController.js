
import { compare, hashSync } from 'bcryptjs';
import jwt from 'jsonwebtoken';
import z from 'zod';
import db from '../../utils/db.js';


const schema = z.object({
  username: z.string().min(1),
  password: z.string().min(3),
});

const schemaRegister = z.object({
  username: z.string()
  .min(1)
  .refine((val) => !/[\r\n\t\f\v]/.test(val), {
    message: 'Entrada não pode conter quebras de linha ou espaços de controle',
  })
  .refine((val) => !/[<>`"'\\]/.test(val), {
    message: 'Entrada contém caracteres inválidos',
  }),
  password: z.string().min(3),
  role: z.enum(['admin', 'user']).default('user'),
});

export async function login(req, res) {
  const { success, data } = schema.safeParse(req.body);

  if(!success) {
    return res.status(400).json({ message: 'Verifique os campos e tente novamente' });
  }

  const user = db.users.find(u => u.username === data.username);
  
  if (!user) {
    return res.status(401).json({ message: 'Credencias Invalidas' });
  }

  const isPasswordValid = await compare(data.password, user.password);

  if (!isPasswordValid) {
    return res.status(401).json({ message: 'Credencias Invalidas' });
  }

  const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
  res.json({ token });
}

export function register(req, res) {
  const { success, data } = schemaRegister.safeParse(req.body);

  if (!success) {
    return res.status(400).json({ message: 'Verifique os campos e tente novamente' });
  }
  const { username, password, role } = data;

  if (db.users.find(u => u.username === username)) {
    return res.status(400).json({ message: 'Username já cadastrado' });
  }

  const hashedPassword = hashSync(password, 12);

  const newUser = { 
    id: db.users.length + 1, 
    username, 
    password: hashedPassword, 
    role 
  };

  db.users.push(newUser);
  res.status(201).json({ message: 'User registered', user: newUser });
}

export function refreshToken(req, res) {
  const oldToken = req.headers.authorization?.split(' ')[1];
  const decoded = jwt.verify(oldToken, process.env.JWT_SECRET, { ignoreExpiration: true });
  const newToken = jwt.sign({ id: decoded.id, role: decoded.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
  res.json({ token: newToken });
}

