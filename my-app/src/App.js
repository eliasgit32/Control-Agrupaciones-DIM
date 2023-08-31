import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
//"Paginas"
import Login from './pages/Login';
import HomePage from './pages/HomePage';
//Hojas de estilo
import './App.css';


function App() {
  return (
    <Router>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/homepage' element={<HomePage />} />
      </Routes>
    </Router>
    
  );
}

export default App;
