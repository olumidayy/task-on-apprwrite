import axios from "axios";
import { useState, useEffect } from "react";
import ValidateCreateTask from "../../../Components/Pages/Create/CreateTask/ValidateCreateTask";
import CreateTaskContext from "./CreateTaskContext";

const CreateTaskContextProvider = (props) => {
    const token = localStorage.getItem('myToken')
    const categories_api = 'https://task-on-production.up.railway.app/api/categories'
    const createTask_api = 'https://task-on-production.up.railway.app/api/tasks'
    
    const [open, setOpen] = useState(false)
    const [categories, setCategories] = useState([])
    const [myCategory, setMyCategory] = useState('')
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        deadline: '',
    })
    const [createTaskErrors, setCreateTaskErrors] = useState({})
    useEffect(()=>{
        axios.get(categories_api, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(res=>{
            if(res.status === 200){
                setCategories(res.data.data)
            }
        })
        .catch(error=>{
            if(error.response.status === 400){
                return
            }
        })
    },[open, token])
    const handleChange = (e) => {
        const {name, value} = e.target
        setFormData(prev=>{
            return(
                {...prev, [name]:value}
            )
        })
    }
    const handleMyCategory = (value) => {
        setMyCategory(value)
        handleOpen()
    }
    const handleOpen = () => {
        setOpen(!open)
    }
    const handleSubmit = async () => {
        let success = {}
        let createData = {}
        if(myCategory === ""){
            createData = {
                title:formData.title,
                description:formData.description,
                deadline:formData.deadline,
            }
        }
        else{
            createData = {
                title:formData.title,
                description:formData.description,
                deadline:formData.deadline,
                category: myCategory
            }
        }        
        const formErrors = ValidateCreateTask(createData)
        setCreateTaskErrors(formErrors)
        if(formErrors.all === ""){
            await axios.post(createTask_api, {...createData},{
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            .then(res=>{
                if(res.status === 200){
                    setFormData({
                        title: '',
                        description: '',
                        deadline: '',
                    })
                    setMyCategory('')
                    setOpen(false)
                    success.createSuccess = true
                }
                else{
                    alert('SOMETHING WENT WRONG!')
                    localStorage.clear()
                }
            })
            .catch(error=>{
                return
            })
        }
        return success
    }
    const updatedContext = {
        formData: formData,
        createTaskErrors: createTaskErrors,
        categories: categories,
        myCategory: myCategory,
        open: open,
        handleSubmit: handleSubmit,
        handleChange: handleChange,
        handleOpen: handleOpen,
        handleMyCategory:handleMyCategory
    }
    return (
        <CreateTaskContext.Provider value={updatedContext}>
            {props.children}
        </CreateTaskContext.Provider>
    );
}
 
export default CreateTaskContextProvider;