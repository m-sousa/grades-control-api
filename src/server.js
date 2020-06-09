import express from "express";
import routes from "./routes.js";

const port = 3333;
const app = express();

app.use(express.json());
app.use(routes);

app.listen(port, () => {
  console.log(`Servidor iniciado na porta ${port}`);
});
