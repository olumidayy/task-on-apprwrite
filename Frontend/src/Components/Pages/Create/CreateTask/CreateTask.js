import { useContext } from 'react';
import CreateTaskContext from '../../../../Contexts/TaskContextProvider/CreateTaskContextProvider/CreateTaskContext';
import Header from '../../../Header/Header';
import CreateCategory from '../CreateCategory/CreateCategory';
import Categories from '../../Dashboard/Categories/Categories';
import './CreateTask.css'
import { useNavigate } from 'react-router-dom';
import React from 'react'
const CreateTask = () => {
    const navigate = useNavigate()
    const ctx = useContext(CreateTaskContext)
    const handleSubmit = () => {
        ctx.handleSubmit().then(res=>{
            if(res.createSuccess){
                navigate('/dashboard')
            }
        })
    }
    return ( 
        <React.Fragment>
            <div className='create'>
            <Header/>
                <div className="card createCard">
                    <div className="background create-bg"></div>
                    <div className="formBlock">
                        <div className="div">
                            <div className="createForm">
                                <h2>Create a Task</h2>
                                <form className='myForm'>
                                    <div className="formElement categoryFormBlock">
                                        <div className="myCategoryBlock">
                                            <CreateCategory/>
                                            <Categories 
                                                open = {ctx.open}
                                                handleOpen={ctx.handleOpen}
                                                myCategory = {ctx.myCategory}
                                                categories = {ctx.categories}
                                                handleMyCategory = {ctx.handleMyCategory}
                                            />
                                        </div>
                                        {<small>{ctx.createTaskErrors.category}</small>}
                                    </div>
                                    <div className="formElement">
                                        <label htmlFor="title">
                                            Title
                                            <small>{ctx.createTaskErrors.title}</small>
                                        </label>
                                        <input type="text"className={ctx.createTaskErrors.title?'error': ''} name='title' onChange={ctx.handleChange} value={ctx.formData.title}/>
                                    </div>
                                    <div className="formElement">
                                        <label htmlFor="description">
                                            Description
                                            <small>{ctx.createTaskErrors.description}</small>
                                        </label>
                                        <textarea name="description" className={ctx.createTaskErrors.description ? 'error': ''} id="" cols="30" rows="10" onChange={ctx.handleChange} value={ctx.formData.description}></textarea>
                                    </div>
                                    <div className="formElement">
                                        <label htmlFor="date">
                                            Deadline
                                            <small>{ctx.createTaskErrors.deadline}</small>
                                        </label>
                                        <input type="date" name='deadline' className={ctx.createTaskErrors.deadline ? 'error' : ''} onChange={ctx.handleChange} value={ctx.formData.deadline} />
                                    </div>
                                    <div className="formActions">
                                        <button type='button' onClick={handleSubmit}>Create</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
     );
}
 
export default CreateTask;