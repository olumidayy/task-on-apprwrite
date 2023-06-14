import React from "react";
const UpdateTaskContext  = React.createContext({
    formData: {},
    update_api: '',
    status: 'PENDING',
    handleStatus: ()=>{},
    getTask: ()=>{},
    handleChange: ()=>{},
    handlePendingStatus: ()=>{},
    deleteTask: ()=>{},
})
export default UpdateTaskContext