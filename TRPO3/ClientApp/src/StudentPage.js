import React, {useState} from "react";
import "./App.css";
import Start from "./components/start";
import Exit from "./components/exit";
import Student from "./components/student";
import Teacher from "./components/teacher";
import "./components/button.css"
import "./components/text.css"

import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import Schedule from "./Schedule";

function StudentPage() {

    const [myGroup, setMyGroup] = useState("Номер группы")
    const [show_button, setButton] = useState(false)

    const handleChange = (event) => {
        setMyGroup(event.target.value)
        setButton(true)
    }

    return (
        <div className = "App">

        <h1 className = "who"> Выберите номер группы </h1>
        <form>
        <select className = "Start" value={myGroup} onChange={handleChange}>
            <option value="М3О-307Б-20">М3О-307Б-20</option>
            <option value="М3О-309Б-20">М3О-309Б-20</option>
            <option value="М3О-310Б-20">М3О-310Б-20</option>
        </select>
        </form>
         {
            show_button ?
            <Link to="/Schedule"><button className = "Schedule"> Посмотреть </button></Link>
            :
            <Link to="/"><button className = "Exit"> Главное меню </button></Link>
        }
        </div>

);
}

export default StudentPage;
