import dotenv from 'dotenv';


import express from 'express';
import authRoutes from './src/routes/auth.js';
import contractRoutes from './src/routes/contracts.js';
import userRoutes from './src/routes/users.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
//app.use(express.urlencoded({ extended: true }));

// Rotas
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/contracts', contractRoutes);

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
