import React, {useState} from "react";
import "./App.css";
import "../src/components/Editing/editing_styles.css";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

import {BrowserRouter as Router, Route, Link} from 'react-router-dom';

function EditPage () {

    const [myEditing, setEditing] = useState(false)
    const [datechange, setDateChange] = useState(false)

    //----------------------------------------------
    const [addSubj, setAddSubj] = useState ([
        {id: 0, value: "Предмет"},
        {id: 1, value: "Матан"}
    ])

    const [addSubjType, setAddSubjType] = useState ([
        {id: 0, value: "Тип занятия"},
        {id: 1, value: "Лекция"},
        {id: 2, value: "ПЗ"},
        {id: 3, value: "ЛР"}
    ])

    const [addPara, setAddPara] = useState ([
        {id: 0, value: "Номер пары"},
        {id: 1, value: "Первая"},
        {id: 2, value: "Вторая"}
    ])
    const [para, setPara] = useState(null)
    const handleChangePara = (event) => {
        setPara(event.target.value)
    }



    //-----------------------------------------------

    //КАЛЕНДАРЬ -------------------------------------
    const [date, setDate] = useState(new Date());

    const maximumDate = new Date ("July 01, 2023, 00:00:00");
    const minimumDate = new Date ("September 01, 2022, 00:00:00");


    const disableDates = new Date ('10/10/2022') ;
    const ocup_date = disableDates.getDate();
    //-----------------------------------------

    const DateChanging = (event) => {
        setEditing(true);
        setDateChange(true);
    }

    return (
        <div className = "App">
            <h1> Это страница для добавления пар </h1>

            <div className = "calendar">
                <Calendar lable = "Выберите день"
                    onChange={setDate, DateChanging}
                    value={date}
                    minDate = {minimumDate}
                    maxDate = {maximumDate}
                    tileDisabled={({date}) => date.getDate() ==ocup_date}/>
             </div>

            <div>
                <select disabled = {datechange? false: true} className = "para" value={para} onChange={handleChangePara}>
                        {addPara.map(addingPara =>
                    <option key = {addingPara.id} value = {addingPara.value}>{addingPara.value}</option>)}
                </select>


            </div>


        {

         myEditing == true ?
            <Link to="/Main"><button className = "Exit"> Подтвердить </button></Link>
            :
            <Link to="/"><button className = "Exit"> Главное меню </button></Link>

        }
        </div>

    );

}

export default EditPage;