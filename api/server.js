const express = require("express");
const app = express();
require("dotenv").config(); // Para carregar variáveis de ambiente do .env

// Middleware para processar JSON no corpo das requisições
app.use(express.json());

// Importar rotas
const clienteRoutes = require("./src/routes/clienteRoutes");
const produtoRoutes = require("./src/routes/produtoRoutes");
const clientesCompramProdutosRoutes = require("./src/routes/clientesCompramProdutosRoutes");

// Usar rotas
app.use("/clientes", clienteRoutes);
app.use("/produtos", produtoRoutes);
app.use("/compras", clientesCompramProdutosRoutes);  // Nova rota de compras

// Rota inicial
app.get("/", (req, res) => {
    res.send("Bem-vindo à API!");
});

// Iniciar servidor
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});


const db = require("./src/config/database");

db.query("SELECT 1")
  .then(() => {
    console.log("Conexão com o banco de dados bem-sucedida!");
  })
  .catch((err) => {
    console.error("Erro ao conectar ao banco de dados:", err);
  });

