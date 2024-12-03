const express = require("express");
const router = express.Router();
const clientesCompramProdutosController = require("../controllers/clientesCompramProdutosController");

// Rota para registrar a compra de produtos
router.post("/", clientesCompramProdutosController.registrarCompra);

module.exports = router;
