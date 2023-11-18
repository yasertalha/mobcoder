import React, { useState } from "react";
import {
  addTask,
  editTask,
  toggleTaskCompletion,
  deleteTask
} from "../redux/tasks/tasksSlice";
import LaunchIcon from '@mui/icons-material/Launch';
import DeleteIcon from '@mui/icons-material/Delete';
import { useAppDispatch, useAppSelector } from "../redux/store";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Button,
  Checkbox,
} from "@mui/material";
import { Link } from "react-router-dom";

const TaskForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const tasks = useAppSelector((state) => state.tasks.tasks);
  const [editingTaskId, setEditingTaskId] = useState<number | null>(null);

  const [newTask, setNewTask] = useState({
    id: tasks?.[tasks.length-1]?.id+1 || 0,
    title: "",
    description: "",
    dueDate: "",
    completed: false,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewTask((prevTask) => ({
      ...prevTask,
      [name]: value,
    }));
  };

  const handleAddTask = () => {
    if(!newTask.title || !newTask.description) return alert("Title and Description are Mandatory fields");
    dispatch(addTask(newTask));
    setNewTask({
      id: newTask.id + 1,
      title: "",
      description: "",
      dueDate: "",
      completed: false,
    });
  };

  const handleEditClick = (taskId: number) => {
    setEditingTaskId(taskId);
  };

  const handleEditChange = (taskId: number, field: string, value: string) => {
    dispatch(editTask({ ...tasks[taskId], [field]: value }));
  };

  const handleDel = (taskId: number) => {
    if (window.confirm(`Delete Task with id : ${taskId}`)) {
      dispatch(deleteTask(taskId))
      
    } else {
    }
  };

  return (
    <div>
      <h2 style={{width:"100%", textAlign:"center"}}>TASK TABLE</h2>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell style={{ width: "10%" }}>Id</TableCell>
              <TableCell style={{ width: "20%" }}>Title *</TableCell>
              <TableCell style={{ width: "40%" }}>Description *</TableCell>
              <TableCell style={{ width: "10%" }}>Due Date</TableCell>
              <TableCell style={{ width: "20%" }}>Task Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>{newTask.id}</TableCell>
              <TableCell>
                <TextField
                  type="text"
                  name="title"
                  value={newTask.title}
                  onChange={handleInputChange}
                  style={{ width: "100%" }}
                />
              </TableCell>
              <TableCell>
                <TextField
                  multiline
                  type="text"
                  name="description"
                  value={newTask.description}
                  onChange={handleInputChange}
                  rows={3}
                  maxRows={6}
                  style={{ width: "100%", height: "auto" }}
                />
              </TableCell>
              <TableCell>
                <TextField
                  type="date"
                  name="dueDate"
                  value={newTask.dueDate}
                  onChange={handleInputChange}
                  style={{ width: "100%" }}
                />
              </TableCell>
              <TableCell>
                <Button variant="contained" onClick={handleAddTask}>
                  Add Task
                </Button>
              </TableCell>
            </TableRow>
            {[...tasks].reverse().map((task) => (
              <TableRow key={task.id} style={{ position:"relative"}}>
                <TableCell style={{ width: "10%" }}>{task.id}</TableCell>
                <TableCell
                  style={{ width: "20%", wordWrap: "break-word" }}
                  onClick={() => handleEditClick(task.id)}
                >
                  {editingTaskId === task.id ? (
                    <TextField
                      type="text"
                      name="title"
                      value={task.title}
                      onChange={(e) =>
                        handleEditChange(task.id, "title", e.target.value)
                      }
                    />
                  ) : (
                    task.title
                  )}
                </TableCell>
                <TableCell
                  style={{ width: "40%", wordWrap: "break-word" }}
                  onClick={() => handleEditClick(task.id)}
                >
                  {editingTaskId === task.id ? (
                    <TextField
                      multiline
                      type="text"
                      name="description"
                      value={task.description}
                      onChange={(e) =>
                        handleEditChange(task.id, "description", e.target.value)
                      }
                      rows={3}
                      maxRows={6}
                      style={{ width: "100%", height: "auto" }}
                    />
                  ) : (
                    task.description
                  )}
                </TableCell>
                <TableCell style={{ width: "10%" }}>
                  {(editingTaskId === task.id || !task.dueDate ) ? (
                    <TextField
                      type="date"
                      name="dueDate"
                      value={newTask.dueDate}
                      onChange={(e) =>
                        handleEditChange(task.id, "dueDate", e.target.value)
                      }
                      style={{ width: "100%" }}
                    />
                  ) : (
                    task.dueDate
                  )}
                </TableCell>
                <TableCell style={{ width: "20%" }}>
                  <Checkbox
                    checked={task.completed}
                    onChange={() => {
                      dispatch(toggleTaskCompletion(task.id));
                    }}
                  />
                  Completed
                </TableCell>
                <TableCell style={{ position:"absolute", left:0 }}>
              <Link to={`/task/${task.id}`}>
                <Button >
                  <LaunchIcon/>
                </Button>
              </Link>
            </TableCell>
                <TableCell style={{ position:"absolute", right:30}}>
              
                <Button onClick={()=>handleDel(task.id)}>
                  <DeleteIcon/>
                </Button>
            </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default TaskForm;
