import cors from "cors";
import express from "express";

const app = express();
app.use(express.json());
app.use(cors({ origin: "*" }));

// rotas de /usuarios
const listaUsuarios = [];

app.get("/usuarios", (req, res) => {
  res.send(listaUsuarios);
});
app.post("/usuarios", (req, res) => {
  console.log(req.body);
  listaUsuarios.push(req.body);
  res.status(201).send(req.body);
});
app.put("/usuarios", (req, res) => {
  res.send("Chamou o PUT!");
});
app.delete("/usuarios", (req, res) => {
  res.send("Chamou o DELETE!");
});

// Rotas/ clientes
const listaclientes = [];

app.get("/clientes", (req, res) => {
  res.send(listaclientes);
});
app.post("/clientes", (req, res) => {
  console.log(req.body);
  listaclientes.push(req.body);
  res.status(201).send(req.body);
});
app.put("/clientes", (req, res) => {
  res.send("Chamou o PUT!");
});
app.delete("/clientes", (req, res) => {
  res.send("Chamou o DELETE!");
});

const port = 3000;
app.listen(port, () => {
  console.log(`API está rodando na porta ${port}`);
});
