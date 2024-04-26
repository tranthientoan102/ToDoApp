import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import { Typography } from "@mui/material";
import axios, { Axios } from "axios";
import { API_URL } from "../utils";

export const AddTaskForm = ({ fetchTasks }) => {
  const [task, settask] = useState("");
  const addNewTask = async () => {
    try {
      await axios.post(API_URL, {
        name: task,
        isComplete: false,
      });
      await fetchTasks();
      settask("");
    } catch (error) {}
  };
  return (
    <div>
      <Typography variant="h4" align="center" margin={2}>
        Add Task
      </Typography>
      <div className="addTaskForm">
        <TextField
          id="outlined-basic"
          label="Outlined"
          variant="outlined"
          size="small"
          value={task}
          onChange={(e) => settask(e.target.value)}
        />
        <Button variant="contained" onClick={addNewTask}>
          <AddIcon />
        </Button>
      </div>
    </div>
  );
};
