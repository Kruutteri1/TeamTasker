import React, { useState } from "react";
import axios from "axios";
import "./CreateProject.css";
import {getCookie} from "../Token/Token";
import {jwtDecode} from "jwt-decode";
import {useNavigate} from "react-router-dom";

const CreateProject = () => {
    const navigate = useNavigate();
    const [projectName, setProjectName] = useState("");
    const [description, setDescription] = useState("");

    const jwtToken = getCookie('jwtToken');
    const actualToken = JSON.parse(jwtToken);

    const decodedPayload = jwtDecode(jwtToken);
    const userId = decodedPayload.userId;

    const handleSubmit = async (e) => {
        e.preventDefault();

        const projectData = {
            projectName: projectName,
            description: description,
            userId: userId,
        };

        try {
            const response = await axios.post("/api/team-tasker/projects/create-new-project", projectData, {
                headers: {
                    Authorization: `Bearer ${actualToken}`,
                    'Content-Type': 'multipart/form-data'
                },
            });

            if (response.status === 200) {
                alert("Project created successfully!");
                navigate("/projects");
            } else {
                alert("Something went wrong. Please try again.");
            }
        } catch (error) {
            console.error("Error creating project:", error);
            alert("Error creating project. Please check the console for details.");
        }
    };

    return (
        <div className="create-project-container">
            <h1>Create New Project</h1>
            <form onSubmit={handleSubmit} className="create-project-form">
                <label htmlFor="projectName">Project Name:</label>
                <input
                    type="text"
                    id="projectName"
                    value={projectName}
                    onChange={(e) => setProjectName(e.target.value)}
                    required
                />

                <label htmlFor="description">Description:</label>
                <textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                ></textarea>

                <button type="submit" className="submit-btn">Create Project</button>
            </form>
        </div>
    );
};

export default CreateProject;
