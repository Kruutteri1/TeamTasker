import axios from 'axios';

const BASE_URL = '/api/team-tasker/project-participants';

const getParticipants = async (projectId, token) => {
    return await axios.get(`${BASE_URL}/${projectId}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

const updateRole = async (id, role, token) => {
    return await axios.put(`${BASE_URL}/update-role/${id}`, null, {
        params: { role },
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

const deleteParticipant = async (id, token) => {
    return await axios.delete(`${BASE_URL}/delete/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

const addParticipant = async (projectId, email, token) => {
    return await axios.post(`${BASE_URL}/add`, null, {
        params: { projectId, email },
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

export { getParticipants, updateRole, deleteParticipant, addParticipant };
