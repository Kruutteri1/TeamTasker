import React from 'react';
import {List, ListItem, ListItemText, IconButton, Box, Select, InputLabel, FormControl} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";

const ParticipantList = ({ participants, onEditRole, onDelete, editingRole, newRole, setNewRole, handleUpdateRole }) => (
    <List>
        {participants.map((participant) => (
            <ListItem key={participant.id} sx={{ marginBottom: 2, border: '1px solid #ddd', padding: 2, borderRadius: 2 }}>
                <Box sx={{ flex: 1 }}>
                    <ListItemText primary={participant.userName} secondary={`Role: ${participant.role}`} />
                </Box>
                <Box sx={{ display: 'flex', gap: 2 }}>
                    <IconButton edge="end" onClick={() => onEditRole(participant.id)} color="primary">
                        <EditIcon />
                    </IconButton>
                    <IconButton edge="end" onClick={() => onDelete(participant.id)} color="error">
                        <DeleteIcon />
                    </IconButton>
                </Box>

                {editingRole === participant.id && (
                    <Box sx={{ marginTop: 2 }}>
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
                            sx={{ marginTop: 2 }}
                            onClick={() => handleUpdateRole(participant.id)}
                        >
                            Update Role
                        </Button>
                    </Box>
                )}
            </ListItem>
        ))}
    </List>
);


export default ParticipantList;
