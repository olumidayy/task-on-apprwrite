const ValidateSignUp = (formData) => {
    const regexEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    const regexPassword = /^[a-zA-Z0-9]{3,30}$/
    let errors = {}
    if(formData.firstname === ""){
        errors.firstname = 'Firstname cannot be empty'
    }
    if(formData.lastname === ""){
        errors.lastname = 'Lastname cannot be empty'
    }
    if(formData.email === ""){
        errors.email = 'Email cannot be empty'
    }
    else if(!regexEmail.test(formData.email)){
        errors.email = 'Enter a valid email'
    }
    if(formData.password === ""){
        errors.password = 'Password cannot be empty'
    }
    else if(!regexPassword.test(formData.password)){
        errors.password = "Invalid Password"
        alert("Sorry, Password  must be between 3 and 30 characters and should not contain special characters")
    }
    if(Object.values(formData).every(inputField=>{
        return inputField !== ""
    }) && regexEmail.test(formData.email) && regexPassword.test(formData.password)){
        errors.all = ""
    }
    return errors;
}
 
export default ValidateSignUp;