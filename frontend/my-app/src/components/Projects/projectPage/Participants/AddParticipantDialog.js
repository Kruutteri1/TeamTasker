import React from 'react';
import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button } from '@mui/material';

const AddParticipantDialog = ({ open, onClose, onAdd, email, setEmail }) => (
    <Dialog open={open} onClose={onClose}>
        <DialogTitle>Add New Participant</DialogTitle>
        <DialogContent>
            <TextField
                autoFocus
                margin="dense"
                label="Email Address"
                type="email"
                fullWidth
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
        </DialogContent>
        <DialogActions>
            <Button onClick={onClose} color="secondary">Cancel</Button>
            <Button onClick={onAdd} variant="contained" color="primary">Add</Button>
        </DialogActions>
    </Dialog>
);

export default AddParticipantDialog;
