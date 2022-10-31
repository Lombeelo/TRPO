import React, { useEffect, useState } from "react";
import "./App.css";
import "../src/components/Editing/editing_styles.css";

import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import 'react-calendar/dist/Calendar.css';

import Select from 'react-select';

import { Link } from 'react-router-dom';
import { callApiPost } from "./requests.js";

function AddingPage() {
    const [form, setForm] = useState({
        date: null,
        para: null,
        cabinet: null,
        subjectId: null,
        subjectTypeId: null,
        groupIds: [],
        professorIds: []
    });

    // ABSTRACT HIGH ORDER FUNCTIONS
    const createApiLoadCall = (apiFuncName, loadingSetterFunc, fieldSetterFunc, changeDataCallback) => {
        return (form) => {
            loadingSetterFunc(true);
            console.log("calling with form " + JSON.stringify(form))
            callApiPost(apiFuncName, form, (resp) => {
                console.log(apiFuncName + " " + JSON.stringify(resp.data))
                fieldSetterFunc(changeDataCallback(resp.data))
                loadingSetterFunc(false)
            })
        }
    }

    const convertToMultiselectFormat = (obj) => {
        let label = obj.name ? obj.name : obj.fullName
        return { label: label, value: "" + obj.id }
    }

    const createMultiSelectChangeHandler = (field, updateFunc, isMulti) => {
        return (value) => {
            console.log("changing field " + field + " to value " + JSON.stringify(value))
            let result = isMulti ? value.map(v => v.value)
                : (value === null ? [] : [value.value])
            let newForm = { ...form, [field]: result }
            setForm(newForm)
            updateFunc(newForm)
        };
    }

    const createEventChangeHandler = (field) => {
        return (event) => {
            setForm({ ...form, [field]: event.target.value })
        };
    }
    // END ABSTRACT HIGH ORDER FUNCTIONS

    // DatePicker state
    const [dateChosen, setDateChosen] = useState(false)
    const [calendarUpdating, setCalendarUpdating] = useState(false)
    const [disabledDates, setDisabledDates] = useState([
        new Date("2022/10/10"),
        new Date("2022/10/12")]);

    const maximumDate = new Date("2023/07/01");
    const minimumDate = new Date("2022/09/01");

    const handleClickDay = (value) => {
        setForm({ ...form, date: value })
        setDateChosen(true)
    }

    useEffect(() => {
        createApiLoadCall(
            "GetDatesOccupied",
            setCalendarUpdating,
            setDisabledDates,
            (data) => data.map(dateString => new Date(dateString))
        )(form)
    }, [form.groupIds, form.professorIds])

    // Group multiselect state
    const [groupsLoading, setGroupsLoading] = useState(false)
    const [manyGroupsFlag, setManyGroupsFlag] = useState(false)
    const [groupOptions, setGroupOptions] = useState([
        { name: "309Б", id: 1 },
        { name: "310Б", id: 2 }
    ])
    const updateGroups = createApiLoadCall(
        "GetGroupsAvailable",
        setGroupsLoading,
        setGroupOptions,
        (data) => data)


    // Fios multiselect state
    const [manyFiosFlag, setManyFiosFlag] = useState(false)
    const [fiosLoading, setFiosLoading] = useState(false)
    const [fioOptions, setFioOptions] = useState([
        { name: "Вестяк А.В.", id: "Вестяк Анатолий Васильевич" },
        { name: "Чечиков Ю.Б.", id: "Чечиков Юрий Борисович" }
    ])
    const updateFios = createApiLoadCall(
        "GetProfessorsAvailable",
        setFiosLoading,
        setFioOptions,
        (data) => data)

    // SubjectType select state
    const [subjTypesLoading, setSubjTypesLoading] = useState(false)
    const subjectTypeFirstOption = [{ id: 0, name: "Тип занятия" }]
    const [subjectTypeOptions, setSubjectTypeOptions] = useState(
        subjectTypeFirstOption.concat([
            { id: 1, name: "Лекция" },
            { id: 2, name: "Семинар" },
            { id: 3, name: "Лаба" }
        ]))
    const updateSubjectTypes = createApiLoadCall(
        "GetSubjectTypeAvailable",
        setSubjTypesLoading,
        setSubjectTypeOptions,
        (data) => subjectTypeFirstOption.concat(data)
    )

    const handleChangeType = (event) => {
        setForm({ ...form, subjectTypeId: event.target.value })
        let typeToGroupsAndFiosMapping = {
            1: { manyGroups: true, manyFios: false },
            2: { manyGroups: false, manyFios: false },
            3: { manyGroups: false, manyFios: true }
        }

        let curMapping = typeToGroupsAndFiosMapping[event.target.value];
        setManyFiosFlag(curMapping.manyFios);
        setManyGroupsFlag(curMapping.manyGroups);
    }

    // Para select state
    const paraFirstOption = [{ id: 0, name: "Номер пары" }]
    const [paraLoading, setParaLoading] = useState(false)
    const [paraOptions, setParaOptions] = useState(
        paraFirstOption.concat([
            { id: 1, name: "Первая" },
            { id: 2, name: "Вторая" }
        ]))
    const updatePara = createApiLoadCall(
        "GetParaAvailable",
        setParaLoading,
        setParaOptions,
        (data) => paraFirstOption.concat(
            data.map(
                (para) => {
                    return { id: para, name: para }
                }
            )
        )
    )

    // Subject select state
    const subjectFirstOption = [{ id: 0, name: "Предмет" }]
    const [subjectsLoading, setSubjectsLoading] = useState(false)
    const [subjectOptions, setSubjectOptions] = useState(
        subjectFirstOption.concat([
            { id: 1, name: "Матан" },
            { id: 2, name: "ООП" }
        ]))

    const updateSubjects = createApiLoadCall(
        "GetSubjectsAvailable",
        setSubjectsLoading,
        setSubjectOptions,
        (data) => subjectFirstOption.concat(data)
    )

    // Cabinet select state
    const cabinetFirstOption = [{ id: 0, name: "Кабинет" }]
    const [cabinetsLoading, setCabinetsLoading] = useState(false)
    const [cabinetOptions, setCabinetOptions] = useState(
        cabinetFirstOption.concat([
            { id: 1, name: 330 },
            { id: 2, name: 222 }
        ]))
    const updateCabinet = createApiLoadCall(
        "GetCabinetsOccupied",
        setCabinetsLoading,
        setCabinetOptions,
        (data) => cabinetFirstOption.concat(
            Array(999).fill().map(
                (_, index) => {
                    index += 1;
                    return { id: index, name: index, disabled: data.includes(index) };
                }
            )
        )
    )

    const formTrySubmit = () => {
        callApiPost("PostScheduleEntryFromForm", form, (resp) => {
            console.log("Tryed to submit the form: " + JSON.stringify(resp.data))
        }
        );
    }

    return (
        <div className="App">
            
            <h1> Это страница для добавления пар </h1>
            <label className="group_list_label"> Выбор группы </label>
            <Select className = "group_list_editing"
                isMulti={manyGroupsFlag}
                isClearable={true}
                options={groupOptions.map(convertToMultiselectFormat)}
                onChange={createMultiSelectChangeHandler("groupIds", updateGroups, manyGroupsFlag)}
                onFocus={() => updateGroups(form)}
                isLoading={groupsLoading}
            />
            
            <label className="fio_label"> Выбор преподавателя </label>
            <div className="fio_editing">
            <Select 
                isMulti={manyFiosFlag}
                isClearable={true}
                options={fioOptions.map(convertToMultiselectFormat)}
                onChange={createMultiSelectChangeHandler("professorIds", updateFios, manyFiosFlag)}
                onFocus={() => updateFios(form)}
                isLoading={fiosLoading}
            />
            </div>

            <select className="type_editing"
                value={form.type}
                onChange={handleChangeType}
                onClick={() => updateSubjectTypes(form)}
            >
                {subjectTypeOptions.map(subj_type =>
                    <option disabled={subjTypesLoading} key={subj_type.id}
                        value={subj_type.id}>{subj_type.name}</option>)}
            </select>
            
            <div className="calendar">
                <DatePicker
                    selected={dateChosen ? form.date : new Date()}
                    onChange={handleClickDay}
                    minDate={minimumDate}
                    // Disable Datepicker
                    maxDate={(form.groupIds.length === 0 && form.professorIds.length === 0)
                        || calendarUpdating
                        ? minimumDate : maximumDate}
                    excludeDates={disabledDates}
                    inline
                />
            </div>

            <div>
                <select className="para"
                    disabled={!dateChosen}
                    value={form.para}
                    onChange={createEventChangeHandler("para")}
                    onClick={() => updatePara(form)}
                >
                    {paraOptions.map(addingPara =>
                        <option disabled={paraLoading} key={addingPara.id}
                            value={addingPara.id}>{addingPara.name}</option>)}
                </select>

                <select
                    disabled={
                        (form.groupIds.length === 0 && form.professorIds.length === 0)
                    }
                    className="subj_editing"
                    value={form.subj}
                    onChange={createEventChangeHandler("subjectId")}
                    onClick={() => updateSubjects(form)}
                >
                    {subjectOptions.map(addingSubj => <option disabled={subjectsLoading} key={addingSubj.id}
                        value={addingSubj.id}>{addingSubj.name} </option>)}
                </select>

                <select disabled={form.subjectId == null}
                    className="cabinet_editing"
                    value={form.cabinet}
                    onChange={createEventChangeHandler("cabinet")}
                    onClick={() => updateCabinet(form)}
                >
                    {cabinetOptions.map(addingCab => <option key={addingCab.id}
                        disabled={cabinetsLoading || addingCab.disabled}
                        value={addingCab.value}> {addingCab.name}</option>)}
                </select>

            </div>
            {
                <div>
                    <Link to="/">
                        <button disabled={false}
                            className="Approve_button"
                            onClick={formTrySubmit}>
                            Подтвердить
                        </button>
                    </Link>

                    <Link to="/" state={{ from: "AddingPage", update: true }}>
                        <button className="Exit_button">
                            Главное меню
                        </button>
                    </Link>

                </div>
            }
        </div>
    );
}

export default AddingPage;