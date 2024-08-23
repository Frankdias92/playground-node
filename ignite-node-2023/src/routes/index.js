import { Router } from "express";
import csvWriter from "../utils/csvWriter.js";
import { readCSV } from "../utils/csvReader.js";
import { generateId } from "../utils/idGenerator.js";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const data = await readCSV();
    res.json(data);
  } catch (error) {
    console.error("Error to read task from CSV :[", error);
    res.status(500).json({ message: "Error to read task from CSV :[", error });
  }
});

router.post("/", async (req, res) => {
    try {
        const { title, description, is_completed = false } = req.body;

        if (!title || !description) {
            return res.status(400).json({ message: "Title and description are required." });
        }

        const created_at = new Date().toISOString();
        const newTask = {
            id: generateId(),
            title,
            description,
            completed_at: is_completed ? new Date().toISOString() : null,
            created_at,
            updated_at: created_at,
            is_completed,
        };

        const data = await csvWriter.writeRecords([newTask]);

        res.status(201).json(data);
    } catch (error) {
        console.error("Error to save the task", error);
        res.status(500).json({ message: "Error to save the task", error });
    }
});

router.put("/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const { title, description, is_completed } = req.body;
  
      const tasks = await readCSV();
      const taskIndex = tasks.findIndex((task) => task.id === id);
  
      if (taskIndex === -1) {
        return res.status(404).json({ message: "Task not found." });
      }
  
      const updated_at = new Date().toISOString();
  
      const updatedTask = {
        ...tasks[taskIndex],
        title: title !== undefined ? title : tasks[taskIndex].title,
        description:
          description !== undefined ? description : tasks[taskIndex].description,
        completed_at:
          is_completed !== undefined && is_completed
            ? new Date().toISOString()
            : tasks[taskIndex].completed_at,
        updated_at,
        is_completed:
          is_completed !== undefined ? is_completed : tasks[taskIndex].is_completed,
      };
  
      tasks[taskIndex] = updatedTask;
  
      // Sobrescreve o arquivo CSV com as tarefas atualizadas
      await csvWriter.writeRecords(tasks); // Não limpe o arquivo antes
  
      res.json(updatedTask);
    } catch (error) {
      console.error("Error updating task:", error);
      res.status(500).json({ message: "Error updating task", error });
    }
});
  

export default router;
