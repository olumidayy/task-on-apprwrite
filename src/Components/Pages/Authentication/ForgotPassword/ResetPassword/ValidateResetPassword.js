const ValidateResetPassword = (entry) => {
    let errors = {}
    const regexPassword = /^[a-zA-Z0-9]{3,30}$/
    if(entry.password === ""){
        errors.password = "Password cannot be empty"
    }
    if(entry.confirmPassword !== entry.password){
        errors.confirmPassword = "Passwords do not match"
    }
    if(!regexPassword.test(entry.password)){
        errors.password = "Invalid Password"
        alert("Sorry, Password  must be between 3 and 30 characters and should not contain special characters")
    }
    if(Object.values(entry).every(input=>{
        return input!== ""
    }) && (regexPassword.test(entry.password))){
        errors.all  = ""
    }
    return errors;
}
 
export default ValidateResetPassword;