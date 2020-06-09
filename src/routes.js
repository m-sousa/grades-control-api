import express from "express";

import { promises } from "fs";
import path from "path";

const routes = express.Router();
const { readFile, writeFile } = promises;

routes.get("/", (request, response) => {
  return response.send("Hello world");
});

// Atividade 01
routes.post("/grades", async (request, response) => {
  let gradesFile = await loadGrades();
  let newGrade = request.body;
  const { student, subject, type, value } = newGrade;

  newGrade = {
    id: gradesFile.nextId,
    student,
    subject,
    type,
    value,
    timestamp: new Date().toISOString(),
  };

  gradesFile.grades.push(newGrade);
  gradesFile.nextId += 1;

  await writeFile("src/database/grades.json", JSON.stringify(gradesFile));

  return response.json(newGrade);
});

// Atividade 04
routes.get("/grades/:id", async (request, response) => {
  const id = Number(request.params.id);
  const gradesFile = await loadGrades();
  const selectedGrade = gradesFile.grades.find((grade) => grade.id === id);

  if (!selectedGrade) {
    return response.status(404).send("Not found");
  }

  return response.json(selectedGrade);
});

async function loadGrades() {
  try {
    const response = await readFile(path.resolve("src/database/grades.json"));
    const data = JSON.parse(response);
    return data;
  } catch (error) {
    console.log(error);
  }
}

export default routes;
