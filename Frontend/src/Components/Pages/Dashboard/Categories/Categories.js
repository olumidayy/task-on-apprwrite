import {FaChevronUp} from 'react-icons/fa'
import {FaChevronDown} from 'react-icons/fa'
import './Categories.css'
import Category from './Category/Category';
const Categories = (props) => {
    return (  
        <div className='categories'>
            <div className="selectCategories animated bounce" onClick={props.handleOpen}>
                <span >{props.myCategory === '' || props.categories.length === 0 ? 'Select Category' : props.myCategory}</span>
                {!props.open?
                    <FaChevronDown/>:<FaChevronUp/>
                }
            </div>
            {props.open &&<div  className='options'>
                <ul>
                    {props.categories.length > 0 && <li className='category'><em className='myDefaultCategory' onClick={()=>props.handleMyCategory('All')}>All Tasks</em></li>}
                    {props.isEmpty ? <h4>Loading...</h4> : props.categories.length === 0 ? <h4>Add <span>Categories</span>!</h4> :props.categories.map(category=>{
                        return(
                            <Category category ={category} key = {category.$id} controlOpen={props.handleOpen} handleMyCategory = {props.handleMyCategory}/>
                        )
                    })}
                </ul>
            </div>}
        </div>
    );
}
export default Categories;