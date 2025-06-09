const users = [
  { 
    id: 1, 
    username: 'admin', 
    password: '$2a$12$tPxJPXjLUK2IvDMLdDTMDugSennzDxjNT9NXLf2IcRNEE5D6GSQ7u', 
    role: 'admin' 
  },
  { id: 2, 
    username: 'user1', 
    password: '$2a$12$ODbi5z4D9Pw.MsKx5Ddqzua75uAv0PkdjUFvmVj2PNQ9JcmdMTcZ.', 
    role: 'user' 
  }
];

const contracts = [
  { id: 1, empresa: 'jaspion', data_inicio: '2023-02-02', userId: 1 },
  { id: 2, empresa: 'dragonball', data_inicio: '1980-02-01', userId: 2 }
];

export default { users, contracts };