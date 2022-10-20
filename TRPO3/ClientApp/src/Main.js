import React, {useState} from "react";
import "./App.css";
import Start from "./components/Buttons/start";
import Exit from "./components/Buttons/exit";
import Student from "./components/Buttons/student";
import Teacher from "./components/Buttons/teacher";
import Links from "./components/links";

import StudentPage from "./StudentPage";
import TeacherPage from "./TeacherPage";

import Choose from "./components/choose";

import "./components/Buttons/button.css"

import {useNavigate, BrowserRouter, Routes, Route, Link, Outlet} from 'react-router-dom';


function Main() {
    const [visibility, setVisibility] = useState(false)

    function Show()
    {
        setVisibility(!visibility);
    }


    return (
        <div className = "App"
        >
        {
            visibility ?
        <div>
            <Link to="/StudentPage"> <button className = "Student"> По группам </button></Link>
            <Link to="/TeacherPage"> <button className = "Teacher"> По преподавателям </button></Link>
            <Link to="/EditPage"> <button className = "Editing"></button></Link>
            <Link to="/"><button className = "Exit" onClick = {Show}> Назад </button></Link>
            <Outlet/>
        </div>
        :null
     }

    {
        visibility? null:
    <div>
    <button className = "Start" onClick = {Show}> Открыть расписание </button>
    <Exit/>
    </div>
    }


</div>
);
}

export default Main;
