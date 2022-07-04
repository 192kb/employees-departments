import React from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import './App.css';
import { Departments } from './Departments';
import { Employees } from './Employees';
import { Paths } from './Path';
import 'bootstrap/dist/css/bootstrap.min.css';
import { NewDepartment } from './NewDepartment';

function App() {
  return (
    <div className='App'>
      <aside>
        <h3>Entities</h3>
        <ul>
          <li>
            <Link to={Paths.Departments}>Departments</Link>
          </li>
          <li>
            <Link to={Paths.Employees}>Employees</Link>
          </li>
        </ul>
      </aside>
      <main>
        <Routes>
          <Route path={Paths.Departments} element={<Departments />} />
          <Route path={Paths.Employees} element={<Employees />} />
          <Route path={Paths.NewDepartments} element={<NewDepartment />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
