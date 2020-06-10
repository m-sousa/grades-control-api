import express from "express";
import { promises } from "fs";
import path from "path";

const routes = express.Router();
const { readFile, writeFile } = promises;
const databaseFilePath = "src/database/grades.json";

// routes.get("/", (request, response) => {
//   return response.send("Hello world");
// });

// Atividade 01
routes.post("/", async (request, response) => {
  try {
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

    await writeFile(databaseFilePath, JSON.stringify(gradesFile));

    response.json(newGrade);
  } catch (error) {
    response.status(400).send({ error: error.message });
  }
});

// Atividade 02
routes.put("/", async (request, response) => {
  try {
    const { id, student, subject, type, value } = request.body;
    let gradesFile = await loadGrades();
    const index = gradesFile.grades.findIndex(
      (grade) => grade.id === Number(id)
    );

    if (index < 0) return response.status(404).send("Not found");

    gradesFile.grades[index].student = student;
    gradesFile.grades[index].subject = subject;
    gradesFile.grades[index].type = type;
    gradesFile.grades[index].value = value;

    await writeFile(databaseFilePath, JSON.stringify(gradesFile));

    response.end();
  } catch (error) {
    return response.status(400).send({ error: error.message });
  }
});

// Atividade 03
routes.delete("/:id", async (request, response) => {
  try {
    const id = Number(request.params.id);
    let gradesFile = await loadGrades();
    const selectedGrade = gradesFile.grades.find((grade) => grade.id === id);

    if (!selectedGrade) return response.status(404).send("Not found");

    gradesFile.grades = gradesFile.grades.filter((grade) => grade.id !== id);

    await writeFile(databaseFilePath, JSON.stringify(gradesFile));
    response.end();
  } catch (error) {
    return response.status(400).send({ error: error.message });
  }
});

// Atividade 04
routes.get("/:id", async (request, response) => {
  try {
    const id = Number(request.params.id);
    const gradesFile = await loadGrades();
    const selectedGrade = gradesFile.grades.find((grade) => grade.id === id);

    if (!selectedGrade) return response.status(404).send("Not found");

    return response.json(selectedGrade);
  } catch (error) {
    return response.status(400).send({ error: error.message });
  }
});

async function loadGrades() {
  try {
    const response = await readFile(path.resolve(databaseFilePath));
    const data = JSON.parse(response);
    return data;
  } catch (error) {
    console.log(error);
  }
}

export default routes;
