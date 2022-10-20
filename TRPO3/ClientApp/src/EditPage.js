import React, {useState} from "react";
import "./App.css";

import {BrowserRouter as Router, Route, Link} from 'react-router-dom';

function EditPage () {

    const [myEditing, setEditing] = useState("default")
    const [show_button, setButton] = useState(false)

    const handleChange = (event) => {
        setEditing(event.target.value)
        setButton(true)
    }

    return (
        <div className = "App">
            <h1> Это страница для редактирования и добавления данных </h1>
        {

         myEditing != "default" ?
            <Link to="/Main"><button className = "Start"> Подтвердить </button></Link>
            :
            <Link to="/"><button className = "Exit"> Главное меню </button></Link>

    }
        </div>

    );

}

export default EditPage;