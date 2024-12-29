import { NavLink, useParams, Outlet } from 'react-router-dom';
import './Tabs.css';

const Tabs = () => {
    const { projectId } = useParams();

    return (
        <div className="tabs-container">
            <div className="tabs">
                <NavLink
                    to={`/projects/${projectId}`}
                    className={({ isActive }) => `tab-button ${isActive ? 'active' : ''}`}
                    end
                >
                    Overview
                </NavLink>

                <NavLink
                    to={`/projects/${projectId}/tasks`}
                    className={({ isActive }) => `tab-button ${isActive ? 'active' : ''}`}
                >
                    Tasks
                </NavLink>

                <NavLink
                    to={`/projects/${projectId}/participants`}
                    className={({ isActive }) => `tab-button ${isActive ? 'active' : ''}`}
                >
                    Participants
                </NavLink>
            </div>

            <div className="project-details">
                <Outlet />
            </div>
        </div>
    );
};

export default Tabs;
