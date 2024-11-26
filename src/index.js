import cors from "cors";
import express from "express";
import UsuariosController from "./controllers/UsuariosController.js";
import Produtos from "./Exercíciosdefixação/Produtos.js";
import Clientes from "./Exercíciosdefixação/clientes.js";

const app = express();
app.use(express.json());
app.use(cors({ origin: "*" }));

// Rotas de /usuarios
const _usuariosController = new UsuariosController();

app.get("/usuarios", _usuariosController.listar);
app.post("/usuarios", _usuariosController.adicionar);
app.put("/usuarios", _usuariosController.atualizar);
app.delete("/usuarios/:id", _usuariosController.excluir);

// Rotas de /clientes 
const atividadeClientes = new Clientes();

app.get("/clientes", atividadeClientes.listar);
app.post("/clientes", atividadeClientes.adicionar);
app.put("/clientes", atividadeClientes.atualizar);
app.delete("/clientes/:id", atividadeClientes.excluir);

// Rotas de /produtos 
const atividadeProdutos = new Produtos();

app.get("/produtos", atividadeProdutos.listar);
app.post("/produtos", atividadeProdutos.adicionar);
app.put("/produtos", atividadeProdutos.atualizar);
app.delete("/produtos/:id", atividadeProdutos.excluir);

const port = 3000;
app.listen(port, () => {
  console.log(`API está rodando na porta ${port}`);
});
