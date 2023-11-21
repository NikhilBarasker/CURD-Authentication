import './App.css';
import NavBar from './Components/NavBar';
import Home from './Components/Home';
import DeshBord from './Components/DeshBord';
import Registration from './Components/Registration';
import AboutUs from './Components/AboutUs';
import Login from './Components/Login';
import Edit from './Components/Edit';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/reg' element={<Registration />} />
          <Route path='/log' element={<Login />} />
          <Route path='/edit/:id' element={<Edit />} />
          <Route path='/desh' element={<DeshBord />} />
          <Route path='/about' element={<AboutUs />} />
        </Routes>
      </BrowserRouter> 
    </div>
  );
}

export default App;
