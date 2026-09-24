import { useParams } from 'react-router-dom';

function ProjectDetails() {
    const { id } = useParams();
    return <h1>Project Details for {id}</h1>;
}

export default ProjectDetails;