import axios from "axios";
import React from "react";
import { useState } from "react";
import ValidateSignUp from "../../../Components/Pages/Authentication/SignUp/ValidateSignUp";
import SignUpContext from "./SignUpContext";
const SignUpContextProvider = (props) => {
    const register_api = 'https://task-on-production.up.railway.app/api/auth/register'
    const otp_api = 'https://task-on-production.up.railway.app/api/auth/send-otp'
    const [formData, setFormData] = useState({
        firstname: "",
        lastname: "",
        email: "",
        password: ""
    })
    const [visible, setVisible] = useState(false)
    const handleVisibility = () => {
        setVisible(!visible)
    }
    const [signUpErrors, setSignUpErrors] = useState({})
    const handleChange = (e) => {
        const {name, value} = e.target
        setFormData(prev=>{
            return(
                {...prev, [name]:value}
            )
        })
    }
    const handleSubmit = async () => {
        let successes = {}
        const SignUpDetails = {
            firstname: formData.firstname,
            lastname: formData.lastname,
            email: formData.email,
            password: formData.password
        }
        const formErrors = ValidateSignUp(SignUpDetails)
        setSignUpErrors(formErrors)
        const {email} = SignUpDetails
        if(formErrors.all === ""){
            successes.formSuccess = true
            await axios.post(register_api, {...SignUpDetails})
            .then(async(res)=>{
                if(res.status === 201){
                    await axios.post(otp_api, {email})
                    .then(res=>{
                        if(res.status === 200){
                            successes.signUpSuccess = true
                        }
                    })
                    .catch(err=>{
                        return
                    })
                }
                else{
                    successes.signUpSuccess = false
                }
            })
            .catch(error=>{
                if(error.code === "ERR_NETWORK"){
                    successes.signUpSuccess = null
                }
            })
        }
        else{
            successes.formSuccess = false
            successes.signUpSuccess = null
        }
        return successes
    }
    const updatedContext = {
        visible: visible,
        formData:formData,
        formErrors:signUpErrors,
        handleVisibility: handleVisibility,
        handleChange: handleChange,
        handleSubmit:handleSubmit,
    }
    return (
        <SignUpContext.Provider value={updatedContext}>
            {props.children}
        </SignUpContext.Provider>
    );
}
 
export default SignUpContextProvider;