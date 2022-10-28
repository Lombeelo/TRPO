import React, { useState } from "react";
import "./App.css";
import "../src/components/Editing/editing_styles.css";

import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import 'react-calendar/dist/Calendar.css';

import MultiSelect from 'react-multiple-select-dropdown-lite';
import "react-multiple-select-dropdown-lite/dist/index.css";

import { Link } from 'react-router-dom';

function AddingPage() {

    //---------------------------------------------
    const [form, setForm] = useState({
        form_date: null,
        form_para: null,
        form_cabinet: null,
        form_subj: null,
        form_subj_type: null,
        form_groups: null,
        form_proffs: null
    }
    );

    //---------------- ФЛАГИ ------------------------------
    const [approve, setApprove] = useState(false)
    const [dateChange, setDateChange] = useState(false)
    const [firstChange, setFirstChange] = useState(false)
    const [cabinetSelect, setCabinetSelect] = useState(false)
    const [lastChange, setLastChange] = useState(false)

    const [many_groups_flag, setManyGroupsFlag] = useState(false)
    const [many_fios_flag, setManyFiosFlag] = useState(false)

    function ChangeFiosFlag() {
        setManyFiosFlag(!many_fios_flag);
    }

    function ChangeGroupsFlag() {
        setManyGroupsFlag(!many_groups_flag);
    }


    //----------------------------------------------
    const [addGroups, setAddGroups] = useState([
        { id: 1, label: "309Б", value: "М3О-309Б-20" },
        { id: 2, label: "310Б", value: "М3О-310Б-20" }
    ])
    const [groups, setGroups] = useState(null)
    const handleChangeGroups = (value) => {
        debugger;
        setGroups(value);
        setForm({ ...form, form_groups: value })

        if (value != null) setFirstChange(true);
    }

    const [addFio, setAddFio] = useState([
        { id: 1, label: "Вестяк А.В.", value: "Вестяк Анатолий Васильевич" },
        { id: 2, label: "Чечиков Ю.Б.", value: "Чечиков Юрий Борисович" }
    ])
    const [fio, setFio] = useState(null)
    const handleChangeFio = (value) => {
        setFio(value);
        setForm({ ...form, form_proffs: value })

        if (value != null) setFirstChange(true);
    }

    const [addType, setAddType] = useState([
        { id: 0, value: "Тип занятия" },
        { id: 1, value: "Лекция" },
        { id: 2, value: "ПЗ" },
        { id: 3, value: "ЛР" }
    ])
    const [type, setType] = useState(null)
    const handleChangeType = (event) => {
        setType(event.target.value)
        setForm({ ...form, form_subj_type: event.target.value })

        if (event.target.value == "Лекция") {
            ChangeGroupsFlag();
            if (many_fios_flag == true) ChangeFiosFlag();
        }
        else if (event.target.value == "ЛР") {
            ChangeFiosFlag();
            if (many_groups_flag == true) ChangeGroupsFlag()
        }
        else if (event.target.value == "ПЗ") {
            if (many_fios_flag == true) ChangeFiosFlag();
            if (many_groups_flag == true) ChangeGroupsFlag();
        }
        if (event.target.value != null) setFirstChange(true);

    }
    const [addSubjType, setAddSubjType] = useState([
        { id: 0, value: "Тип занятия" },
        { id: 1, value: "Лекция" },
        { id: 2, value: "ПЗ" },
        { id: 3, value: "ЛР" }
    ])

    const [addPara, setAddPara] = useState([
        { id: 0, value: "Номер пары" },
        { id: 1, value: "Первая" },
        { id: 2, value: "Вторая" }
    ])
    const [para, setPara] = useState(null)
    const handleChangePara = (event) => {
        setPara(event.target.value)
        setForm({ ...form, form_para: event.target.value });
    }


    const [addSubj, setAddSubj] = useState([
        { id: 0, value: "Предмет" },
        { id: 1, value: "Матан" },
        { id: 2, value: "ООП" }
    ])
    const [subj, setSubj] = useState(null)
    const handleChangeSubj = (event) => {
        setSubj(event.target.value)
        setForm({ ...form, form_subj: event.target.value })
    }

    const [addCab, setAddCab] = useState([
        { id: 0, value: "Кабинет" },
        { id: 1, value: 330 },
        { id: 2, value: 222 }
    ])
    const [cabinet, setCabinet] = useState(null)
    const handleChangeCabinet = (event) => {
        setCabinet(event.target.value)
        setForm({ ...form, form_cabinet: event.target.value })
        console.log(form.form_cabinet)
    }





    //-----------------------------------------------

    //КАЛЕНДАРЬ -------------------------------------
    const [date, setDate] = useState(new Date());

    const maximumDate = new Date("2023/07/01");
    const minimumDate = new Date("2022/09/01");

    const disabledDates = [
        new Date("2022/10/10"),
        new Date("2022/10/12")];

    const handleClickDay = (value) => {
        setDateChange(true);
        setDate(value);
        setForm({ ...form, form_date: value })
    }

    //-----------------------------------------

    function refreshPage() {
        window.location.reload(false);

    }


    return (
        <div className="App">
            <h1> Это страница для добавления пар </h1>
            <label className="group_list_label"> Выбор группы </label>
            <MultiSelect
                className="group_list_editing" onChange={handleChangeGroups} options={addGroups}
                singleSelect={!many_groups_flag} />

            <label className="fio_label"> Выбор преподавателя </label>
            <MultiSelect
                className="fio_editing" onChange={handleChangeFio} options={addFio}
                singleSelect={many_fios_flag ? false : true} />

            <select className="type_editing" value={type} onChange={handleChangeType}>
                {addType.map(subj_type =>
                    <option key={subj_type.id} value={subj_type.value}>{subj_type.value}</option>)}
            </select>


            <div className="calendar">
                <DatePicker
                    selected={date}
                    onChange={handleClickDay}
                    minDate={minimumDate}
                    maxDate={firstChange ? maximumDate : minimumDate}
                    excludeDates={disabledDates}
                    inline
                />
            </div>


            <div>
                <select disabled={(form.form_date != null) ? false : true} className="para" value={para} onChange={handleChangePara}>
                    {addPara.map(addingPara =>
                        <option key={addingPara.id} value={addingPara.value}>{addingPara.value}</option>)}
                </select>

                <select disabled={(firstChange) ? false : true} className="subj_editing" value={subj} onChange={handleChangeSubj}>
                    {addSubj.map(addingSubj => <option key={addingSubj.id}
                        value={addingSubj.value}>{addingSubj.value} </option>)}
                </select>

                <select disabled={(form.form_subj != null) ? false : true} className="cabinet_editing" value={cabinet} onChange={handleChangeCabinet}>
                    {addCab.map(addingCab => <option key={addingCab.id}
                        value={addingCab.value}> {addingCab.value}</option>)}
                </select>

            </div>


            {
                <div>
                    <Link to="/Schedule"><button disabled={true} className="Approve_button"> Подтвердить </button></Link>
                    <Link to="/" state={{ from: "AddingPage", update: true }}><button className="Exit_button"> Главное меню </button></Link>

                </div>
            }


        </div>

    );

}

export default AddingPage;