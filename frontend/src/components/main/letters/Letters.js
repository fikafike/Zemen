import AppreciationLetter from "./main/AppreciationLetter"
import WordDocumentCreator from "./main/WordDocumentCreator"
import TabbedInterface from "./main/TabPages"
import Payroll from "../payroll/payroll"
import App from "../../../App"
import { Link } from 'react-router-dom';
const Letter=()=>{
    return(

        <div className="container-sm mx-auto">
    
            <TabbedInterface/>
            <Link to={"/"}><button className='btn btn-secondary btn-sm mt-3'  >Go to Payroll</button></Link>
        </div>
         )
        
}
export default Letter