import React from 'react';
import './ProjectCard.css';
import { useNavigate } from 'react-router-dom';

const ProjectCard = ({ project }) => {
    const navigate = useNavigate();

    return (
        <div className="project-card">
            <div className="project-title">
                {project.name}
            </div>
            <div className="project-description">
                {project.description}
            </div>
            <div className="project-author">
                Owner: {project.ownerUserName}
            </div>
            <button onClick={() => navigate(`/projects/${project.id}`)} className="view-project-btn">
                View Project
            </button>
        </div>
    );
};

export default ProjectCard;
