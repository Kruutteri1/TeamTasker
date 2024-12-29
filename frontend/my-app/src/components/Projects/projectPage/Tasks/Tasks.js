import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {getCookie} from "../../../Token/Token";
import {useParams} from "react-router-dom";

const Tasks = () => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { projectId } = useParams();

    const jwtToken = getCookie('jwtToken');
    const actualToken = JSON.parse(jwtToken);

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await axios.get(`/api/team-tasker/projects/${projectId}/tasks`, {
                    headers: {
                        Authorization: `Bearer ${actualToken}`,
                    },
                });

                if (response.status === 200) {
                    setTasks(response.data);
                    setLoading(false);
                } else {
                    console.error('Error fetching tasks:', response.status);
                    setError('Error fetching tasks');
                    setLoading(false);
                }
            } catch (error) {
                console.error('Error during fetch:', error);
                setError('An error occurred while fetching tasks');
                setLoading(false);
            }
        };

        fetchTasks();
    }, [projectId]);

    if (loading) {
        return <div>Loading tasks...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <h2>Tasks</h2>
            <ul>
                {tasks.map(task => (
                    <li key={task.id}>{task.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default Tasks;
