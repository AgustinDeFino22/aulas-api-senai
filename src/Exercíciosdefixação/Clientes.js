import ConexaoMySql from "../database/ConexaoMySql.js";

class Clientes {
    async adicionar(req, resp) {
        try {
            const novoCliente = req.body;

            if (!novoCliente.nome || !novoCliente.email || !novoCliente.telefone || !novoCliente.cpf) {
                resp
                    .status(400)
                    .send("Os campos nome, email e telefone e CPF são obrigatórios.");
                return;
            }

            const conexao = await new ConexaoMySql().getConexao();
            const comandoSql =
                "INSERT INTO clientes (nome, email, telefone, cpf) VALUES (?, ?, ?, ?)";

            const [resultado] = await conexao.execute(comandoSql, [
                novoCliente.nome,
                novoCliente.email,
                novoCliente.telefone,
                novoCliente.cpf,
            ]);

            resp.send(resultado);
        } catch (error) {
            if (error.code === "ER_DUP_ENTRY") {
                resp.status(400).send("CPF já cadastrado.");
                return;
            }
            resp.status(500).send(error);
        }
    }

    async listar(req, resp) {
        try {
            const conexao = await new ConexaoMySql().getConexao();
            const comandoSql = "SELECT * FROM clientes WHERE nome LIKE ?";

            const filtro = req.query.filtro || "";
            const [resultado] = await conexao.execute(comandoSql, [`%${filtro}%`]);
            resp.send(resultado);
        } catch (error) {
            resp.status(500).send(error);
        }
    }

    async atualizar(req, resp) {
        try {
            const clienteEditar = req.body;

            if (!clienteEditar.id || !clienteEditar.nome || !clienteEditar.telefone) {
                resp.status(400).send("Os campos id, nome, email e CPF são obrigatórios.");
                return;
            }

            const conexao = await new ConexaoMySql().getConexao();
            const comandoSql =
                "UPDATE clientes SET nome = ?, email = ?, telefone = ? WHERE id = ?";

            const [resultado] = await conexao.execute(comandoSql, [
                clienteEditar.nome,
                cliente.email,
                clienteEditar.telefone,
                clienteEditar.id,
            ]);

            resp.send(resultado);
        } catch (error) {
            resp.status(500).send(error);
        }
    }

    async excluir(req, resp) {
        try {
            const conexao = await new ConexaoMySql().getConexao();

            const comandoSql = "DELETE FROM clientes WHERE id = ?";
            const [resultado] = await conexao.execute(comandoSql, [+req.params.id]);

            resp.send(resultado);
        } catch (error) {
            resp.status(500).send(error);
        }
    }
}

export default Clientes;