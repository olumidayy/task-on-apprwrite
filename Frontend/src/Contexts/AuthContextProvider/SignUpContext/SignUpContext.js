import React from "react";
const SignUpContext = React.createContext({
    formData: {},
    formErrors: {},
    visible: false,
    handleVisibility:()=>{},
    handleChange: ()=>{},
    handleSubmit: ()=>{},
})
export default SignUpContext;