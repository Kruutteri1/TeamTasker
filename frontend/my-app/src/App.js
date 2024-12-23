import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import ResponsiveAppBar from './components/navbar/ResponsiveAppBar';
import Home from "./Home";
import Authenticate from "./components/Register/Authenticate";
import Registration from "./components/Register/Registration";


function App() {
    return (
            <Router>
                <ResponsiveAppBar/>
                <Routes>
                    <Route path='/' element={<Home/>}/>
                    <Route path='/authenticate' element={<Authenticate/>}/>
                    <Route path='/registration' element={<Registration/>}/>
                </Routes>
            </Router>
    );
}

export default App;