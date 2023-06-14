const ValidateProfile = (entry) => {
    let error = {}
    let allowedExtensions = /(\.jpg|\.jpeg|\.png)$/i
    if(!allowedExtensions.exec(entry)){
        alert('File type should only be .jpg, .jpeg or .png')
        error.fileError = "Invalid file type"
    }
    else{
        error.all = ""
    }
    return error;
}
 
export default ValidateProfile;