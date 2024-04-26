import React, { useState } from "react";
// import { CheckBox } from "@mui/material";
import { Checkbox, Button, Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { UpdateTaskForm } from "./UpdateTaskForm";
import classnames from "classnames";
import axios from "axios";
import { API_URL } from "../utils";

export const Task = ({ task, fetchTasks }) => {
  const { id, name, completed } = task;
  const [isCompleted, setisCompleted] = useState(completed);
  const [isDialogOpen, setisDialogOpen] = useState(false);

  const handleUpdateTaskComplete = async () => {
    try {
      await axios.put(API_URL, { id, name, completed: !isCompleted });
      setisCompleted(!isCompleted);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteTask = async () => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      await fetchTasks();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="task">
      <div className={classnames("flex", { done: isCompleted })}>
        <Checkbox checked={isCompleted} onChange={handleUpdateTaskComplete} />
        <Typography variant="h4">{name}</Typography>
      </div>
      <div className="taskButtons">
        <Button variant="contained" onClick={() => setisDialogOpen(true)}>
          <EditIcon />
        </Button>
        <Button variant="contained" onClick={handleDeleteTask}>
          <DeleteIcon />
        </Button>
      </div>
      <UpdateTaskForm
        fetchTasks={fetchTasks}
        isDialogOpen={isDialogOpen}
        setisDialogOpen={setisDialogOpen}
        task={task}
      />
    </div>
  );
};
