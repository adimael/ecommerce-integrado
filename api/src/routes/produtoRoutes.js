const express = require("express");
const router = express.Router();
const produtoController = require("../controllers/produtoController");

router.get("/", produtoController.getAllProdutos);
router.get("/:id", produtoController.buscarProduto);
router.post("/", produtoController.createProduto);

router.put("/:id", produtoController.atualizarProduto);
router.delete("/:id", produtoController.deletarProduto);


module.exports = router;
