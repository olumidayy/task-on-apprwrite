import React from "react";

const CreateTaskContext = React.createContext({
    formData: {},
    createTaskErrors: {},
    categories: [],
    open: false,
    myCategory: '',
    handleSubmit: ()=>{},
    handleChange: ()=>{},
    handleOpen: ()=>{},
    handleMyCategory: ()=>{}
})
export default CreateTaskContext;