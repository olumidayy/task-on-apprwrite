import React from "react";
const ConfirmForgotPasswordContext = React.createContext({
    otp: '',
    otpErrors: {},
    setOtp: ()=>{},
    handleSubmit: ()=>{}
})
export default ConfirmForgotPasswordContext