import React, {useState} from "react";
import "./App.css";
import Start from "./components/Buttons/start";
import Exit from "./components/Buttons/exit";
import Student from "./components/Buttons/student";
import Teacher from "./components/Buttons/teacher";
import "./components/Buttons/button.css"
import "./components/text.css"

import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import Schedule from "./Schedule";

function StudentPage() {

    const[groups, SetGroups] = useState ([
        {id: 0, group: "Номер группы"},
        {id: 1, group: "М3О-307Б-20"},
        {id: 2, group: "М3О-309Б-20"},
        {id: 3, group: "М3О-310Б-20"}
    ])

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

        <select className = "Select" value={myGroup} onChange={handleChange}>
            {groups.map(groups =>
                <option key = {groups.id} value = {groups.group}>{groups.group}</option>)}
            </select>
        </form>

         {
            myGroup != "Номер группы" ?
            <Link to="/Schedule" state = {{from: "StudentPage", group:myGroup, fio: "default"}}><button className = "Schedule"> Посмотреть </button></Link>
            :
            <Link to="/"><button className = "Exit"> Главное меню </button></Link>
        }
        </div>

);
}

export default StudentPage;
