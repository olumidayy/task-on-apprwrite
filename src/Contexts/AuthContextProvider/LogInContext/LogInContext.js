import React from "react";
const LogInContext = React.createContext({
    visible: false,
    formData: {},
    formErrors: {},
    handleChange: ()=>{},
    handleVisibility: ()=>{},
    handleSubmit: ()=>{}
})
export default LogInContext