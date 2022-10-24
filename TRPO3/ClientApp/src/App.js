import React, {useState} from "react";
import "./App.css";
import Main from "./Main";

import "./components/Buttons/button.css"

import {useNavigate, BrowserRouter, Routes, Route, Link} from 'react-router-dom';
import StudentPage from "./StudentPage";
import TeacherPage from "./TeacherPage";
import Schedule from "./Schedule";
import AddingPage from "./AddingPage";


function App() {
  const [visibility, setVisibility] = useState(false)

    function Show()
    {
        setVisibility(!visibility);
    }


  return (
      <div className = "App"
      >

      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Main/>}/>
          <Route exact path="/StudentPage" element={<StudentPage/>}/>
          <Route exact path="/TeacherPage" element={<TeacherPage/>}/>
          <Route exact path="/Schedule" element ={<Schedule/>}/>
          <Route exact path="/AddingPage" element ={<AddingPage/>}/>
        </Routes>
      </BrowserRouter>
      </div>
  );
}

export default App;
