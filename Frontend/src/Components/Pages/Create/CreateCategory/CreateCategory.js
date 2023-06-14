import { useContext } from 'react';
import CreateCategoryContext from '../../../../Contexts/CreateCategoryContext/CreateCategoryContext';
import './CreateCategory.css'
import CreateCategoryModal from './CreateCategoryModal/CreateCategoryModal';
const CreateCategory = () => {
    const ctx = useContext(CreateCategoryContext)
    return (  
        <div className="createCategory">
            <button type='button' className='new animated bounce' onClick={ctx.handleCreate}>New Category +</button>
            {ctx.ready && 
                <CreateCategoryModal
                    formData = {ctx.formData}
                    handleChange = {ctx.handleChange}
                    handleSubmit = {ctx.handleSubmit}
                    ready = {ctx.ready}
                    createCategoryErrors = {ctx.createCategoryErrors}
                    onClick = {ctx.handleCreate}    
                />
            }
            
        </div>
    );
}
 
export default CreateCategory;