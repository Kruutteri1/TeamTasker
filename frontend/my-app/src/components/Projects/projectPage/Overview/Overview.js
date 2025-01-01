import {useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {getCookie} from "../../../Token/Token";
import axios from "axios";

const Overview = () => {
    const { projectId } = useParams();
    const [project, setProject] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const jwtToken = getCookie('jwtToken');
    const actualToken = JSON.parse(jwtToken);

    useEffect(() => {
        const fetchProject = async () => {
            try {
                const response = await axios.get(`/api/team-tasker/projects/${projectId}`, {
                    headers: {
                        Authorization: `Bearer ${actualToken}`,
                    },
                });

                if (response.status === 200) {
                    setProject(response.data);
                    setLoading(false);
                } else {
                    console.error('Error fetching project:', response.status);
                    setError('Error fetching project data');
                    setLoading(false);
                }
            } catch (error) {
                console.error('Error during fetch:', error);
                setError('An error occurred while fetching the project');
                setLoading(false);
            }
        };

        fetchProject();
    }, [projectId]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="card">
            <h2 className="project-title">{project?.name}</h2>
            <div className="project-content">
                <div className="content-item">
                    <p className="label">Project Description</p>
                    <p>{project?.description}</p>
                </div>
                <div className="content-item">
                    <p className="label">Owner</p>
                    <p>{project?.ownerUserName}</p>
                </div>
            </div>
        </div>
    );
};

export default Overview;
