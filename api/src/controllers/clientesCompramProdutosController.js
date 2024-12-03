const mysql = require("mysql2");
const db = require("../config/database");

exports.registrarCompra = async (req, res) => {
  const { id_cliente, id_produto, quantidade } = req.body;

  if (!id_cliente || !id_produto || !quantidade) {
    return res.status(400).json({ message: "Preencha todos os campos obrigatórios." });
  }

  try {
    const [cliente] = await db.query("SELECT * FROM Clientes WHERE id = ?", [id_cliente]);
    if (cliente.length === 0) {
      return res.status(404).json({ message: "Cliente não encontrado." });
    }

    const [produto] = await db.query("SELECT * FROM Produtos WHERE id = ?", [id_produto]);
    if (produto.length === 0) {
      return res.status(404).json({ message: "Produto não encontrado." });
    }

    try {
      await db.query(
        "INSERT INTO ClientesCompramProdutos (id_cliente, id_produto, quantidade, status) VALUES (?, ?, ?, 'finalizado')",
        [id_cliente, id_produto, quantidade]
      );

      res.status(201).json({
        message: "Compra registrada com sucesso",
        compra: { id_cliente, id_produto, quantidade, data_compra: new Date(), status: "finalizado" },
      });
    } catch (insertErr) {
      if (insertErr.code === "ER_DUP_ENTRY") {
        return res.status(409).json({
          message: "Já existe uma compra registrada para este cliente e este produto.",
        });
      }
      throw insertErr;
    }
  } catch (err) {
    res.status(500).json({
      message: "Erro interno ao registrar a compra",
      error: err.message,
    });
  }
};



// Função para listar todas as compras de um cliente
exports.listarCompras = (req, res) => {
  const { id_cliente } = req.params;

  db.query(
    "SELECT * FROM ClientesCompramProdutos WHERE id_cliente = ?",
    [id_cliente],
    (err, results) => {
      if (err) {
        console.error("Erro ao listar compras:", err);
        return res.status(500).json({ message: "Erro ao listar compras", error: err });
      }

      if (results.length === 0) {
        return res.status(404).json({ message: "Nenhuma compra encontrada para esse cliente." });
      }

      res.status(200).json({ compras: results });
    }
  );
};

// Função para cancelar uma compra
exports.cancelarCompra = (req, res) => {
  const { id_cliente, id_produto } = req.body;

  if (!id_cliente || !id_produto) {
    return res.status(400).json({ message: "Preencha todos os campos obrigatórios." });
  }

  // Atualiza o status da compra para 'cancelado'
  db.query(
    "UPDATE ClientesCompramProdutos SET status = 'cancelado' WHERE id_cliente = ? AND id_produto = ? AND status = 'finalizado'",
    [id_cliente, id_produto],
    (err, results) => {
      if (err) {
        console.error("Erro ao cancelar a compra:", err);
        return res.status(500).json({ message: "Erro ao cancelar a compra", error: err });
      }

      if (results.affectedRows === 0) {
        return res.status(404).json({ message: "Compra não encontrada para cancelar." });
      }

      res.status(200).json({ message: "Compra cancelada com sucesso." });
    }
  );
};
