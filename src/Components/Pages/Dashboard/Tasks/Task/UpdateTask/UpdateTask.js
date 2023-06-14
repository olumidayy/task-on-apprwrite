import axios from 'axios';
import { useState } from 'react';
import { useContext, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import UpdateTaskContext from '../../../../../../Contexts/UpdateTaskContextProvider/UpdateTaskContext';
import Header from '../../../../../Header/Header';
import './UpdateTask.css'
import ValidateUpdateTask from './ValidateUpdateTask';
import DeleteModal from './DeleteModal/DeleteModal';
import React from 'react'
const UpdateTask = () => {
    const token = localStorage.getItem('myToken')
    const ctx = useContext(UpdateTaskContext)
    const navigate = useNavigate()
    const [updateTaskErrors, setUpdateTaskErrors] = useState({})
    const [readyToDelete, setReadyToDelete] = useState(false)
    const {id} = useParams()
    useEffect(()=>{
        ctx.getTask(id)
    },[])
    const handleSubmit = async (e) => {
        e.preventDefault()
        const updateData = {
            title:ctx.formData.title,
            description:ctx.formData.description,
            deadline:ctx.formData.deadline,
            status: ctx.status
        }
        const formErrors = ValidateUpdateTask(ctx.formData)
        setUpdateTaskErrors(formErrors)
        if(formErrors.all === ""){
            await axios.patch((ctx.update_api + id), {...updateData},{
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            .then(res=>{
                if(res.status === 200){
                    navigate('/dashboard')
                }
                else{
                    alert('SOMETHING WENT WRONG!')
                    localStorage.clear()
                    navigate('/login')
                }
            })
            .catch(error=>{
                return;
            })
        }
    }
    const handleDeleteModal = () => {
        setReadyToDelete(!readyToDelete)
    }
    const handleDelete = () => {
        ctx.deleteTask(id).then(res=>{
            if(res.deleteSuccess){
                navigate('/dashboard')
            }
        })
    }
    return ( 
        <React.Fragment>
            <section className='updateTask'>
                <Header/>
                <div className="card updateCard">
                    <div className="background update-bg"></div>
                    <div className="formBlock">
                        <div className="div">
                            <div className="updateForm">
                                <h2>Update Task</h2>
                                <form className='myForm update' onSubmit={handleSubmit}>
                                    <div className="formElement">
                                        <label htmlFor="title">
                                            Title
                                            <small>{updateTaskErrors.title}</small>
                                        </label>
                                        <input type="text" className={updateTaskErrors.title ? 'error': ''} name='title' onChange={ctx.handleChange} value={ctx.formData.title}/>
                                    </div>
                                    <div className="formElement">
                                        <label htmlFor="description">
                                            Description
                                            <small>{updateTaskErrors.description}</small>
                                        </label>
                                        <textarea name="description" className={updateTaskErrors.description ? 'error': ''} id="" cols="30" rows="10" onChange={ctx.handleChange} value={ctx.formData.description}></textarea>
                                    </div>
                                    <div className="formElement">
                                        <label htmlFor="date">
                                            Deadline
                                            <small>{updateTaskErrors.deadline}</small>
                                        </label>
                                        <input type="date" name='deadline' className={updateTaskErrors.deadline ? 'error': ''} onChange={ctx.handleChange} value={ctx.formData.deadline} />
                                    </div>
                                    <div className="formActions">
                                        <div className="updateActions">
                                            <button className='animated bounce' type='submit'>Update</button>
                                            <button className='updateTaskBtn animated bounce' onClick={ctx.handleStatus} type='button'>Mark as Completed</button>    
                                        </div>  
                                        <button onClick={handleDeleteModal} className='removeBtn animated bounce' type='button'>Delete</button>
                                        {readyToDelete && <DeleteModal
                                            name={'Task'}
                                            onClick={handleDeleteModal}
                                            handleDelete={handleDelete}
                                        />}
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </React.Fragment>
    );
}
export default UpdateTask;