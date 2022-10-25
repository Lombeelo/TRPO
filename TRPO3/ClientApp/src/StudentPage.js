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
import {callApiGet, callApiPost} from "./requests.js";

function StudentPage() {

    const [loading, setLoading] = useState(false);

    const loadingOption = {id: 0, group: "Загрузка данных"};

    const[groups, setGroups] = useState ([
        {id: 0, name: "Номер группы"}
    ])

    const [myGroup, setMyGroup] = useState(null)
    const [show_button, setButton] = useState(false)

    const handleChange = (event) => {
        setMyGroup(event.target.value)
        setButton(true)
    }

    const handleClick = (event) => {
        if (myGroup == null) {
            setLoading(true);
            callApiGet("GetAllGroups",{}, (resp)=>{
            setLoading(false)
            setGroups(resp.data)
        })
    }
        else return;   
        
    }

    return (
        <div className = "App">

        <h1 className = "who"> Выберите номер группы </h1>
        <form>

        <select className = "Select" value={myGroup} onClick = {handleClick} onChange={handleChange}>
            
            {   loading?
                <option key = {loadingOption.id} value = {loadingOption.group}>
                    {loadingOption.group}
                </option>
            :
                groups.map(groups =>
                <option key = {groups.id} value = {groups.name}>{groups.name}</option>)
            }
            </select>
        </form>

         {
            myGroup != "Номер группы" ?
            <Link to="/Schedule" state = {{from: "StudentPage", group:groups.name, fio: "default"}}><button className = "Schedule"> Посмотреть </button></Link>
            :
            <Link to="/"><button className = "Exit"> Главное меню </button></Link>
        }
        </div>

);
}

export default StudentPage;
