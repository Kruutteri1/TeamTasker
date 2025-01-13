import React from 'react';
import {
    Box, TextField, Button, MenuItem
} from '@mui/material';
import { Save, Cancel } from '@mui/icons-material';
import useStyles from './Tasks.styles';

const TaskEditForm = ({ editTask, participants, onSave, onCancel, onChange }) => {
    const classes = useStyles();

    return (
        <Box>
            <TextField
                label="Task Name"
                value={editTask.name}
                onChange={(e) => onChange('name', e.target.value)}
                fullWidth
                required
                margin="normal"
            />
            <TextField
                label="Description"
                value={editTask.description}
                onChange={(e) => onChange('description', e.target.value)}
                fullWidth
                multiline
                rows={4}
                margin="normal"
            />
            <TextField
                select
                label="Assigned To"
                value={participants.some(p => p.id === editTask.assignedTo) ? editTask.assignedTo : ''}
                onChange={(e) => onChange('assignedTo', e.target.value)}
                fullWidth
                margin="normal"
            >
                <MenuItem value="">
                    Unselected
                </MenuItem>
                {participants.map(participant => (
                    <MenuItem key={participant.id} value={participant.id}>
                        {participant.userName}
                    </MenuItem>
                ))}
            </TextField>
            <TextField
                select
                label="Status"
                value={editTask.status}
                onChange={(e) => onChange('status', e.target.value)}
                fullWidth
                margin="normal"
            >
                <MenuItem value="todo">To Do</MenuItem>
                <MenuItem value="in_progress">In Progress</MenuItem>
                <MenuItem value="done">Done</MenuItem>
            </TextField>
            <TextField
                label="Due Date"
                type="datetime-local"
                value={editTask.dueDate}
                onChange={(e) => onChange('dueDate', e.target.value)}
                fullWidth
                margin="normal"
                InputLabelProps={{ shrink: true }}
            />
            <Box className={classes.actions}>
                <Button
                    startIcon={<Save />}
                    variant="contained"
                    color="primary"
                    onClick={onSave}
                    sx={{ marginTop: '10px' }}
                >
                    Save
                </Button>
                <Button
                    startIcon={<Cancel />}
                    variant="outlined"
                    color="secondary"
                    onClick={onCancel}
                    sx={{ marginTop: '10px', marginLeft: '10px' }}
                >
                    Cancel
                </Button>
            </Box>
        </Box>
    );
};

export default TaskEditForm;
