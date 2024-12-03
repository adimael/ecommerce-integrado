const db = require("../config/database");

// Obter todos os produtos
exports.getAllProdutos = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM Produtos");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.buscarProduto = async (req, res) => {
    const { id } = req.params; // O id do produto será passado pela URL
  
    try {
      // Query para buscar o produto pelo id
      const [rows] = await db.execute(
        "SELECT * FROM Produtos WHERE id = ?",
        [id]
      );
  
      // Se não encontrar, retorna uma mensagem de erro
      if (rows.length === 0) {
        return res.status(404).json({ message: "Produto não encontrado." });
      }
  
      // Retorna os dados do produto
      res.json(rows[0]);
    } catch (error) {
      res.status(500).json({ message: "Erro ao buscar produto.", error });
    }
};
  

// Criar um produto
exports.createProduto = async (req, res) => {
  const { nome, marca, preco, quantidade, status } = req.body;
  try {
    await db.query(
      "INSERT INTO Produtos (nome, marca, preco, quantidade, status) VALUES (?, ?, ?, ?, ?)",
      [nome, marca, preco, quantidade, status]
    );
    res.status(201).json({ message: "Produto criado com sucesso!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.atualizarProduto = async (req, res) => {
    const { id } = req.params;
    const { nome, marca, preco, quantidade, status } = req.body;
  
    try {
      const [result] = await db.execute(
        "UPDATE Produtos SET nome = ?, marca = ?, preco = ?, quantidade = ?, status = ? WHERE id = ?",
        [nome, marca, preco, quantidade, status, id]
      );
  
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "Produto não encontrado." });
      }
  
      res.json({ message: "Produto atualizado com sucesso!" });
    } catch (error) {
      res.status(500).json({ message: "Erro ao atualizar produto.", error });
    }
};

exports.deletarProduto = async (req, res) => {
    const { id } = req.params; // O id do produto será passado pela URL
  
    try {
      // Query para deletar o produto pelo id
      const [result] = await db.execute(
        "DELETE FROM Produtos WHERE id = ?",
        [id]
      );
  
      // Verifica se o produto foi encontrado e deletado
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "Produto não encontrado." });
      }
  
      // Retorna uma mensagem de sucesso
      res.status(200).json({ message: "Produto deletado com sucesso." });
    } catch (error) {
      res.status(500).json({ message: "Erro ao deletar produto.", error });
    }
  };
  


  
