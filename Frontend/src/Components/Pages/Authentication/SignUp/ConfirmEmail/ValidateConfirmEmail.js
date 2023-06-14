const ValidateConfirmEmail = (entry) => {
    let errors = {}
    if(entry === "" || entry.length < 6){
        errors.otp = "OTP must be 6 digits"
    }
    else{
        errors.all = ""
    }
    return errors;
}
 
export default ValidateConfirmEmail;