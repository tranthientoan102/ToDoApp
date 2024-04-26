
import express from "express";
import { fetchTasks, createTasks, updateTasks, deleteTasks } from "./task.js";
import serverless from "serverless-http";
import cors from "cors";

const app = express();
const port = 3001;

app.use(express.json());
if (process.env.DEVELOPMENT) {
  app.use(cors());
}

app.get("/", async (req, res) => {
  res.send("Hello World!");
});

app.get("/tasks", async (req, res) => {
  try {
    const tasks = await fetchTasks();
    res.send(tasks);
  } catch (error) {
    res.status(400).send(`Error fetching data: ${error}`);
  }
});

app.post("/tasks", async (req, res) => {
  try {
    const task = req.body;
    const response = await createTasks(task)
    res.send(response);
  } catch (error) {
    res.status(400).send(`Error fetching data: ${error}`);
  }
});

app.put("/tasks", async (req, res) => {
    try {
      const task = req.body;
      const response = await updateTasks(task);
      res.send(response);
    } catch (error) {
      res.status(400).send(`Error fetching data: ${error}`);
    }
});

app.delete("/tasks/:id", async (req, res) => {
    try {
      const {id} = req.params;
      const response = await deleteTasks(id);
      res.send(response);
    } catch (error) {
      res.status(400).send(`Error fetching data: ${error}`);
    }
});

//////////////////////

if (process.env.DEVELOPMENT) {
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
}

export const handler = serverless(app);