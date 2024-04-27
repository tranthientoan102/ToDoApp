import React, { useState, useEffect } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { AddTaskForm } from "./components/AddTaskForm";
import { Task } from "./components/Task";
import axios from "axios";
import { API_URL } from "./utils";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});
const lightTheme = createTheme({
  palette: {
    mode: "light",
  },
});


function App() {
  const [tasks, setTasks] = useState([]);
  const fetchTasks = async () => {
    try {
      console.log("fetching tasks");
      const { data } = await axios.get(API_URL);
      console.log(data);
      setTasks(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <ThemeProvider theme={lightTheme}>
      <CssBaseline />

      <AddTaskForm fetchTasks={fetchTasks} />
      {tasks.map((task) => (
        <Task key={task.id} task={task} fetchTasks={fetchTasks} />
      ))}
    </ThemeProvider>
  );
}

export default App;
