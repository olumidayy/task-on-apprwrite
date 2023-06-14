import { useState } from "react";
import ValidateConfirmEmail from "../../../../Components/Pages/Authentication/SignUp/ConfirmEmail/ValidateConfirmEmail";
import ConfirmForgotPasswordContext from "./ConfirmForgotPasswordContext";

const ConfirmForgotPasswordContextProvider = (props) => {
    const [otp, setOtp] = useState('')
    const [errors, setErrors] = useState({})
    const handleSubmit = async() => {
        let successes = {}
        const myOtp = otp
        const OTPErrors = ValidateConfirmEmail(myOtp)
        setErrors(OTPErrors)
        if(OTPErrors.all !== ""){
            successes.isValid = false
        }
        else{
            successes.isValid = true
        }
        return successes
    }    
    const updatedContext = {
        otp:otp,
        otpErrors: errors,
        setOtp: setOtp,
        handleSubmit: handleSubmit
    }
    return ( 
        <ConfirmForgotPasswordContext.Provider value={updatedContext}>
            {props.children}
        </ConfirmForgotPasswordContext.Provider>
    );
}

export default ConfirmForgotPasswordContextProvider;