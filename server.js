const express = require('express');
const app = express();
app.use(express.json());

// Dados temporários (em produção, use um banco de dados)
const users = [];

// Rota de registro
app.post('/register', (req, res) => {
  const { name, account, password, api_key } = req.body;
  
  if (api_key !== "SUA_CHAVE_SECRETA") {
    return res.status(403).json({ error: "Chave API inválida!" });
  }

  users.push({
    id: users.length + 1,
    name,
    account,
    password, // ⚠️ Em produção, use bcrypt para hashear!
    expiry: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 dias
  });

  res.json({ success: true, userId: users.length });
});

// Rota de login
app.post('/login', (req, res) => {
  const { account, password } = req.body;
  const user = users.find(u => u.account === account && u.password === password);
  
  if (!user) {
    return res.status(401).json({ error: "Conta ou senha inválidos!" });
  }

  res.json({ success: true, user });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`API rodando na porta ${PORT}`));
