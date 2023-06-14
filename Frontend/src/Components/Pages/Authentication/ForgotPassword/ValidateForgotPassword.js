const ValidateForgotPassword = (entry) => {
    const regexEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    let errors = {}
    if(entry.email === ""){
        errors.email = "Email cannot be empty"
    }
    if(!regexEmail.test(entry.email)){
        errors.email = "Please enter a valid email"
    }
    if(entry.email !== "" && regexEmail.test(entry.email)){
        errors.all = ""
    }
    return errors;
}
 
export default ValidateForgotPassword;