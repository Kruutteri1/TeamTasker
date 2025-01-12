import React from 'react';
import { Card, CardContent, Typography, Button, Chip, Grid, Tooltip, Box } from '@mui/material';
import { CheckCircle, HourglassEmpty, ErrorOutline, Edit, Delete } from '@mui/icons-material';
import useStyles from './Tasks.styles';

const TaskCard = ({ task, onEdit, onDelete }) => {
    const classes = useStyles();

    const getStatusChip = (status) => {
        switch (status) {
            case 'done':
                return (
                    <Chip icon={<CheckCircle />} label="Done" sx={{ backgroundColor: '#4caf50', color: '#fff', marginTop: '10px' }} />
                );
            case 'in_progress':
                return (
                    <Chip icon={<HourglassEmpty />} label="In Progress" sx={{ backgroundColor: '#ff9800', color: '#fff', marginTop: '10px' }} />
                );
            case 'todo':
            default:
                return (
                    <Chip icon={<ErrorOutline />} label="To Do" sx={{ backgroundColor: '#f44336', color: '#fff', marginTop: '10px' }} />
                );
        }
    };

    return (
        <Card className={classes.card}>
            <CardContent>
                <Box>
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
                                onClick={() => onEdit(task)}
                                sx={{ marginTop: '10px' }}
                            >
                                Edit
                            </Button>
                            <Button
                                startIcon={<Delete />}
                                variant="outlined"
                                color="secondary"
                                onClick={() => onDelete(task.id)}
                                sx={{ marginTop: '10px', marginLeft: '10px' }}
                            >
                                Delete
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
            </CardContent>
        </Card>
    );
};

export default TaskCard;
