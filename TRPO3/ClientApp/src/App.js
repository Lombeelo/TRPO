import React, {useState} from "react";
import "./App.css";
import Main from "./Main";

import "./components/Buttons/button.css"

import {useNavigate, BrowserRouter, Routes, Route, Link} from 'react-router-dom';
import StudentPage from "./StudentPage";
import TeacherPage from "./TeacherPage";
import Schedule from "./Schedule";
import EditPage from "./EditPage";


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
          <Route index element={<Main/>}/>
          <Route exact path="/StudentPage" element={<StudentPage/>}/>
          <Route exact path="/TeacherPage" element={<TeacherPage/>}/>
          <Route exact path="/Schedule" element ={<Schedule/>}/>
          <Route exact path="/EditPage" element ={<EditPage/>}/>
        </Routes>
      </BrowserRouter>
      </div>
  );
}

export default App;
