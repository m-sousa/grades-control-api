import express from "express";
import { promises } from "fs";
import path from "path";

const app = express();
const { readFile, writeFile } = promises;

const port = 3333;

app.get("/", (request, response) => {
  return response.send("Hello world");
});

// Atividade 04
app.get("/grades/:id", async (request, response) => {
  const id = Number(request.params.id);
  const gradesFile = await loadGrades();
  const selectedGrade = gradesFile.grades.find((grade) => grade.id === id);

  if (!selectedGrade) {
    return response.status(404).send("Not found");
  }

  return response.json(selectedGrade);
});

app.listen(port, () => {
  console.log(`Servidor iniciado na porta ${port}`);
});

async function loadGrades() {
  try {
    const response = await readFile(path.resolve("database/grades.json"));
    const data = JSON.parse(response);
    return data;
  } catch (error) {
    console.log(error);
  }
}
