import React from "react";

const ResetPasswordContext = React.createContext({
    visible: false,
    confirmIsVisible: false,
    formData: {},
    resetPasswordErrors: {},
    handleVisibility: ()=>{},
    handleConfirmVisibility: ()=>{},
    handleChange: ()=>{},
    handleSubmit: ()=>{}
})
 
export default ResetPasswordContext;