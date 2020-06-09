import express from "express";

const app = express();

const port = 3333;

app.get("/", (request, response) => {
  return response.send("Hello world");
});

app.listen(port, () => {
  console.log(`Servidor iniciado na porta ${port}`);
});
