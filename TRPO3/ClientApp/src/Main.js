import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import "./App.css";
import Exit from "./components/Buttons/exit";
import "./components/Buttons/button.css"
import { Link } from 'react-router-dom';


function Main() {
    const [visibility, setVisibility] = useState(false)

    const location = useLocation();
    const [locationState, setLocationState] = React.useState({ from: '', update: false })

    React.useState(() => {
        if (location.state) {
            setLocationState(location.state)
        }
    })

    function refreshPage() {
        window.location.reload();
        setLocationState({ update: false });

    }

    function Show() {
        setVisibility(!visibility);
    }


    return (
        <div className="App"
        >

            {
                locationState.update == true ?
                    refreshPage
                    :
                    null
            }
            {
                visibility ?
                    <div>
                        <Link to="/StudentPage"> <button className="Student"> По группам </button></Link>
                        <Link to="/TeacherPage"> <button className="Teacher"> По преподавателям </button></Link>
                        <Link to="/AddingPage"> <button className="Editing"></button></Link>
                        <Link to="/"><button className="Exit" onClick={Show}> Назад </button></Link>
                    </div>
                    : null
            }

            {
                visibility ? null :
                    <div>
                        <button className="Start" onClick={Show}> Открыть расписание </button>
                        <Exit />
                    </div>
            }


        </div>
    );
}

export default Main;
