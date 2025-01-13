import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { format } from 'date-fns';

const TaskCreateForm = ({ participants, projectId, onSave }) => {
    const [open, setOpen] = useState(false);
    const [newTask, setNewTask] = useState({
        projectId: projectId,
        name: '',
        description: '',
        assignedTo: '',
        dueDate: '',
    });

    const handleInputChange = (field, value) => {
        setNewTask({ ...newTask, [field]: value });
    };

    const handleSave = async () => {
        try {
            const formattedDueDate = newTask.dueDate
                ? format(new Date(newTask.dueDate), 'yyyy-MM-dd HH:mm')
                : null;

            const taskData = { ...newTask, dueDate: formattedDueDate };
            await onSave(taskData);

            setNewTask({
                projectId: projectId,
                name: '',
                description: '',
                assignedTo: '',
                dueDate: '',
            });
            setOpen(false);
            alert('Task created successfully');
        } catch (error) {
            console.error('Error creating task:', error);
            alert('An error occurred while creating the task');
        }
    };

    const handleCancel = () => {
        setOpen(false);
        setNewTask({
            projectId: projectId,
            name: '',
            description: '',
            assignedTo: '',
            dueDate: '',
        });
    };

    return (
        <>
            <Fab
                color="primary"
                aria-label="add"
                sx={{ position: 'fixed', bottom: 16, right: 16 }}
                onClick={() => setOpen(true)}
            >
                <AddIcon />
            </Fab>

            <Dialog open={open} onClose={handleCancel}>
                <DialogTitle>Create New Task</DialogTitle>
                <DialogContent>
                    <TextField
                        label="Task Name"
                        fullWidth
                        margin="normal"
                        value={newTask.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                    />
                    <TextField
                        label="Description"
                        fullWidth
                        margin="normal"
                        multiline
                        rows={3}
                        value={newTask.description}
                        onChange={(e) => handleInputChange('description', e.target.value)}
                    />
                    <TextField
                        select
                        label="Assigned To"
                        fullWidth
                        margin="normal"
                        value={newTask.assignedTo}
                        onChange={(e) => handleInputChange('assignedTo', e.target.value)}
                        SelectProps={{
                            native: true,
                        }}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    >
                        <option value="">Unassigned</option>
                        {participants.map(participant => (
                            <option key={participant.id} value={participant.id}>
                                {participant.userName}
                            </option>
                        ))}
                    </TextField>
                    <TextField
                        label="Due Date"
                        fullWidth
                        margin="normal"
                        type="datetime-local"
                        value={newTask.dueDate}
                        onChange={(e) => handleInputChange('dueDate', e.target.value)}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        InputProps={{
                            inputProps: {
                                min: new Date().toISOString().slice(0, 16),
                            },
                        }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCancel} color="secondary">
                        Cancel
                    </Button>
                    <Button onClick={handleSave} color="primary">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default TaskCreateForm;
