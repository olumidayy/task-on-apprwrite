import React from "react";
const ForgotPasswordContext = React.createContext({
    formData: {},
    forgotPasswordErrors: {},
    handleChange: ()=>{},
    handleSubmit: ()=>{}
})

export default ForgotPasswordContext