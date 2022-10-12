import React, {useState} from "react";
import "./App.css";
import Start from "./components/start";
import Exit from "./components/exit";
import Student from "./components/student";
import Teacher from "./components/teacher";



import "./components/button.css"
import "./components/text.css"

import {BrowserRouter as Router, Link, Route} from 'react-router-dom';


function TeacherPage() {

    const [name, setName] = useState("")
    const [show_button, setButton] = useState(false)
    function next() {
        return(
            <Link to="/Schedule"> <button className = "Schedule"> Посмотреть </button></Link>
        )
    }

    const handleSubmit = (event) => {
        event.preventDefault();
       if (window.confirm("Ваше ФИО: {name}. Правильно?", {name})) {
           setButton(true);
       };

    }


        return (
            <div className = "App">
                <h1 className = "who1"> Введите своё ФИО </h1>
                <form onSubmit={handleSubmit}>
                <input className = "Form"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
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

export default TeacherPage;