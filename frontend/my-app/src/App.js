import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import ResponsiveAppBar from './components/navbar/ResponsiveAppBar';
import Home from "./Home";
import Authenticate from "./components/Register/Authenticate";
import Registration from "./components/Register/Registration";
import ProjectList from "./components/Projects/ProjectList";
import CreateProject from "./components/Projects/create/CreateProject";
import Tabs from "./components/Projects/projectPage/Tabs/Tabs";
import Tasks from "./components/Projects/projectPage/Tasks/Tasks";
import Participants from "./components/Projects/projectPage/Participants/Participants";
import Overview from "./components/Projects/projectPage/Overview/Overview";

function App() {
    return (
            <Router>
                <ResponsiveAppBar/>
                <Routes>
                    <Route path='/' element={<Home/>}/>
                    <Route path='/authenticate' element={<Authenticate/>}/>
                    <Route path='/registration' element={<Registration/>}/>
                    <Route path="/projects" element={<ProjectList/>}/>
                    <Route path="/projects/create-new-project" element={<CreateProject/>}/>
                    <Route path="/projects/:projectId" element={<Tabs />}>
                        <Route index element={<Overview />} />
                        <Route path="tasks" element={<Tasks />} />
                        <Route path="participants" element={<Participants />} />
                    </Route>
                </Routes>

            </Router>
    );
}

export default App;
