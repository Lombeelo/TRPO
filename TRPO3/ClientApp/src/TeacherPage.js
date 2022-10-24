import React, {useState} from "react";
import "./App.css";


import "./components/Buttons/button.css"
import "./components/text.css"

import {BrowserRouter as Router, Link, Route} from 'react-router-dom';


function TeacherPage() {

    const [teacher_fios, setTeacher_fios] = useState ([
        {id: 0, fio: "ФИО"},
        {id: 1, fio: "Вестяк Анатолий Васильевич"},
        {id: 2, fio: "Вестяк Владимир Анатольевич"}

    ])

    const [myName, setMyName] = useState("ФИО")
    const [show_button, setButton] = useState(false)

    const handleChange = (event) => {
        setMyName(event.target.value)
        setButton(true)
    }


        return (
            <div className = "App">

            <h1 className = "who"> Выберите ФИО преподавателя </h1>
        <form>

             <select className = "Select" value={myName} onChange={handleChange}>
                {teacher_fios.map(fios =>
                        <option key = {fios.id} value = {fios.fio}>{fios.fio}</option>)}
            </select>

        </form>
        {
            myName != "ФИО" ?
        <Link to="/Schedule" state = {{from: "StudentPage", group: "default", fio:myName}}><button className = "Schedule"> Посмотреть </button></Link>
        :
        <Link to="/"><button className = "Exit"> Главное меню </button></Link>
        }
    </div>

);
}

export default TeacherPage;