
import z from 'zod';
import db from '../../utils/db.js'; // Mock de banco de dados

const schema = z.object({
  empresa: z.string().min(1, 'Empresa é obrigatória').max(50, 'Empresa não pode ter mais de 50 caracteres'),
  data_inicio: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Data de início deve estar no formato YYYY-MM-DD'),
})

export function createContract(req, res) {
  const { success, data } = schema.safeParse(req.body);

  if (!success) {
    return res.status(400).json({ message: 'Dados inválidos', errors: result.error.errors });
  }

  const newContract = {
    id: db.contracts.length + 1,
    empresa: data.empresa,
    data_inicio: data.data_inicio,
  };

  db.contracts.push(newContract);

  res.status(201).json({ message: 'Criado com sucesso!', contract: newContract });
}

export function getContracts(req, res) {
  const { empresa, inicio } = req.params;
  console.log('Parâmetros Recebidos:', { empresa, inicio }); // Log para depuração
  
  const empresaLimpa = empresa.trim().toLowerCase();

  const formatoDataValido = /^\d{4}-\d{2}-\d{2}$/;

  if (!formatoDataValido.test(inicio)) {
    return res.status(400).json({ error: 'Formato de data inválido. Use YYYY-MM-DD.' });
  }

  if (!empresaLimpa || empresaLimpa.length > 50) {
    return res.status(400).json({ error: 'Empresa inválido.' });
  }


  const contracts = db.contracts.filter(
    (contract) => contract.empresa === empresaLimpa && contract.data_inicio === inicio
  );

  if (contracts.length === 0) {
    return res.status(404).json({ message: 'No contracts found' });
  }

  res.status(200).json({ contracts });
}

export function getContractsByUser(req, res) {
  const userId = req.user.id;

  const userContracts = db.contracts.filter((contract) => contract.userId === userId);

  if (userContracts.length === 0) {
    return res.status(404).json({ message: 'No contracts found for this user' });
  }

  res.status(200).json({ contracts: userContracts });
}

