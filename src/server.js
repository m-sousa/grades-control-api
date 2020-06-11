import express from "express";
import gradesRouter from "./routes/grades.js";

const port = 3333;
const app = express();

app.use(express.json());
app.use("/grades", gradesRouter);

app.listen(port, () => {
  console.log(`Servidor iniciado na porta ${port}`);
});
