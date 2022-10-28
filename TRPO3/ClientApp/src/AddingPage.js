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
        date: new Date(),
        para: null,
        cabinet: null,
        subject: null,
        subject_type: null,
        groups: [],
        professors: []
    });

    //---------------- ФЛАГИ ------------------------------
    const [dateChosen, setDateChosen] = useState(false)
    const [manyGroupsFlag, setManyGroupsFlag] = useState(false)
    const [manyFiosFlag, setManyFiosFlag] = useState(false)

    //----------------------------------------------
    const [addGroups, setAddGroups] = useState([
        { id: 1, label: "309Б", value: "М3О-309Б-20" },
        { id: 2, label: "310Б", value: "М3О-310Б-20" }
    ])

    const createChangeHandler = (field) => {
        return (value) => {
            setForm({ ...form, [field]: value })
        };
    }

    const createEventChangeHandler = (field) => {
        return (event) => {
            setForm({ ...form, [field]: event.target.value })
        };
    }

    const [addFio, setAddFio] = useState([
        { id: 1, label: "Вестяк А.В.", value: "Вестяк Анатолий Васильевич" },
        { id: 2, label: "Чечиков Ю.Б.", value: "Чечиков Юрий Борисович" }
    ])

    const [addType, setAddType] = useState([
        { id: 0, value: "Тип занятия" },
        { id: 1, value: "Лекция" },
        { id: 2, value: "ПЗ" },
        { id: 3, value: "ЛР" }
    ])

    const handleChangeType = (event) => {
        setForm({ ...form, subject_type: event.target.value })
        let typeToGroupsAndFiosMapping = {
            "Лекция": { manyGroups: true, manyFios: false },
            "ЛР": { manyGroups: false, manyFios: true },
            "ПЗ": { manyGroups: false, manyFios: false }
        }

        let curMapping = typeToGroupsAndFiosMapping[event.target.value];
        setManyFiosFlag(curMapping.manyFios);
        setManyGroupsFlag(curMapping.manyGroups);
    }

    const [addPara, setAddPara] = useState([
        { id: 0, value: "Номер пары" },
        { id: 1, value: "Первая" },
        { id: 2, value: "Вторая" }
    ])

    const [addSubj, setAddSubj] = useState([
        { id: 0, value: "Предмет" },
        { id: 1, value: "Матан" },
        { id: 2, value: "ООП" }
    ])

    const [addCab, setAddCab] = useState([
        { id: 0, value: "Кабинет" },
        { id: 1, value: 330 },
        { id: 2, value: 222 }
    ])

    //-----------------------------------------------

    //КАЛЕНДАРЬ -------------------------------------
    const maximumDate = new Date("2023/07/01");
    const minimumDate = new Date("2022/09/01");

    const [disabledDates, setDiabledDates] = useState([
        new Date("2022/10/10"),
        new Date("2022/10/12")]);

    const handleClickDay = (value) => {
        setForm({ ...form, date: value })
        setDateChosen(true)
    }

    //-----------------------------------------
    return (
        <div className="App">
            <h1> Это страница для добавления пар </h1>
            <label className="group_list_label"> Выбор группы </label>
            <MultiSelect
                className="group_list_editing" onChange={createChangeHandler("groups")} options={addGroups}
                singleSelect={!manyGroupsFlag} />

            <label className="fio_label"> Выбор преподавателя </label>
            <MultiSelect
                className="fio_editing" onChange={createChangeHandler("professors")} options={addFio}
                singleSelect={!manyFiosFlag} />

            <select className="type_editing" value={form.type} onChange={handleChangeType}>
                {addType.map(subj_type =>
                    <option key={subj_type.id} value={subj_type.value}>{subj_type.value}</option>)}
            </select>


            <div className="calendar">
                <DatePicker
                    selected={form.date}
                    onChange={handleClickDay}
                    minDate={minimumDate}
                    // Disable Datepicker
                    maxDate={(form.groups.length === 0 && form.professors.length === 0)
                        ? minimumDate : maximumDate}
                    excludeDates={disabledDates}
                    inline
                />
            </div>


            <div>
                <select disabled={!dateChosen} className="para" value={form.para} onChange={createEventChangeHandler("para")}>
                    {addPara.map(addingPara =>
                        <option key={addingPara.id} value={addingPara.value}>{addingPara.value}</option>)}
                </select>

                <select
                    disabled={
                        (form.groups.length === 0 && form.professors.length === 0)
                    }
                    className="subj_editing"
                    value={form.subj}
                    onChange={createEventChangeHandler("subject")}
                >
                    {addSubj.map(addingSubj => <option key={addingSubj.id}
                        value={addingSubj.value}>{addingSubj.value} </option>)}
                </select>

                <select disabled={form.subject == null}
                    className="cabinet_editing"
                    value={form.cabinet}
                    onChange={createEventChangeHandler("cabinet")}
                >
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