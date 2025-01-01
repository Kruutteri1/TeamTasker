import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {getCookie} from "../../../Token/Token";
import {useParams} from "react-router-dom";
import {
    Button, List, ListItem, ListItemText, IconButton, CircularProgress, Box, Typography,
    MenuItem, Select, FormControl, InputLabel, Dialog, DialogTitle, DialogContent,
    TextField, DialogActions
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';

const Participants = () => {
    const [participants, setParticipants] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editingRole, setEditingRole] = useState(null);
    const [newRole, setNewRole] = useState('');
    const [openDialog, setOpenDialog] = useState(false);
    const [newParticipantEmail, setNewParticipantEmail] = useState('');
    const {projectId} = useParams();

    const jwtToken = getCookie('jwtToken');
    const actualToken = JSON.parse(jwtToken);

    useEffect(() => {
        const fetchParticipants = async () => {
            try {
                const response = await axios.get(`/api/team-tasker/project-participants/${projectId}`, {
                    headers: {
                        Authorization: `Bearer ${actualToken}`,
                    },
                });

                if (response.status === 200) {
                    setParticipants(response.data);
                    setLoading(false);
                } else {
                    console.error('Error fetching participants:', response.status);
                    setError('Error fetching participants');
                    setLoading(false);
                }
            } catch (error) {
                console.error('Error during fetch:', error);
                setError('An error occurred while fetching participants');
                setLoading(false);
            }
        };

        fetchParticipants();
    }, [projectId]);

    const handleRoleChange = async (id) => {
        try {
            const response = await axios.put(`/api/team-tasker/project-participants/update-role/${id}`, null,
                {
                    params: {
                        role: newRole,
                    },
                    headers: {
                        Authorization: `Bearer ${actualToken}`,
                    },
                });

            if (response.status === 200) {
                setParticipants((prevParticipants) =>
                    prevParticipants.map((participant) =>
                        participant.id === id ? {...participant, role: newRole} : participant
                    )
                );
                setEditingRole(null);
                setNewRole('');
            } else {
                console.error('Unexpected response:', response);
                setError('Unexpected response from server');
            }
        } catch (error) {
            console.error('Error updating role:', error);
            setError('An error occurred while updating the role');
        }
    };

    const handleDeleteParticipant = async (id) => {
        try {
            const response = await axios.delete(`/api/team-tasker/project-participants/delete/${id}`, {
                headers: {
                    Authorization: `Bearer ${actualToken}`,
                },
            });

            if (response.status === 200) {
                setParticipants((prevParticipants) =>
                    prevParticipants.filter((participant) => participant.id !== id)
                );
            } else {
                console.error('Unexpected response:', response);
                setError('Unexpected response from server');
            }
        } catch (error) {
            console.error('Error deleting participant:', error);
            setError('An error occurred while deleting the participant');
        }
    };

    const handleAddParticipant = async () => {
        try {
            const response = await axios.post(
                `/api/team-tasker/project-participants/add`, null, {
                    params: {
                        projectId: projectId,
                        email: newParticipantEmail,
                    },
                    headers: {
                        Authorization: `Bearer ${actualToken}`,
                    },
                }
            );

            if (response.status === 200) {
                setOpenDialog(false);
                setNewParticipantEmail('');
                window.location.reload();
            } else {
                console.error('Unexpected response:', response);
                setError('Unexpected response from server');
            }
        } catch (error) {
            if (error.response) {
                console.error('Server error:', error.response.data);
                setError(error.response.data);
            } else {
                console.error('Network error or unexpected issue:', error);
                setError('An unexpected error occurred while adding the participant');
            }
        }
    };

    if (loading) {
        return <Box display="flex" justifyContent="center" alignItems="center"><CircularProgress/></Box>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <Box sx={{padding: 2}}>
            <Typography variant="h4" gutterBottom>Project Participants</Typography>
            <Button
                variant="contained"
                startIcon={<AddIcon/>}
                onClick={() => setOpenDialog(true)}
                sx={{marginBottom: 2}}
            >
                Add Participant
            </Button>
            <List>
                {participants.map((participant) => (
                    <ListItem key={participant.id} sx={{
                        marginBottom: 2,
                        border: '1px solid #ddd',
                        padding: 2,
                        borderRadius: 2,
                        width: '500px',
                        display: 'flex',
                        justifyContent: 'space-between'
                    }}>
                        <Box sx={{display: 'flex', flexDirection: 'column'}}>
                            <ListItemText
                                primary={`${participant.userName}`}
                                secondary={`Role: ${participant.role}`}
                            />
                        </Box>
                        <Box sx={{display: 'flex', gap: 2}}>
                            <IconButton edge="end" onClick={() => setEditingRole(participant.id)} color="primary">
                                <EditIcon/>
                            </IconButton>
                            <IconButton edge="end" onClick={() => handleDeleteParticipant(participant.id)}
                                        color="error">
                                <DeleteIcon/>
                            </IconButton>
                        </Box>
                        {editingRole === participant.id && (
                            <Box sx={{marginTop: 2}}>
                                <FormControl fullWidth>
                                    <InputLabel>Role</InputLabel>
                                    <Select
                                        value={newRole}
                                        onChange={(e) => setNewRole(e.target.value)}
                                        label="Role"
                                    >
                                        <MenuItem value="OWNER">Owner</MenuItem>
                                        <MenuItem value="COLLABORATOR">Collaborator</MenuItem>
                                        <MenuItem value="VIEWER">Viewer</MenuItem>
                                    </Select>
                                </FormControl>
                                <Button
                                    variant="contained"
                                    sx={{marginTop: 2}}
                                    onClick={() => handleRoleChange(participant.id)}
                                >
                                    Update Role
                                </Button>
                            </Box>
                        )}
                    </ListItem>
                ))}
            </List>
            <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
                <DialogTitle>Add New Participant</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Email Address"
                        type="email"
                        fullWidth
                        value={newParticipantEmail}
                        onChange={(e) => setNewParticipantEmail(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenDialog(false)} color="secondary">Cancel</Button>
                    <Button onClick={handleAddParticipant} variant="contained" color="primary">Add</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default Participants;
