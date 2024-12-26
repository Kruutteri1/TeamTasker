import React from 'react';
import './ProjectCard.css';

const ProjectCard = ({ project }) => {
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
            <button className="view-project-btn">
                View Project
            </button>
        </div>
    );
};

export default ProjectCard;
