import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {getCookie} from "../../../Token/Token";
import {useParams} from "react-router-dom";

const Participants = () => {
    const [participants, setParticipants] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { projectId } = useParams();

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

    if (loading) {
        return <div>Loading participants...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <h2>Participants</h2>
            <ul>
                {participants.map(participant => (
                    <li key={participant.id}>{participant.userName} { participant.role}</li>
                ))}
            </ul>
        </div>
    );
};

export default Participants;
