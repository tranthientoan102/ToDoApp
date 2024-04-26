import React, { useState } from "react";
import { Dialog, DialogTitle, Button, TextField } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import { API_URL } from "../utils";

export const UpdateTaskForm = ({
  fetchTasks,
  isDialogOpen,
  setisDialogOpen,
  task,
}) => {
  const { id, completed } = task;
  const [taskName, setTaskName] = useState("");

  const handleUpdateTaskName = async () => {
    try {
      axios.put(API_URL, { id, name: taskName, completed });
      await fetchTasks();
      setTaskName("");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Dialog open={isDialogOpen}>
      <DialogTitle>Update Task</DialogTitle>
      <div className="dialog">
        <TextField
          size="small"
          label="Task Name"
          onChange={(e) => setTaskName(e.target.value)}
        />
        <Button
          variant="contained"
          onClick={async () => {
            await handleUpdateTaskName();
            setisDialogOpen(false);
          }}
        >
          <CloseIcon />
        </Button>
      </div>
    </Dialog>
  );
};
