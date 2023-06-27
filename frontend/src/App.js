import { Link } from 'react-router-dom';
import './App.css';
import  Payroll from './components/main/payroll/payroll'

function App() {
  return (
    <div className="payroll">
    <Payroll/>
    <Link to={"/letters/"}><button >Go to letters</button></Link>
    
    </div>
  );
}

export default App;
