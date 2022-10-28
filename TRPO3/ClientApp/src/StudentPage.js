import React, { useState } from "react";
import "./App.css";
import "./components/Buttons/button.css"
import "./components/text.css"

import { Link } from 'react-router-dom';
//--------------------------------------------------
import { callApiGet } from "./requests.js";
//--------------------------------------------------

function StudentPage() {

    const [loading, setLoading] = useState(false);

    const chooseOption = [{ id: 0, name: "Номер группы" }];

    const [groups, setGroups] = useState([
        { id: 0, name: "Номер группы" }
    ])

    const [groupId, setGroupId] = useState(0);


    const [myGroup, setMyGroup] = useState(null)
    const [show_button, setButton] = useState(false)

    const handleChange = (event) => {
        setMyGroup(event.target.value)
        setButton(true)
        setGroupId(event.target.options.selectedIndex)

    }

    const handleClick = (event) => {
        if (true) {
            setLoading(true);
            callApiGet("GetAllGroups", {}, (resp) => {
                setLoading(false)
                setGroups(chooseOption.concat(resp.data))
            })
        }
        else return;

    }

    return (
        <div className="App">
            <h1 className="who"> Выберите номер группы </h1>
            <form>
                <select className="Select" value={myGroup} onClick={handleClick} onChange={handleChange}>
                    {
                        groups.map(groups =>
                            <option disabled={loading} key={groups.id} value={groups.name}>{groups.name}</option>)
                    }
                </select>
            </form>
            {
                myGroup != "Номер группы" ?
                    <Link to="/Schedule" state={{ from: "StudentPage", group: groupId, fio: "default" }}><button className="Schedule"> Посмотреть </button></Link>
                    :
                    <Link to="/"><button className="Exit"> Главное меню </button></Link>
            }
        </div>
    );
}

export default StudentPage;
