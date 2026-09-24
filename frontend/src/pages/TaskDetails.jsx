import { useParams } from 'react-router-dom';

function TaskDetails() {
    const { id } = useParams();
    return <h1>Task Details for {id}</h1>;
}

export default TaskDetails;