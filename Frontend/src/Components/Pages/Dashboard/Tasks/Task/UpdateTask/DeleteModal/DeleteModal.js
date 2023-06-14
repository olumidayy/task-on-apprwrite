import React from "react";
import  ReactDOM  from "react-dom";
import './DeleteModal.css'
const Backdrop = (props) => {
    return ( 
        <div onClick={props.onClick} className="backdrop"></div>
    );
}
const DeleteModalBlock = (props) =>{
    return(
        <div className="deleteModal">
            <h3>Are you sure you want to delete this {props.name}?</h3>
            <div className="deleteActions">
                <button onClick={props.onClick} className="cancelBtn animated bounce" type="button">CANCEL</button>
                <button onClick={props.handleDelete} className="deleteBtn animated bounce" type="button">YES</button>
            </div>
        </div>
    )
}
const DeleteModal = (props) =>{
    return(
        <React.Fragment>
            {ReactDOM.createPortal(<Backdrop onClick={props.onClick}/>,document.getElementById('deleteBackdrop_root'))}
            {ReactDOM.createPortal(<DeleteModalBlock
                name={props.name}
                onClick={props.onClick}
                handleDelete={props.handleDelete}
            />, document.getElementById('deleteOverlay_root'))}
        </React.Fragment>
    )
}
export default DeleteModal;