import React, { useEffect, useState } from 'react';
import { getCookie } from "../../../Token/Token";
import { useParams } from "react-router-dom";
import {getTasks, deleteTask, updateTask} from "./TaskService";
import { getParticipants } from "../Participants/ParticipantService";
import { Grid, Typography, CircularProgress } from '@mui/material';
import TaskCard from "./TaskCard";
import TaskEditForm from "./TaskEditForm";
import { format } from 'date-fns';

const Tasks = () => {
    const [tasks, setTasks] = useState([]);
    const [participants, setParticipants] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { projectId } = useParams();

    const jwtToken = getCookie('jwtToken');
    const actualToken = JSON.parse(jwtToken);

    useEffect(() => {
        const fetchTasksAndParticipants = async () => {
            try {
                const [tasksResponse, participantsResponse] = await Promise.all([
                    getTasks(projectId, actualToken),
                    getParticipants(projectId, actualToken)
                ]);

                if (tasksResponse.status === 200) {
                    setTasks(tasksResponse.data);
                } else {
                    setError('Error fetching tasks');
                }

                if (participantsResponse.status === 200) {
                    setParticipants(participantsResponse.data);
                } else {
                    setError('Error fetching participants');
                }
            } catch (error) {
                setError('An error occurred while fetching data');
            } finally {
                setLoading(false);
            }
        };

        fetchTasksAndParticipants();
    }, [projectId, actualToken]);

    const [editTask, setEditTask] = useState(null);

    const handleEdit = (task) => {
        const assignedParticipant = participants.find(
            participant => participant.userName === task.assignedTo
        );

        setEditTask({
            ...task,
            assignedTo: assignedParticipant ? assignedParticipant.id : task.assignedTo
        });
    };

    const handleCancelEdit = () => {
        setEditTask(null);
    };

    const handleSaveEdit = async () => {
        try {
            const formattedDueDate = format(new Date(editTask.dueDate), 'yyyy-MM-dd HH:mm');

            const updateTaskRequest = {
                name: editTask.name,
                description: editTask.description,
                assignedTo: editTask.assignedTo,
                dueDate: formattedDueDate,
                status: editTask.status,
            };

            const response = await updateTask(editTask.id, updateTaskRequest, actualToken);

            if (response.status === 200) {
                setTasks(tasks.map(task =>
                    task.id === editTask.id ? response.data : task
                ));
                setEditTask(null);
                alert('Task updated successfully');
            } else {
                alert('Failed to update the task');
            }
        } catch (error) {
            console.error('Error saving task:', error);
            alert('An error occurred while saving the task');
        }
    };

    const handleInputChange = (field, value) => {
        console.log(field, value);
        setEditTask({ ...editTask, [field]: value });
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

    if (loading) return <CircularProgress />;
    if (error) return <Typography color="error">{error}</Typography>;

    return (
        <Grid container spacing={3}>
            {tasks.map(task => (
                <Grid item xs={12} sm={6} md={4} key={task.id}>
                    {editTask && editTask.id === task.id ? (
                        <TaskEditForm
                            editTask={editTask}
                            participants={participants}
                            onSave={handleSaveEdit}
                            onCancel={handleCancelEdit}
                            onChange={handleInputChange}
                        />
                    ) : (
                        <TaskCard
                            task={task}
                            onEdit={handleEdit}
                            onDelete={handleDelete}
                        />
                    )}
                </Grid>
            ))}
        </Grid>
    );
};

export default Tasks;
