const ValidateCreateCategory = (entry) => {
    let errors = {}
    if(entry.name === ""){
        errors.name = "Name cannot be empty"
    }
    else{
        errors.all = ""
    }
    return errors;
}
 
export default ValidateCreateCategory;