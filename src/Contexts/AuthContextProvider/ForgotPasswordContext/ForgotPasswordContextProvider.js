import axios from "axios";
import { useState } from "react";
import ValidateForgotPassword from "../../../Components/Pages/Authentication/ForgotPassword/ValidateForgotPassword";
import ForgotPasswordContext from "./ForgotPasswordContext";

const ForgotPasswordContextProvider = (props) => {
    const otp_api = 'https://task-on-production.up.railway.app/api/auth/send-otp'
    const [formData, setFormData] = useState({
        email: ''
    })
    const [forgotPasswordErrors, setForgotPasswordErrors] = useState({})
    const handleChange = (e) => {
        const {name, value} = e.target
        setFormData((prev)=>{
            return(
                {...prev, [name]:value}
            )
        })
    }
    const handleSubmit = async () => {
        let successes = {}
        const forgotData = {
            email:formData.email
        }
        const formErrors = ValidateForgotPassword(forgotData)
        setForgotPasswordErrors(formErrors)
        if(formErrors.all === ""){
            await axios.post(otp_api, {...forgotData})
            .then(res=>{
                if(res.status === 200){
                    successes.forgotSuccess = true
                }
            })
            .catch(error=>{
                if(error.code === "ERR_NETWORK"){
                    successes.forgotSuccess = null
                }
            })
        }
        return successes
    }
    const updatedContext = {
        formData: formData,
        forgotPasswordErrors: forgotPasswordErrors,
        handleChange: handleChange,
        handleSubmit: handleSubmit
    }
    return ( 
        <ForgotPasswordContext.Provider value={updatedContext}>
            {props.children}
        </ForgotPasswordContext.Provider>
    );
}

export default ForgotPasswordContextProvider;