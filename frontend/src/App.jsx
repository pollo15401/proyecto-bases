import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Asignaturas from './components/Asignaturas';
import Asistencias from './components/Asistencias';
import Docentes from './components/Docentes';
import Estudiantes from './components/Estudiantes';
import Evaluaciones from './components/Evaluaciones';
import Grupos from './components/Grupos';

const Home = () => {
  return (
    <div>
      <h1>Home</h1>
      <Link to="/login">Login</Link> | <Link to="/register">Register</Link>
    </div>
  );
};

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/asignaturas">Asignaturas</Link>
            </li>
            <li>
              <Link to="/asistencias">Asistencias</Link>
            </li>
            <li>
              <Link to="/docentes">Docentes</Link>
            </li>
            <li>
              <Link to="/estudiantes">Estudiantes</Link>
            </li>
            <li>
              <Link to="/evaluaciones">Evaluaciones</Link>
            </li>
            <li>
              <Link to="/grupos">Grupos</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/asignaturas" element={<Asignaturas />} />
          <Route path="/asistencias" element={<Asistencias />} />
          <Route path="/docentes" element={<Docentes />} />
          <Route path="/estudiantes" element={<Estudiantes />} />
          <Route path="/evaluaciones" element={<Evaluaciones />} />
          <Route path="/grupos" element={<Grupos />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
