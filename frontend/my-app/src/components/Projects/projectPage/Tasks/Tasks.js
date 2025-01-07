import React, { useEffect, useState } from 'react';
import { getCookie } from "../../../Token/Token";
import { useParams, useNavigate } from "react-router-dom";
import { getTasks, deleteTask } from "./TaskService";
import { Grid, Card, CardContent, Typography, CircularProgress, Chip, Tooltip, Button } from '@mui/material';
import { CheckCircle, HourglassEmpty, ErrorOutline, Edit, Delete } from '@mui/icons-material';
import useStyles from './Tasks.styles';

const Tasks = () => {
    const classes = useStyles();
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { projectId } = useParams();
    const navigate = useNavigate();

    const jwtToken = getCookie('jwtToken');
    const actualToken = JSON.parse(jwtToken);

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await getTasks(projectId, actualToken);
                if (response.status === 200) {
                    setTasks(response.data);
                    console.log('Tasks fetched:', response.data);
                } else {
                    setError('Error fetching tasks');
                }
            } catch (error) {
                setError('An error occurred while fetching tasks');
            } finally {
                setLoading(false);
            }
        };

        fetchTasks();
    }, [projectId, actualToken]);

    const getStatusChip = (status) => {
        switch (status) {
            case 'done':
                return <Chip icon={<CheckCircle />} label="Done" className={`${classes.statusChip} ${classes.done}`} />;
            case 'in_progress':
                return <Chip icon={<HourglassEmpty />} label="In Progress" className={`${classes.statusChip} ${classes.inProgress}`} />;
            case 'todo':
            default:
                return <Chip icon={<ErrorOutline />} label="To Do" className={`${classes.statusChip} ${classes.todo}`} />;
        }
    };

    const handleDelete = async (taskId) => {
        try {
            const response = await deleteTask(taskId, actualToken);
            if (response.status === 200) {
                setTasks(tasks.filter(task => task.id !== taskId));
                alert('Task deleted successfully');
            } else {
                alert('Failed to delete task');
            }
        } catch (error) {
            console.error('Error deleting task:', error);
            alert('An error occurred while deleting the task');
        }
    };

    const handleEdit = (taskId) => {
        navigate(`/edit-task/${taskId}`);
    };

    if (loading) return <CircularProgress />;
    if (error) return <Typography color="error">{error}</Typography>;

    return (
        <Grid container spacing={3}>
            {tasks.map(task => (
                <Grid item xs={12} sm={6} md={4} key={task.id}>
                    <Card className={classes.card}>
                        <CardContent>
                            <Typography variant="h6" gutterBottom>{task.name}</Typography>
                            <Typography variant="body2" color="textSecondary">{task.description || 'No description'}</Typography>
                            <Typography variant="body2" color="textSecondary">Assigned To: {task.assignedTo || 'Unassigned'}</Typography>
                            <Tooltip title={`Created At: ${new Date(task.createdAt).toLocaleString()}`}>
                                <Typography variant="body2" color="textSecondary">Due Date: {task.dueDate ? new Date(task.dueDate).toLocaleString() : 'No due date'}</Typography>
                            </Tooltip>

                            <Grid container alignItems="center" justifyContent="space-between">
                                <Grid item>
                                    {getStatusChip(task.status)}
                                </Grid>

                                <Grid item>
                                    <Button
                                        startIcon={<Edit />}
                                        variant="outlined"
                                        color="primary"
                                        onClick={() => handleEdit(task.id)}
                                        sx={{ marginTop: '10px' }}>
                                        Edit
                                    </Button>
                                    <Button
                                        startIcon={<Delete />}
                                        variant="outlined"
                                        color="secondary"
                                        onClick={() => handleDelete(task.id)}
                                        sx={{ marginTop: '10px', marginLeft: '10px' }}>
                                        Delete
                                    </Button>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>
            ))}
        </Grid>
    );
};

export default Tasks;
