import React from "react";
const CreateCategoryContext = React.createContext({
    formData: {},
    createCategoryErrors: {},
    ready: false,
    handleCreate: () => {},
    handleChange: ()=>{},
    handleSubmit: ()=>{}
})
export default CreateCategoryContext