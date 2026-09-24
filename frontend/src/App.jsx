import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import ProjectsList from './pages/ProjectsList';
import ProjectDetails from './pages/ProjectDetails';
import TaskDetails from './pages/TaskDetails';
import NotFound from './pages/NotFound';

function App() {
    return (
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route path="/" element={<ProjectsList />} />
                <Route path="/projects/:id" element={<ProjectDetails />} />
                <Route path="/tasks/:id" element={<TaskDetails />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;