import React, { useState } from "react";
import "./App.css";


import "./components/Buttons/button.css"
import "./components/text.css"

import { Link } from 'react-router-dom';

//--------------------------------------------------
import { callApiGet } from "./requests.js";
//--------------------------------------------------

function TeacherPage() {

    const [loading, setLoading] = useState(false);

    const chooseOption = [{ id: 0, fullName: "ФИО преподавателя" }];

    const [teacher_fios, setTeacher_fios] = useState([
        { id: 0, fullName: "ФИО преподавателя" },


    ])

    const [myName, setMyName] = useState(null)
    const [show_button, setButton] = useState(false)

    const [proffId, setProffId] = useState(null)

    const handleChange = (event) => {
        setMyName(event.target.value)
        setButton(true)
        setProffId(event.target.options.selectedIndex)
    }

    const handleClick = (event) => {
        if (true) {
            setLoading(true);
            callApiGet("GetAllProfessors", {}, (resp) => {
                setLoading(false)
                setTeacher_fios(chooseOption.concat(resp.data))

            })
        }
        else return;

    }


    return (
        <div className="App">

            <h1 className="who"> Выберите ФИО преподавателя </h1>
            <form>

                <select className="Select" value={myName} onClick={handleClick}
                    onChange={handleChange}>
                    {
                        teacher_fios.map(fios =>
                            <option disabled={loading} key={fios.id} value={fios.fullName}>{fios.fullName}</option>)}
                </select>

            </form>
            {
                show_button ?
                    <Link to="/Schedule" state={{ from: "TeacherPage", fio: proffId, group: "default" }}><button className="Schedule"> Посмотреть </button></Link>
                    :
                    <Link to="/"><button className="Exit"> Главное меню </button></Link>
            }
        </div>

    );
}

export default TeacherPage;