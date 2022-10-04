import logo from './logo.svg';
import './App.css';
import { Contents } from './components/Contents';
import { Navbar } from './components/Navbar';
import { Route, Switch } from 'react-router-dom';


export  function App() {
  return (
   <div>
     <Navbar/>
     <Contents/>
     
     </div>
   
  );
}

export default App;
