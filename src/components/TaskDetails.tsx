import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { Button } from '@material-ui/core';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
interface RouteParams {
  id: string;
}

const TaskDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const taskId = id ? parseInt(id, 10) : NaN;
  const tasks = useSelector((state: RootState) => state.tasks.tasks);
  const task = tasks.find((t) => t.id === taskId);

  if (!task) {
    return <div>Task not found</div>;
  }

  return (
    <div style={{ width: '60%', margin: 'auto' }}>
      <div style={{ display:'flex', alignItems:"center"}}>
        <Link style={{ flexGrow:1}} to={`/`}>
                <Button variant="contained">
                  <KeyboardBackspaceIcon />
                </Button>
              </Link> 
              <h2  style={{ flexGrow:1}}> Task Details</h2>
      </div>
      
     
      <div>
        <h3>{task.title}</h3>
        <div style={{ width: '100%', borderBottom: '1px solid #ccc', marginBottom: '10px' }}></div>
        <h4>Description:</h4>
        <p style={{ whiteSpace: 'pre-wrap' }}>{task.description}</p>
        <div style={{ width: '100%', borderBottom: '1px solid #ccc', marginBottom: '10px' }}></div>
        <h4>Due Date:</h4>
        <p>{task.dueDate || '---'}</p>
        <div style={{ width: '100%', borderBottom: '1px solid #ccc', marginBottom: '10px' }}></div>
        <h4>Completed:</h4>
        <p>{task.completed ? 'Yes' : 'No'}</p>
      </div>
    </div>
  );
};

export default TaskDetails;
