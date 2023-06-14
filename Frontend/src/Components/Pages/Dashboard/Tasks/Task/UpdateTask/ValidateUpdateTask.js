const ValidateUpdateTask = (formData) => {
    let errors = {}
    if(Object.values(formData).every(inputField=>{
        return (
            inputField !== ""
        )
    })){
        errors.all = "" 
    }
    if(formData.title === ""){
        errors.title = "Title cannot be empty"
    } 
    if(formData.description === ""){
        errors.description = "Description cannot be empty"
    } 
    if(formData.deadline === ""){
        errors.deadline = "Deadline cannot be empty"
    }
    return errors;
}
 
export default ValidateUpdateTask;