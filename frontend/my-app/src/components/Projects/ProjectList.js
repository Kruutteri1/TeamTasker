import React, { useEffect, useState } from 'react';
import ProjectCard from './ProjectCard';
import './ProjectList.css';
import { getCookie } from "../Token/Token";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const ProjectList = () => {
    const [projects, setProjects] = useState([]);
    const [filter, setFilter] = useState('all');

    const jwtToken = getCookie('jwtToken');
    const actualToken = JSON.parse(jwtToken);

    const decodedPayload = jwtDecode(jwtToken);
    const userId = decodedPayload.userId;

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await axios.get(`/api/team-tasker/projects?userId=${userId}`, {
                    headers: {
                        Authorization: `Bearer ${actualToken}`,
                    },
                });

                if (response.status === 200) {
                    if (Array.isArray(response.data) && response.data.length > 0) {
                        setProjects(response.data);
                    } else {
                        console.error('No projects found');
                    }
                } else {
                    console.error('Error fetching projects:', response.status);
                }
            } catch (error) {
                console.error('Error during fetch:', error);
            }
        };

        fetchProjects();
    }, []);

    return (
        <div className="project-list-container">
            <div className="filter-buttons">
                <button onClick={() => setFilter('my')} className={filter === 'my' ? 'active' : ''}>
                    Only My Projects
                </button>
                <button onClick={() => setFilter('all')} className={filter === 'all' ? 'active' : ''}>
                    All Projects
                </button>
            </div>
            <div className="project-list">
                {projects.map((project) => (
                    <ProjectCard key={project.id} project={project} />
                ))}
            </div>
        </div>
    );
};

export default ProjectList;
