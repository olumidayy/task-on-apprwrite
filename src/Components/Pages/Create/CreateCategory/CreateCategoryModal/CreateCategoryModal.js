import React from "react";
import  ReactDOM  from "react-dom";
import './CreateCategoryModal.css'
const Backdrop = (props) => {
    return ( 
        <div onClick={props.onClick} className="backdrop"></div>
    );
}
const CreateCategoryBlock = (props) => {
    return(
        <div className="createCategoryModal">
            <div className='div mySection'>
                <form className='categoryForm'>
                    <div className="formElement">
                        <label htmlFor="name">
                            Category name:
                            <small>{props.createCategoryErrors.name}</small>
                        </label>
                        <input type="text" name="category" placeholder='Enter a name' onChange={props.handleChange} value={props.formData.category} />
                    </div>
                    <div className="formActions">
                        <button className="animated bounce" onClick={props.handleSubmit} type='button'>Create</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
const CreateCategoryModal = (props) => {
    return(
        <React.Fragment>
            {ReactDOM.createPortal(
                <Backdrop onClick={props.onClick}/>,document.getElementById('backdrop_root')
            )}
            {ReactDOM.createPortal(
                <CreateCategoryBlock 
                    formData = {props.formData}
                    ready = {props.ready}
                    handleChange={props.handleChange}
                    handleSubmit = {props.handleSubmit}
                    createCategoryErrors = {props.createCategoryErrors}
                />, document.getElementById('overlay_root')
            )}
        </React.Fragment>
    )
}
export default CreateCategoryModal;