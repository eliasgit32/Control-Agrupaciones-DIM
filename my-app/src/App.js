import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
//Hojas de estilo
import './App.css';
//"Paginas"
import Login from './pages/Login';
import HomePage from './pages/HomePage';
import Group from './pages/Group';
import Activity from './pages/Activity';
import Participant from './pages/Participant';
import RegParticipant from './pages/RegParticipant';
import ChartsReport from './pages/ChartsReport';
import Communities from './pages/Communities';
import AcademicTerms from './pages/AcademicTerms';
import ParticipationReport from './pages/ParticipationReport';
import RegistrationReport from './pages/RegistrationReport';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/homepage' element={<HomePage />} />
        <Route path='/group/:id/:selectedTerm' element={<Group />}></Route>
        <Route path='/group/:id/:idAct/:selectedTerm' element={<Activity />}></Route>
        <Route path='/participant/:cedula' element={<Participant />}></Route>
        <Route path='/RegParticipant/:type' element={<RegParticipant />}></Route>
        <Route path='/ChartsReport' element={<ChartsReport />}></Route>
        <Route path='/Communities' element={<Communities />}></Route>
        <Route path='/AcademicTerms' element={<AcademicTerms />}></Route>
        <Route path='/ParticipationReport/:groupID' element={<ParticipationReport />}></Route>
        <Route path='/RegistrationReport' element={<RegistrationReport />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
