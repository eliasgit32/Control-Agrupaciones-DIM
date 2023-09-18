import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
//Hojas de estilo
import './App.css';
//"Paginas"
import Login from './pages/Login';
import HomePage from './pages/HomePage';
import Group from './pages/Group';
import Activity from './pages/Activity';
import Participant from './pages/Participant';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/homepage' element={<HomePage />} />
        <Route path='/group/:id/' element={<Group />}></Route>
        <Route path='/group/:id/:idAct' element={<Activity />}></Route>
        <Route path='/participant/:cedula' element={<Participant />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
