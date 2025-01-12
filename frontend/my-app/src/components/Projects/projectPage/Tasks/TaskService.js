import axios from 'axios';

const BASE_URL = '/api/team-tasker/projects/tasks';

const getTasks = async (projectId, token) => {
    return await axios.get(`${BASE_URL}/${projectId}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

const updateTask = async (taskId, updateTaskRequest, token) => {
    return await axios.put(`${BASE_URL}/update/${taskId}`, updateTaskRequest, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}

const deleteTask = async (taskId, token) => {
    return axios.delete(`${BASE_URL}/delete/${taskId}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
};

export { getTasks, updateTask, deleteTask };