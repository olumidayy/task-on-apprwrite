const ValidateLogin = (formData) =>{
    let errors = {}
    if(formData.email === ""){
        errors.email = 'Email cannot be empty'
    }
    if(formData.password === ""){
        errors.password = 'Password cannot be empty'
    }
    if(Object.values(formData).every(entry=>{
        return entry !== ""
    })){
        errors.all = ""
    }
    return errors
}
export default ValidateLogin;