import React, { useEffect, useState } from 'react';
import { Button, CircularProgress, Box, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { getCookie } from '../../../Token/Token';
import { useParams } from 'react-router-dom';
import ParticipantList from './ParticipantList';
import AddParticipantDialog from './AddParticipantDialog';
import { getParticipants, addParticipant, updateRole, deleteParticipant } from './ParticipantService';

const Participants = () => {
    const [participants, setParticipants] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editingRole, setEditingRole] = React.useState(null);
    const [newRole, setNewRole] = React.useState('');
    const [openDialog, setOpenDialog] = useState(false);
    const [newParticipantEmail, setNewParticipantEmail] = useState('');
    const { projectId } = useParams();

    const jwtToken = getCookie('jwtToken');
    const actualToken = JSON.parse(jwtToken);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getParticipants(projectId, actualToken);
                setParticipants(response.data);
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch participants');
                setLoading(false);
            }
        };

        fetchData();
    }, [projectId, actualToken]);

    const handleAddParticipant = async () => {
        try {
            const response = await addParticipant(projectId, newParticipantEmail, actualToken);

            if (response.status === 200) {
                setOpenDialog(false);
                setNewParticipantEmail('');
                window.location.reload();
            } else {
                console.warn('Unexpected status:', response.status);
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

    const handleUpdateRole = async (id) => {
        try {
            await updateRole(id, newRole, actualToken);
            setOpenDialog(false);
            setNewParticipantEmail('');
            window.location.reload();
        } catch (err) {
            setError('Failed to add participant');
        }
    };

    const handleDeleteParticipant = async (id) => {
        try {
            await deleteParticipant(id, actualToken);
            setParticipants(participants.filter((p) => p.id !== id));
        } catch (err) {
            setError('Failed to delete participant');
        }
    };

    return (
        <Box sx={{ padding: 2 }}>
            {loading ? (
                <Box display="flex" justifyContent="center"><CircularProgress /></Box>
            ) : error ? (
                <Typography color="error">{error}</Typography>
            ) : (
                <>
                    <Typography variant="h4" gutterBottom>Project Participants</Typography>
                    <Button
                        variant="contained"
                        startIcon={<AddIcon />}
                        onClick={() => setOpenDialog(true)}
                        sx={{ marginBottom: 2 }}
                    >
                        Add Participant
                    </Button>
                    <ParticipantList
                        participants={participants}
                        onEditRole={(id) => setEditingRole(id)}
                        editingRole={editingRole}
                        newRole={newRole}
                        setNewRole={setNewRole}
                        handleUpdateRole={handleUpdateRole}
                        onDelete={handleDeleteParticipant}
                    />
                    <AddParticipantDialog
                        open={openDialog}
                        onClose={() => setOpenDialog(false)}
                        onAdd={handleAddParticipant}
                        email={newParticipantEmail}
                        setEmail={setNewParticipantEmail}
                    />
                </>
            )}
        </Box>
    );
};

export default Participants;
