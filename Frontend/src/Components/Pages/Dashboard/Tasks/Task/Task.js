import './Task.css'
import { Link } from 'react-router-dom';
const Task = (props) => {
    return ( 
        <li className='task'>
            <h3>{props.task.title}</h3>
            <em className='myDescription'>{props.task.description}</em>
            <p className='myDeadline'>Deadline: <span><em>{props.task.deadline.substr(0,10)}</em></span></p>
            <button className='animated bounce'><Link to={`/tasks/${props.task.$id}`}>Update Task</Link></button>
            <em className={props.task.status === 'PENDING' ? 'myStatus pending' : 'myStatus done'}>{props.task.status === 'PENDING'? 'PENDING': 'COMPLETED'}</em>
        </li>
    );
}

export default Task;