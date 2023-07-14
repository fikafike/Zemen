import { Link } from 'react-router-dom';
import './App.css';
import  Payroll from './components/main/payroll/payroll'

function App() {
  return (
    <div className="container-sm mx-auto">
   
    <Payroll/>
    <Link to={"/letters/"}><button className='btn btn-secondary btn-sm mt-3'  >Go to letters</button></Link>
    
    </div>
  );
}

export default App;
