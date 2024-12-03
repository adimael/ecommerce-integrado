const express = require("express");
const router = express.Router();
const clienteController = require("../controllers/clienteController");

router.get("/", clienteController.getAllClientes);
router.get("/:id", clienteController.buscarCliente);
router.post("/", clienteController.createCliente);

router.put("/:id", clienteController.atualizarCliente);
router.delete("/:id", clienteController.deletarCliente);



module.exports = router;
