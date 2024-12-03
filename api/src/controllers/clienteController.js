const db = require("../config/database");

// Obter todos os clientes
exports.getAllClientes = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM Clientes");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.buscarCliente = async (req, res) => {
    const { id } = req.params; // O id do cliente será passado pela URL
  
    try {
      // Query para buscar o cliente pelo id
      const [rows] = await db.execute(
        "SELECT * FROM Clientes WHERE id = ?",
        [id]
      );
  
      // Se não encontrar, retorna uma mensagem de erro
      if (rows.length === 0) {
        return res.status(404).json({ message: "Cliente não encontrado." });
      }
  
      // Retorna os dados do cliente
      res.json(rows[0]);
    } catch (error) {
      res.status(500).json({ message: "Erro ao buscar cliente.", error });
    }
  };
  

// Criar um cliente
exports.createCliente = async (req, res) => {
  const { nome, email, data_nascimento, status } = req.body;
  try {
    await db.query(
      "INSERT INTO Clientes (nome, email, data_nascimento, status) VALUES (?, ?, ?, ?)",
      [nome, email, data_nascimento, status]
    );
    res.status(201).json({ message: "Cliente criado com sucesso!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.atualizarCliente = async (req, res) => {
    const { id } = req.params;
    const { nome, email, data_nascimento, status } = req.body;
  
    try {
      const [result] = await db.execute(
        "UPDATE Clientes SET nome = ?, email = ?, data_nascimento = ?, status = ? WHERE id = ?",
        [nome, email, data_nascimento, status, id]
      );
  
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "Cliente não encontrado." });
      }
  
      res.json({ message: "Cliente atualizado com sucesso!" });
    } catch (error) {
      res.status(500).json({ message: "Erro ao atualizar cliente.", error });
    }
  };

  exports.deletarCliente = async (req, res) => {
    const { id } = req.params; // O id do cliente será passado pela URL
  
    try {
      // Query para deletar o cliente pelo id
      const [result] = await db.execute(
        "DELETE FROM Clientes WHERE id = ?",
        [id]
      );
  
      // Verifica se o cliente foi encontrado e deletado
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "Cliente não encontrado." });
      }
  
      // Retorna uma mensagem de sucesso
      res.status(200).json({ message: "Cliente deletado com sucesso." });
    } catch (error) {
      res.status(500).json({ message: "Erro ao deletar cliente.", error });
    }
  };
  
  
